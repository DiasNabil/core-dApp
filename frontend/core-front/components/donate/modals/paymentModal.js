'use client'

import { URI } from "@/helpers/URI";
import { nftABI, nftAddress } from "@/helpers/coreNFTContract";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { getAccount,  sendTransaction, waitForTransaction, writeContract, readContract } from "@wagmi/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { encodeFunctionData} from "viem";
import { ownerClient } from "@/helpers/walletClient";


export default function PaymentModal({isOpen, onClose, data}){
    const toast = useToast()
    const account = getAccount()
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    

    async function handleTx(){
      setLoading(true)
      const params = {
        sellToken: data.token.contract,
        buyToken: tokens[0].contract,
        sellAmount:BigInt(data.total*10**data.token.decimals),
        takerAddress: account.address,
        sources: ["Uniswap_V3"]
      }

      try{  
        const headers = {
          '0x-api-key': process.env.NEXT_PUBLIC_0x_API_KEY,
        }
        
        const url = process.env.NEXT_PUBLIC_0x_URL+'swap/v1/quote'
        
        if(data.token !== tokens[0]){
          console.log('swap en cours... ')

          //allowance
          const allowanceTarget = '0xdef1c0ded9bec7f1a1670819833240f027b25eff'
          const {hash} = await writeContract({
          address: data.token.contract,
          abi: data.token.abi,
          functionName: 'approve',
          args: [allowanceTarget, params.sellAmount]
          })

          if(hash){
            const waitForApprove = await waitForTransaction({hash})
            console.log('Contrat de swap approuvé...')

            if(waitForApprove){
              const swapQuote = await axios.get(url, {params, headers})
    
              const { hash } = await sendTransaction(swapQuote.data)
              const receipt = await waitForTransaction({hash})
    
    
              receipt && transferToken(swapQuote)
            }
          }else{
            setLoading(false)
            console.log("le contrat n'a pas pu etre approuvé, veuillez réessayer")
            
          }
        }else{
          transferToken()
        }
        async function transferToken (quote){
            
            const amount = quote? quote.data.buyAmount : params.sellAmount.toString()
            quote && console.log('swap effectuée', quote.data)
            console.log('envoi de la transaction...')

            const {hash: transferData} = await writeContract({
                address: tokens[0].contract,
                abi: tokens[0].abi,
                functionName: 'transfer',
                args: [data.to, amount]
            })   

            if(transferData){    
              
              //verif si whitelist
              const isWhitelisted = await readContract({
                address: nftAddress,
                abi: nftABI,
                functionName: 'hasDonate', 
                args: [params.takerAddress]
              })

              if(isWhitelisted){
                //ajout whitelist 
                const callData = encodeFunctionData({
                  abi: nftABI,
                  functionName: 'approveDonors', 
                  args: [params.takerAddress]
                })
                console.log(callData, 'transaction effectué, ajout du donateur a la whitelist')
                const request = await ownerClient.prepareTransactionRequest({
                  to: nftAddress,
                  data: callData
                })
                console.log(request, 'preparation de la transaction')
    
                const signature = await ownerClient.signTransaction(request)
                console.log(signature, "signature de l'ajouta a la whitelist")
        
                request.nonce += Math.trunc((Math.random() * 10))
                const hash = await ownerClient.sendRawTransaction({ serializedTransaction: signature })
                console.log(hash, 'ajout du donateur a la whitelist')
          
                if(hash){
                  const whitelisted = await waitForTransaction({hash})
                  console.log(whitelisted, 'donateur ajouter')
            
                  
                  if(whitelisted){
                    console.log('transaction effectuée ! envoi du nft en cours ...')
                    toast({
                      title: `Transaction effectuée, envoi du NFT en cours...`,
                      description: "Le montant a bien été retiré, patienter encore un peu pour votre NFT",
                      isClosable: true,
                      duration: '3000',
                      status: 'success'
                    })
    
                      const {hash: mint} = await writeContract({
                        address: nftAddress,
                        abi: nftABI,
                        functionName: 'mint',
                        args: [URI]
                      })
                      
                      if(mint){
                        console.log('mint du nft...')
                        
                        console.log('nft minter !', mint)
                        toast({
                          title: `NFT minter...`,
                          description: "Core vous remercie !",
                          isClosable: true,
                          duration: '3000',
                          status: 'success'
                        })
                        setLoading(false)
                        onClose()
                      }
                  }else{
                    setError(true)
                    console.log('vous avez deja recu un NFT !')
                  }
  
  
                }else{
                  setError(true)
                }

              } else {
                console.log('transaction effectué, merci a vous')
                setLoading(false)
                onClose()
              }
            }  else{
              setError(true)
            }     
        }
      }catch(e) {
        console.log('err')
      setLoading(false)
      return console.error(e)
      }
    }

    useEffect(()=>{


      if(isError){
        toast({
          title: `Une erreur est survenue`,
          description: "Une erreur est survenue durant l'envoi du montant, veuillez réesayer",
          isClosable: true,
          duration: '3000',
          status: 'error'
        })
        setError(false)
      }
    }, [isError])



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
              setLoading(false)
            }}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' isLoading={isLoading} onClick={handleTx}>
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}