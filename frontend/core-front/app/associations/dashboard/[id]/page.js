'use client'
import { useParams } from 'next/navigation';
import { Box, Button, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import WalletUI from '@/components/asso/dashboard/WalletUI';
import { decryptData } from '@/helpers/encrypt';
import DonationTab from '@/components/asso/dashboard/donationTab';
import Link from 'next/link';
import { assos } from '@/helpers/asso';
import { useEffect, useState } from 'react';

export default function AssoPage (){
    const params = useParams()
    const id = params.id 
    const [user , setUser] = useState(assos[id])
    const [privateKey, setPrivateKey] =  useState(decryptData(user.encodedPrivateKey))
    console.log(privateKey)
    useEffect(()=>{
        
        
        if(params){
            setUser(assos[params.id])
            setPrivateKey(decryptData(user.encodedPrivateKey))
        }
    })


    if(user){
        return (
            <Stack >
                <VStack pt={5}>
                <Heading> Bienvenue, {user.name}</Heading>
                <Text fontWeight={'bolder'}> Wallet Address: {user.address}</Text>    
                </VStack>
                <WalletUI privateKey={privateKey}/>
                <Box>
                    <HStack px={14} justifyContent={'space-between'}>
                        <Heading size={'lg'}>Dons Récents</Heading>
                        <Link href={`/associations/dashboard/${params.id}/donationlist`}><Button variant={'ghost'}> Voir plus </Button></Link>
                    </HStack>
                    <DonationTab/>
                </Box>
            </Stack>
        )
    }

}