'use client'

import ConnectModal from "@/components/donate/modals/ConnectModal"
import { assos } from "@/helpers/asso"
import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card"
import { useDisclosure } from "@chakra-ui/hooks"
import { Center, Flex, Grid, GridItem, Heading, Stack, Text} from "@chakra-ui/layout"
import {useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"

export default function pageAssociation() {
    const params = useParams()
    
    const asso = assos[params.id]
    const router = useRouter()
    
return (
    <Center p={10}>
        <Grid w={{base: '100vw', lg: '900px', '2xl': '1500px'}} h={{md:'650px'}} templateRows={{lg:'repeat(3, 1fr)'}} templateColumns={{base:'repeat(1, 1fr)', lg:'repeat(3, 1fr)'}} gap={4}>
            <GridItem rowSpan={{md: 2}} colSpan={{md: 2}} borderRadius={'10'} overflow={'hidden'} h={{base: '60vh', lg: '100%'}}  >
                    <Flex w={'100%'} h={'100%'}  bgImage={`url(${asso.cover})`} p={8} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'} alignItems={'end'} boxShadow={'rgba(0, 0, 0, 0.45) 0px -150px 36px -28px inset'}>
                        <Heading size={'lg'} color={'white'}>{asso.name}</Heading>
                    </Flex>
            </GridItem>
            <GridItem  rowSpan={{md: 3}} colSpan={{md: 1}}borderRadius={'10'} >
                <Card w={'100%'} h={'100%'}  >
                    <CardHeader>
                        <Avatar src={asso.logo} name={asso.name} size={'xl'} />
                    </CardHeader>
                    <CardBody>
                        <Heading mb={3} size={'md'} >Notre Mission : </Heading>
                        <Text opacity={'0.8'}>{asso.description}</Text>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem   rowSpan={{md: 1}} colSpan={{md: 2}} borderRadius={'10'}  >
                <Card w={'100%'} h={'100%'} >
                    <CardHeader>
                        <Heading size={'md'}>La cause que soutient {asso.name} vous tiens a coeur ?</Heading> 
                    </CardHeader>
                    <CardBody>
                    <Stack flexDirection={{base: 'column', lg: 'row' }} justifyContent={'space-between'} align={{lg: 'center'}} flexWrap={'nowrap'} gap={10}>
                        <Text opacity={'0.8'}>Permettez a {asso.name} de bénéficier d'une nouvelle source de revenus via les cryptomonnaies. Offrez aux Organisation la possibilité de décupler leur impact.</Text>    
                        <Button borderRadius={'full'}  p={8} colorScheme={'blue'} onClick={()=>router.push(`/donate/${params.id}/payment`)}
                        > 
                            Je donne 
                        </Button>
                    </Stack>
                    </CardBody>

                </Card>
            </GridItem>
            
        
        </Grid>
    </Center>

)
}