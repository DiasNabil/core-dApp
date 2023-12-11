 'use client'


import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Icon, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { privateKeyToAccount } from "viem/accounts"
import { useBalance, useContractRead, useContractWrite } from "wagmi"
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




 
 export default function WalletUI({privateKey}) {
    const [balanceUSDC, setBalanceUSDC] = useState({
        total:'0.00 USD', 
        staked:'0.00 USD',
        rewards: '0.00 USD'
    })

    const { isOpen: isStakeOpen, onOpen: onStakeOpen, onClose: onStakeClose } = useDisclosure()
    const { isOpen: isRewardsOpen, onOpen: onRewardsOpen, onClose: onRewardsClose } = useDisclosure()
    const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen,  onClose: onWithdrawClose } = useDisclosure()
 
    const client = userClient(privateKey)

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
    





    const cards = [
        {
            name: 'Montant Bloqué',
            amount: format(onContract[0])+' USD',
            cta: 'Bloqué',
            icon: AiFillLock,
            onClick: onStakeOpen
        },
        {
            name: 'Montant Généré',
            amount: format(onContract[1])+' USD',
            cta: 'Récuperer',
            icon: BsClockFill,
            onClick: onRewardsOpen
        },
        {
            name: 'Montant Récolté',
            amount: format(onContract[0] + onContract[1] + available.formatted)+' USD',
            cta: 'Retirer',
            icon: HiOutlineCircleStack,
            onClick: onWithdrawOpen
        },
    ]

    function toDecimal(num){
        BigInt(num*10**tokens.decimals)
    }

    function format(num){
        num = Number(num)
       return `${Number((Math.round(num * 100) / 100).toFixed(2))}`
    }


    useEffect(()=>{
        setBalanceUSDC({
            total: onContract[0] + onContract[1] + available.value,
            available: available.value,
            staked:onContract[0] ,
            rewards: onContract[1]
        })
    },[])

    console.log(balanceUSDC)

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
                                <Button onClick={card.onClick}>{card.cta}</Button>
                            </HStack>
                            </CardBody>
                        </Card>
                    )
                })
            }
        </SimpleGrid>

        <ToStackModal isOpen={isStakeOpen} onClose={onStakeClose} available={balanceUSDC.available} client={client} />
        <ToRewardsModal isOpen={isRewardsOpen} onClose={onRewardsClose} rewards={balanceUSDC.rewards} client={client}/>
        <ToWithdrawModal isOpen={isWithdrawOpen} onClose={onWithdrawClose} total={balanceUSDC.total} client={client}/>
        </Box>
    )


 }