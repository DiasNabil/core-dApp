'use client'

import { useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CoreIcon from "@/app/coreIcon";
import Link from "next/link";



export default function LoginForm() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const router = useRouter()

    async function handleSubmit(e){
        //e.preventDefault() 

        try{
            await axios.post('/api/asso/login', userData)
            
            console.log('identifiant correct, redirection vers le dashboard...')
            router.push('/associations/dashboard')
        } catch(err){
            if(err.response.status === 500) {
                console.error("l'email ou le mot de passe que vous avez renseiger est incorrect, veuillez réessayer.")
            }else console.error("Une erreur est survenue durant la connexion, veuillez réessayer")
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
            <VStack>
                <CoreIcon/>
                <Heading m={4} fontSize={'3xl'}>Connexion</Heading>
                <Text > 
                    Vous n'avez pas encore de compte ? 
                </Text>
                <Link href={'/associations/register'} >
                    <Text fontWeight={'bold'} opacity={'0.8'} fontSize={'sm'}>Inscrivez votre Organisation </Text>
                </Link>
            </VStack>
        </CardHeader>
        
        <CardBody mt={'20px'}>
            <form>
            <FormControl >
                <HStack justify={'space-between'}>
                <FormLabel>Addresse email? * 
                    <Input type="email" name="email" onChange={e=> handleChange(e)} value={userData.email} required/>
                </FormLabel>
                
                <FormLabel>Mot de passe*:   
                    <Input type="password" name="password" onChange={e=> handleChange(e)} value={userData.password} required/>
                </FormLabel>
                
                </HStack>
            </FormControl>
            </form>
        </CardBody>

        <CardFooter>
            <VStack align={'start'} w={'100%'}>
            <Button variant={'outline'} colorScheme={'blue'} onClick={handleSubmit} w={'100%'}> Acceder à mon compte </Button>
            <Link href={'/associations/register'} >
                <Text fontWeight={'bold'} opacity={'0.8'} fontSize={'sm'}>Mot de passe oublié ?</Text>
            </Link>
            </VStack>
        </CardFooter>
        </Card>
    )
}