'use client'
import { faucetAddress } from "@/helpers/faucet";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { getAccount, sendTransaction, writeContract } from "@wagmi/core";
import axios from "axios";
import { useState } from "react";
import { parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";


export default function PaymentModal({isOpen, onClose, data}){

    const toast = useToast()
    const account = getAccount()
    const [isLoading, setLoading] = useState(false)

    async function handleTx(){

      setLoading(true)
      try{
        const params = {
            sellToken: data.token.contract,
            buyToken: tokens[0].contract,
            sellAmount:BigInt(data.total*10**data.token.decimals),
            takerAddress: account.address,
            sources: ["Uniswap_V3"]
        }

        console.log(params)
        const headers = {
            '0x-api-key': process.env.NEXT_PUBLIC_0x_API_KEY,
        }

        const url = process.env.NEXT_PUBLIC_0x_URL+'swap/v1/quote'

        const response = await axios.get(url, {params, headers})
        const receipt = await sendTransaction({
          to: response.data.to,
          data: response.data.data
        })

        if(response && receipt) {
          setLoading(false) 

          toast({
            title: 'Transaction effectué',
            description: receipt.hash,
            status: "success",
            duration: 5000,
            isClosable: true
          })

          onClose()
          console.log({receipt, response})
        } 
    }catch(e) {
      toast({
        title: 'Erreur durant le transaction',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
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