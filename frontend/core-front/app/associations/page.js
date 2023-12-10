import { Box, Button, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function HomeAsso() {
    return (
        <Center flexDirection={'column'} p={3} h={'80vh'}>
            <Image src={'/login-icon.png'} boxSize={'300px'}/>
            <Heading mb='6' textAlign={'center'}>Amplifiez votre impact social ! </Heading>
            <Text mb='6' textAlign={'center'}>
                Explorez notre service de rendement sur mesure pour les Organisations. <br/>
                Connectez-vous ou inscrivez-vous pour optimiser votre efficacité dès maintenant.
            </Text>
            <HStack>
                <Link href={'associations/register'}><Button colorScheme={'blue'}>S'inscrire</Button></Link>
                <Link href={'associations/login'}><Button>Se connecter</Button></Link>
            </HStack>

        </Center>
    )
}