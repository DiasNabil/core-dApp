'use client'

import { Box, Button, Center, HStack, Text, useDisclosure } from "@chakra-ui/react"
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi"
import TransactionForm from "./TransactionForm"
import ConnectModal from "./modals/ConnectModal"


export default function DonateUI(){

    const {address, connector, isConnected } = useAccount()
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <Center flexDirection={'column'}>
            <Button onClick={onOpen}>connexion</Button>
            {
                isConnected && <TransactionForm address={address}/>
            }
            <ConnectModal isOpen={isOpen} onClose={onClose}/>
        </Center>
    )
}