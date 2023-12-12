'use client'
import { coreABI, coreAddress } from "@/helpers/coreContract";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";


export default function ToWithdrawModal({isOpen, onClose, staked}){
    const [amount, setAmount] = useState(0.00)
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const toast = useToast()

    const {write: withdraw} = useContractWrite({
      address: coreAddress,
      abi: coreABI,
      functionName: 'withdraw',
      args: [amount*10**tokens[0].decimals],
      onError(data){
        setLoading(false) 
        setError(true) 
        console.error('error', data)
      },
      onSuccess(data){
        setLoading(false)
        setSuccess(true)
        console.log('amount withdraw from the contract', data)
      }
    })

    function initWithdraw(){
      if(amount > staked){
        toast({
          title: `Montant supérieur au fond disponible`,
          description: "veuillez saisir un montant inférieur",
          isClosable: true,
          duration: '3000',
          status: 'error'
        })
      } else{
        setLoading(true)
        console.log('withdrawing amount...')
        withdraw()
      }
    }


    function handleChange(e){
      setAmount(e.target.value)
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

      if(isSuccess){
        toast({
          title: `Transaction effectuée`,
          description: "Le montant a bien été retiré",
          isClosable: true,
          duration: '3000',
          status: 'success'
        })
        setSuccess(false)
      }
    }, [isError, isSuccess])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retirer un montant de votre Portefeuille</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            Entrer la quantité que vous souhaitez retirer. 
            <Input mt={3} type="number" name="amount" placeholder="0.00" value={amount} onChange={(e)=>handleChange(e)}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' isLoading={isLoading} onClick={()=>{initWithdraw()}}>
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}