'use client'

import { URI } from "@/helpers/URI";
import { nftABI, nftAddress } from "@/helpers/coreNFTContract";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { getAccount,  sendTransaction, writeContract, readContract } from "@wagmi/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { encodeFunctionData} from "viem";
import { ownerClient } from "@/helpers/walletClient";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { end } from "@popperjs/core";


export default function PaymentModal({isOpen, onClose, data}){
    const account = getAccount()
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(null)
    const [isSuccess, setSuccess] = useState(null)
    const [isHash, setHash] = useState(null)
    const toast = useToast()
    const toastIdRef = useRef()

    const params = {
      sellToken: data.token.contract,
      buyToken: tokens[0].contract,
      sellAmount:data.total*10**data.token.decimals,
      takerAddress: account.address,
      sources: ["Uniswap_V3"]
    }
    const [buyAmount, setBuyAmount] = useState(params.sellAmount)
    
    const allowanceTarget = '0xdef1c0ded9bec7f1a1670819833240f027b25eff'



    function allowance(){
      setLoading(true)
      toastIdRef.current = toast({ 
        title: 'début du process de paiement',
        description: "le process de paiement peut prendre du temps selon l'etat du reseau, merci de patienter",
        isClosable: true,
        duration: null,
        status: 'loading' 
      })
      if(data.token !== tokens[0]){
        console.log('settin allowance...')
        writeAllowance()
      }else{
        console.log('envoi en cours...')
        writeTransfer({args: [data.to, params.sellAmount]})
      }
    }

    const {write: writeAllowance} = useContractWrite({
      address: params.sellToken,
      abi: data.token.abi,
      functionName: 'approve',
      args: [allowanceTarget, params.sellAmount],
      onError(data){
        setLoading(false) 
        setError({message: 'une erreur est survenue durant le swap de token, veuillez réessayer'}) 
        console.error('error', data)
      },
      onSuccess(data){
        setHash({action:'approve', data: data.hash})
        setSuccess({title:'autorisation validée' , message: 'initiation du swap'})
        console.log('allowance set', data)
      }
    }) 

    async function swap(){
      const headers = {
        '0x-api-key': process.env.NEXT_PUBLIC_0x_API_KEY,
      }
      const url = process.env.NEXT_PUBLIC_0x_URL+'swap/v1/quote'

      try{
        const swapQuote = await axios.get(url, {params, headers})
        const { hash } = await sendTransaction(swapQuote.data)
        setBuyAmount(swapQuote.data.buyAmount)
        setHash({action: 'swap', data: hash})
        setSuccess({title: 'Token swapper', message: "Envoi du don a l'organisation en cours..."})
        console.log(hash , 'swap effectuée')

      }catch(e){
        setError({message: 'une erreur est survenue durant le swap veuillez réessayer'})
        setLoading(false)
        setHash(null)
        onClose()
        console.error('cannot swap', e)
      }

    }

    const {write: writeTransfer}= useContractWrite({
      address: tokens[0].contract,
      abi: tokens[0].abi,
      functionName: 'transfer',
      onError(data){
        setLoading(false) 
        setError({message: 'une erreur est survenue durant le transfert de token, verifier votre wallet'}) 
        console.error('error', data)
      },
      onSuccess(data){
        setHash({action:'transfer', data: data.hash})
        console.log('transfert effectuée en attente de validation', data)
      }
  
    })

    async function whitelisting(){
      const callData = encodeFunctionData({
        abi: nftABI,
        functionName: 'approveDonors', 
        args: [params.takerAddress]
      })
      console.log(callData, 'transaction effectué, ajout du donateur a la whitelist')

      try{
        const request = await ownerClient.prepareTransactionRequest({
          to: nftAddress,
          data: callData
        })
        console.log(request, 'preparation de la transaction')
  
        const signature = await ownerClient.signTransaction(request)
        console.log(signature, "signature de l'ajout a la whitelist")
  
        request.nonce += Math.trunc((Math.random() * 10))
        const hash = await ownerClient.sendRawTransaction({ serializedTransaction: signature })
        setHash({action: 'whitelisting', data: hash})
        console.log('donateur ajouter a la whitelist')
      }catch(e){
        setError({message: 'Erreur durant le mint du NFT'})
        console.error(e)
        setLoading(false)
        setHash(null)
        onClose()
      }
    }

    const {write: mint} = useContractWrite({
      address: nftAddress,
      abi: nftABI,
      functionName: 'mint',
      args: [URI],
      onError(data){
        setLoading(false) 
        setError({message: 'une erreur est survenue durant le mint du NFT, verifier votre wallet'}) 
        console.error('error', data)
      },
      onSuccess(data){
        setHash({action:'mint', data: data.hash})
        toast.update(toastIdRef.current, {
          title: 'NFT minter',
          description: 'Merci pour votre générosité !',
          isClosable: true,
          duration: 8000,
          status: 'success'
        })
        setHash(null)
        setLoading(false)
        onClose()        
        console.log('nft minté', data)
      }
    })

    const isWhitelisted = useContractRead({
      address: nftAddress,
      abi: nftABI,
      functionName: 'hasDonate', 
      args: [params.takerAddress],
      enabled: false
    })

    async function endProcess(){
      toast.update(toastIdRef.current, {
        title: 'Merci a vous !',
        isClosable: true,
        duration: 8000,
        status: 'success'
      })
      setHash(null)
      setLoading(false)
      onClose()
    }

    const waitForTransaction = useWaitForTransaction({
      hash: isHash?.data,
      enabled: false,
      confirmations: 1,
      onSuccess(){
        console.log('transaction validé', isHash)
        isHash.action == 'approve' && swap()
        isHash.action == 'swap' && writeTransfer({args: [data.to, buyAmount]})
        if(isHash.action == 'transfer'){
          isWhitelisted.data && endProcess()
          !isWhitelisted.data && whitelisting()
        }
        isHash.action == 'whitelisting' && mint() 
        setHash(null)
        
      },
      onError(){
        setLoading(false)
        setError({message: `une erreur est survenue durant la validation: ${isHash.action}`})
        setHash(null)
        onClose()
        console.error(waitForTransaction.error)
      }

    })

            
    useEffect(()=>{
      if(isHash){
        waitForTransaction.refetch()
      }

      if(isError){
        toast.update(toastIdRef.current, {
          title: `Une erreur est survenue`,
          description: isError.message,
          isClosable: true,
          duration: '10000',
          status: 'error'
        })
        setError(null)
        onClose()
        setLoading(false)
      }

      if(isSuccess){
        toast.update(toastIdRef.current, {
          title: isSuccess.title,
          description: isSuccess.message,
          isClosable: true,
          duration: null,
          status: 'loading'
        })
        setSuccess(null)
      }
      
      account.address && isWhitelisted.refetch()

      

    }, [isHash, isError, isSuccess])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer le paiment</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            Une fois le paiement confirmer vous receverez un NFT CORE, il sert a attesté de votre don et vous remerciez de votre soutien.  
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{
              onClose()
            }}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' isLoading={isLoading} onClick={allowance}>
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}