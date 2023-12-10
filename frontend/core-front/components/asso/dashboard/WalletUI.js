 'use client'


import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Icon, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { privateKeyToAccount } from "viem/accounts"
import { useBalance } from "wagmi"
import { AiFillLock } from "react-icons/ai";
import { BsClockFill } from "react-icons/bs";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { useState } from "react";
import ToStackModal from "./modals/toStakeModal";
import ToRewardsModal from "./modals/toRewardsModal";
import ToWithdrawModal from "./modals/toWithdrawModal";




 
 export default function WalletUI({privateKey}) {
    const [balanceUSDC, setBalanceUSDC] = useState({
        total:'', 
        staked:'',
        rewards: ''
    })

    const { isOpen: isStakeOpen, onOpen: onStakeOpen, onClose: onStakeClose } = useDisclosure()
    const { isOpen: isRewardsOpen, onOpen: onRewardsOpen, onClose: onRewardsClose } = useDisclosure()
    const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen,  onClose: onWithdrawClose } = useDisclosure()
 
    const account = privateKeyToAccount(privateKey)

    const {data, isError, isLoading} = useBalance({
        address: account.address,
        watch: true,
    })



    const cards = [
        {
            name: 'Montant Bloqué',
            amount: '3000,00 USD',
            cta: 'Bloqué',
            icon: AiFillLock,
            onClick: onStakeOpen
        },
        {
            name: 'Montant Généré',
            amount: '200,00 USD',
            cta: 'Récuperer',
            icon: BsClockFill,
            onClick: onRewardsOpen
        },
        {
            name: 'Montant Récolté',
            amount: '20000,00 USD',
            cta: 'Retirer',
            icon: HiOutlineCircleStack,
            onClick: onWithdrawOpen
        },
    ]

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

        <ToStackModal isOpen={isStakeOpen} onClose={onStakeClose} />
        <ToRewardsModal isOpen={isRewardsOpen} onClose={onRewardsClose} />
        <ToWithdrawModal isOpen={isWithdrawOpen} onClose={onWithdrawClose} />
        </Box>
    )


 }