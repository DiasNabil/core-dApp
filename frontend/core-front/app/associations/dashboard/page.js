import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { Box, Button, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import WalletUI from '@/components/asso/dashboard/WalletUI';
import { decryptData } from '@/helpers/encrypt';
import DonationTab from '@/components/asso/dashboard/donationTab';
import Link from 'next/link';

export default async function AssoPage (){
    const jwt = cookies().get('jwt')
    
    const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
    let user = null
    let privateKey = null

        if(jwt){
            try{
    
                const {data} = await axios.get(`${CMS_URL}users/me`, {
                    headers: {
                        Authorization:
                        `Bearer ${jwt.value}`
                    }
                })
                console.log(data)
                privateKey = decryptData(data.encryptedPrivateKey)
                user = data
            }catch(e) {
                console.log('erreur lors de la tentative de connexion, veuillez réessayé')
            }
        } else redirect('/')


    if(user){
        return (
            <Stack >
                <VStack pt={5}>
                <Heading> Bienvenue, {user.username}</Heading>
                <Text fontWeight={'bolder'}> Wallet Address: {user.address}</Text>    
                </VStack>
                <WalletUI privateKey={privateKey}/>
                <Box>
                    <HStack px={14} justifyContent={'space-between'}>
                        <Heading size={'lg'}>Dons Récents</Heading>
                        <Link href={'/associations/dashboard/donationlist'}><Button variant={'ghost'}> Voir plus </Button></Link>
                    </HStack>
                    <DonationTab/>
                </Box>
            </Stack>
        )
    }

}