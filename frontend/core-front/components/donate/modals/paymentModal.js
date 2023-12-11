'use client'

import { URI } from "@/helpers/URI";
import { nftABI, nftAddress } from "@/helpers/coreNFTContract";
import { faucetAddress, faucetPrivateKey } from "@/helpers/faucet";
import { tokens } from "@/helpers/tokens";
import { ownerClient, } from "@/helpers/walletClient";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { getAccount,  sendTransaction, waitForTransaction, writeContract } from "@wagmi/core";
import axios from "axios";
import { useRef, useState } from "react";
import { encodeFunctionData} from "viem";




export default function PaymentModal({isOpen, onClose, data}){

    const toast = useToast()
    const toastRef = useRef()
    const account = getAccount()
    const [isLoading, setLoading] = useState(false)

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
        
        toastRef.current = toast({
          title: 'Swap en cours...',
          duration: 'null',
          status: "info",
        })
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
          }
        }else{
          transferToken()
        }
      
        
        async function transferToken (quote){
            
            const amount = quote? quote.data.buyAmount : params.sellAmount.toString()
            toast.update(toastRef.current,{
              title: 'Swap effectué, envoi du montant...',
              status: "info",
              duration: 'null'
            })
            quote && console.log('swap effectuée', quote.data)
            console.log('envoi de la transaction...')

            const {hash: transferData} = await writeContract({
                address: tokens[0].contract,
                abi: tokens[0].abi,
                functionName: 'transfer',
                args: [data.to, amount]
            })
            
            

            if(transferData){
              toast.update(toastRef.current,{
                title: 'Transaction effectuée',
                description: 'Merci pour votre generosité, vous receverez votre NFT sous un instant.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              
              //ajout whitelist 
              const callData = encodeFunctionData({
                abi: nftABI,
                functionName: 'approveDonors', 
                args: [params.takerAddress]
              })
              const request = await ownerClient.prepareTransactionRequest({
                to: nftAddress,
                data: callData
              })

              const whitelisted = waitForTransaction({hash: request})
              request.nonce += Math.trunc((Math.random() * 10))
              const signature = await ownerClient.signTransaction(request)
              const hash = await ownerClient.sendRawTransaction({ serializedTransaction: signature })
              
              
              if(hash && whitelisted){
                console.log('transaction effectuée ! envoi du nft en cours ...')

                  const {hash: mint} = await writeContract({
                    address: nftAddress,
                    abi: nftABI,
                    functionName: 'mint',
                    args: [URI]
                  })
                  
                  if(mint){
                    console.log('mint du nft...')
                    
                    console.log('nft minter !', mint)
                    setLoading(false)
                    onClose()
                  }
              }
            }       
        }

      }catch(e) {
        console.log('err')
      setLoading(false)
      return console.error(e)
      }
    }


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