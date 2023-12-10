import { assos } from "@/helpers/asso";
import { Button, Card, CardBody, CardFooter, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";


export default function CardAsso({asso}){

    
    return (
    <Card size={'lg'}  overflow={'hidden'} pb={4} >
        <Flex  w={'100%'} h={{base: '15vh', xl:'35vh'}}  bgImage={`url(${asso.cover})`} p={8} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'} alignItems={'end'}></Flex>
        <Stack justifyContent={'space-between'}>
          <CardBody>
            <Heading pb={4}size={{base:'sm', xl :'md'}}>{asso.name}</Heading>
            <Text py={2}  opacity={'0.8'} overflow={'hidden'} whiteSpace={'nowrap'} textOverflow='ellipsis'>{asso.description}</Text>
          </CardBody>

          <CardFooter justifyContent={'space-between'} alignContent={'center'} py={0}>
            <Link href={`/donate/${assos.indexOf(asso)}`}><Button colorScheme={'blue'}>Je donne</Button></Link>
            <Button my={'auto'} size={'xs'} variant='outline' colorScheme='teal' cursor={'default'} borderRadius={'full'}>{asso.category}</Button>
          </CardFooter>
        </Stack>
    </Card>
    )
}