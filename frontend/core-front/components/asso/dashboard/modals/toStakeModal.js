'use client'
import { coreABI, coreAddress } from "@/helpers/coreContract";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";

import { useEffect, useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";


export default function ToStakeModal({isOpen, onClose}){
    const [amount, setAmount] = useState(0.00)
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isHash, setHash] = useState(null)
    const toast = useToast()
  

    const {write: writeAllowance} = useContractWrite({
      address: tokens[0].contract,
      abi: tokens[0].abi,
      functionName: 'approve',
      args: [coreAddress, (amount*10**tokens[0].decimals)],
      onError(data){
        setLoading(false) 
        setError(true) 
        console.error('error', data)
      },
      onSuccess(data){
        setHash(data.hash)
        console.log('allowance set', data)
      }
    })

    const waitForTransaction = useWaitForTransaction({
      hash: isHash,
      enabled: false,
      onSuccess(){
        console.log('sending amount...')
        setHash(null)
        deposit()
      },
      onError(){
        setLoading(false)
        setError(true)
        console.error(waitForTransaction.error)
      }

    })
    
    const {write: deposit} = useContractWrite({
      address: coreAddress,
      abi: coreABI,
      functionName: 'deposit',
      args: [amount*10**tokens[0].decimals],
      onError(data){
        setLoading(false) 
        setError(true) 
        console.error('error', data)
      },
      onSuccess(data){
        setLoading(false)
        setSuccess(true)
        console.log('amount sent to the contract', data)
      }
    })
    


    function handleChange(e){
      setAmount(e.target.value)
    }

    function allowance(){
      setLoading(true)
      console.log('settin allowance...')
      writeAllowance()
    }

    useEffect(()=>{
      if(isHash){
        waitForTransaction.refetch()
        console.log('waiting for transaction...')
      }

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

      if(isSuccess){
        toast({
          title: `Transaction effectuée`,
          description: "Le montant a bien été bloqué",
          isClosable: true,
          duration: '3000',
          status: 'success'
        })
        setSuccess(false)
      }
    }, [isHash, isError, isSuccess])



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bloquer un montant</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            Entrer la quantité que vous souhaitez bloquer. 
            <Input mt={3} type="number" name="amount" placeholder="0.00" value={amount} onChange={(e)=>handleChange(e)}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' isLoading={isLoading} onClick={()=>{
                allowance()

            }} >
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}