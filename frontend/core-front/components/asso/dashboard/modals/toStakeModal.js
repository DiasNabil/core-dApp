'use client'
import { coreABI, coreAddress } from "@/helpers/coreContract";
import { tokens } from "@/helpers/tokens";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useContractWrite } from "wagmi";


export default function ToStackModal({isOpen, onClose, available, client}){
    const [amount, setAmount] = useState(0)
    const toast = useToast()

    const { data: allowance, isLoading: isAllowLoading, isSuccess: isAllowSuccess, writeAsync: allowWrite } = useContractWrite({
      address: tokens[0].contract,
      abi: tokens[0].abi,
      functionName: 'approve',
      args: [coreAddress, amount],
      account: client
    })

    


    const { data: deposit, isLoading: isDepoLoading, isSuccess: idDepoSuccess, writeAsync: writeDepo } = useContractWrite({
      address: coreAddress,
      abi: coreABI,
      functionName: 'deposit',
      args: [amount]
    })

    function handleChange(e){
      setAmount(e.target.value)
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bloquer une somme</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            Entrer la quantité que vous souhaitez bloquer. 
            <Input mt={3} type="number" name="toBlock" value={amount === 0 ? '' : amount} onChange={(e)=>handleChange(e)} placeholder="0.00"></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant='ghost' loadingText='En cours' onClick={()=>{
              allowWrite
            }} >
                Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}