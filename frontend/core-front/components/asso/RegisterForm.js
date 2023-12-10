'use client'

import { useEffect, useState } from "react";
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import axios from "axios";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, HStack, Heading, Input, Select, Text, VStack, useToast } from "@chakra-ui/react";
import { encryptData } from "@/helpers/encrypt";
import { usePrepareContractWrite } from "wagmi";
import { contract, usdcAbi, usdcContract } from "@/helpers/USDC";
import { prepareWriteContract } from "@wagmi/core";
import { client, publicClient } from "@/helpers/walletClient";
import { parseEther, toBytes, toHex } from "viem";
import { faucetPrivateKey } from "@/helpers/coreContract";
import CoreIcon from "@/app/coreIcon";

export default function RegisterForm() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        encryptedPrivateKey: '',
        address: '',
        username: '',
    })

    const toast = useToast()

    useEffect(()=>{
        const privateKey = generatePrivateKey()
        const address = privateKeyToAccount(privateKey).address
        const encrypted = encryptData(privateKey)
        setUserData({...userData, encryptedPrivateKey: encrypted, address: address})
        
    }, [])




    async function handleSubmit(e){

        //approvisionne le wallet de l'utilisateur
        const spenderAccount = privateKeyToAccount(faucetPrivateKey)
        
        try{
            const faucet = await client.sendTransaction({
              account: spenderAccount,
              to: userData.address,
              value: parseEther('0.0002')
            })
            
            console.log('Faucet Receipt: ', faucet)
            const data = await axios.post('/api/asso/register', userData)
            toast.promise(data, {
                success: { title: 'Inscription envoyé', description: "Votre demande d'inscriptione à bien été envoyé" },
                error: { title: 'Oops ! ', description: "Une erreur s'est produite, veuillez réessayé" },
                loading: { title: 'Chargement en cours...'},
              })
            console.log("Votre insciption a bien été prise en compte, vous allez recevoir un mail de confirmation afin de finaliser votre inscription")
            
        } catch(err){
            if(err.response?.status === 500) {
                console.error("l'email que vous avez renseigner est deja utilisé ou incorrect, veuillez réessayer.")
            }else console.error("Une erreur est survenue durant l'inscription, veuillez réessayer")

            console.log(err)
        }
    }

    function handleChange(e){
        const {name, value} = e.target
        setUserData(prev => {
            return {...userData, [name]: value}
        })
    }


    return(
        <Card my={8} p={12}>
        <CardHeader>
            <VStack spacing={4}>
                <CoreIcon/>
                <Heading fontSize={'3xl'}>Inscrivez votre Organisation Gratuitement</Heading>
                <Text opacity={'0.8'} fontSize={'sm'} > Votre inscription est soumise a un verification préalable, 
                    vous serez notifier lors de la confirmation de votre inscription.
                </Text>
            </VStack>
        </CardHeader>
        
        <CardBody>
            <form>
            <FormControl >
                <FormLabel>Quel est le nom officiel de votre organisme ?* </FormLabel>
                <Input type="text" name="username" value={userData.username} onChange={(e)=>handleChange(e)} required/>
                <Text fontSize={'xs'}>📍Pour faciliter la vérification de votre compte, inscrivez ici le nom de votre association tel qu'il est déclaré en préfecture, et non un diminutif ou un nom d'usage.</Text>
                <br/>
                <FormLabel>Et son champ d'activité ? *</FormLabel>
                <Select mb={4} name='category' required>
                    <option>Education</option>
                    <option>Egalité</option>
                    <option>Alimentation</option>
                    <option>Environnement</option>
                    <option>Santé</option>
                </Select>
                <br/>
                <HStack justify={'space-between'}>
                <FormLabel>Quel est votre email ? * 
                    <Input type="email" name="email" value={userData.email} onChange={(e)=>handleChange(e)} required/>
                </FormLabel>
                
                <FormLabel>Mot de passe*:   
                    <Input type="password" name="password" value={userData.password} onChange={(e)=>handleChange(e)} required/>
                </FormLabel>
                
                </HStack>
            </FormControl>
            </form>
        </CardBody>

        <CardFooter>
            
            <Button variant={'outline'} colorScheme={'blue'} onClick={handleSubmit}
              > Confirmer l'inscription </Button>
        </CardFooter>
        </Card>
    )
}