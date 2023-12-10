'use client'
import { Button } from "@chakra-ui/button";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useAccount, useConnect } from "wagmi";
import { Text, VStack } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function ConnectModal({isOpen, onClose}){

    const toast = useToast()

    const {connect, connectors, error, isLoading, pendingConnector} = useConnect()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const router = useRouter()

    useEffect(()=>{
        if(error){
            toast({
                    title: 'La connexion à echouée',
                    description: 'Erreur durant la tentative de connexion.',
                    status: 'error',
                    isClosable: true,
                    duration: 3000,
                })
        }

        isConnected && onClose()

    },[isConnected, error])

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faire un don</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
                <Text mb={4}>Connecter votre Wallet</Text>
                <VStack p={4} mb={4} gap={4}>
                {
                    connectors.map((connector)=>(
                        <Button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={()=>{connect({connector})}}
                        w={'250px'}
                        isLoading={isLoading && connector.id === pendingConnector?.id}
                        >
                            {connector.name}
                        </Button>
                    ))
                }
                </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}