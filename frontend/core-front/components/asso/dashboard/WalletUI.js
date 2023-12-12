 'use client'


import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Icon, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { useAccount, useBalance, useConnect, useContractRead, useContractWrite } from "wagmi"
import { AiFillLock } from "react-icons/ai";
import { BsClockFill } from "react-icons/bs";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { useEffect, useState } from "react";
import ToStackModal from "./modals/toStakeModal";
import ToRewardsModal from "./modals/toRewardsModal";
import ToWithdrawModal from "./modals/toWithdrawModal";
import { userClient } from "@/helpers/walletClient";
import { tokens } from "@/helpers/tokens";
import { coreABI, coreAddress } from "@/helpers/coreContract";
import { MockConnector } from 'wagmi/connectors/mock'
import ToWithdrawAllModal from "./modals/ToWithdrawAllModal";




 
 export default function WalletUI({privateKey}) {
    const [balanceUSDC, setBalanceUSDC] = useState({
        total:'0.00 USD', 
        staked:'0.00 USD',
        rewards: '0.00 USD'
    })

    const { isOpen: isStakeOpen, onOpen: onStakeOpen, onClose: onStakeClose } = useDisclosure()
    const { isOpen: isRewardsOpen, onOpen: onRewardsOpen, onClose: onRewardsClose } = useDisclosure()
    const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen,  onClose: onWithdrawClose } = useDisclosure()
    const { isOpen: isWithdrawAllOpen, onOpen: onWithdrawAllOpen, onClose: onWithdrawAllClose} = useDisclosure()
 
    const client = userClient(privateKey)
    const connector = new MockConnector({
        options:{
            walletClient: client,
        }
    })

    const{connect} = useConnect({
        connector
    })

    const{isConnected} = useAccount()


    const {data: available, isLoading: isBalanceLoading} = useBalance({
        address: client.account.address,
        token: tokens[0].contract,
        watch: true,
    })

    const {data: onContract, isError, isLoading: isInfoLoading} = useContractRead({
        address: coreAddress,
        abi: coreABI,
        functionName: 'userInfo',
        args: [client.account.address]
    })


    const {write: update} = useContractWrite({
        address: coreAddress,
        abi: coreABI,
        functionName: 'updateInterest', 
        args: [client.account.address] 
    })
    


    let cards = []


    if (available && onContract){

        cards = [
            {
                name: 'Montant Bloqué',
                amount: format(Number(onContract[0])/ 10**6)+' USD',
                cta: ['Retirer'],
                icon: AiFillLock,
                onClick: [onWithdrawOpen]
            },
            {
                name: 'Montant Généré',
                amount: format(Number(onContract[1])/ 10**6)+' USD',
                cta: ['Récuperer'],
                icon: BsClockFill,
                onClick: [onRewardsOpen]
            },
            {
                name: 'Montant Disponible',
                amount: format(available.formatted)+' USD',
                cta: ['Bloquer', 'Retirer'],
                icon: HiOutlineCircleStack,
                onClick: [onStakeOpen, onWithdrawAllOpen]
            },
        ]

    }

    function toDecimal(num){
        BigInt(num*10**tokens.decimals)
    }

    function format(num){ 
       return `${Number((Math.round(num * 100) / 100).toFixed(2)) }`
    }


    useEffect(()=>{
        connect()
        isConnected && update()



        if(available  && onContract){

            setBalanceUSDC({
                total: onContract[0] + onContract[1] + available.value,
                available: available.value,
                staked:onContract[0] ,
                rewards: onContract[1]
            })
        }
    },[])


    return (
        <Box>
        <SimpleGrid columns={{base: 1, lg: 3}} spacing={4} py={8}>
            {
                cards.map(card => {
                    return (
                        <Card key={cards.indexOf(card)} size={'lg'}>
                            <CardHeader >
                                <Icon mb={2} as={card.icon} boxSize={6}/>
                                <Heading size={'md'}>{card.name} </Heading>
                            </CardHeader>
                            <CardBody>
                            <HStack justifyContent={'space-between'}>
                                <Text fontSize={'xl'} fontWeight={'bold'}>
                                    {card.amount}
                                </Text>
                                <HStack>
                                {
                                    card.cta.map(cta=> {
                                        return <Button onClick={card.onClick[card.cta.indexOf(cta)]}>{card.cta[card.cta.indexOf(cta)]}</Button>
                                    })
                                }
                                </HStack>
                            </HStack>
                            </CardBody>
                        </Card>
                    )
                })
            }
        </SimpleGrid>

        <ToRewardsModal isOpen={isRewardsOpen} onClose={onRewardsClose} rewards={balanceUSDC.rewards} client={client}/>
        <ToWithdrawModal isOpen={isWithdrawOpen} onClose={onWithdrawClose} staked={balanceUSDC.staked} client={client}/>
        <ToStackModal isOpen={isStakeOpen} onClose={onStakeClose} available={balanceUSDC.available} client={client} />
        <ToWithdrawAllModal isOpen={isWithdrawAllOpen} onClose={onWithdrawAllClose} total={balanceUSDC.total} client={client}/>
        </Box>
    )


 }