'use client'


import ConnectModal from "@/components/donate/modals/ConnectModal";
import PaymentModal from "@/components/donate/modals/paymentModal";
import { assos } from "@/helpers/asso";
import { tokens } from "@/helpers/tokens";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { fetchBalance } from "@wagmi/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { readContracts, useAccount, useBalance } from "wagmi";


export default function Payment(){
    const params = useParams()
    const asso = assos[params.id]
    const [showTooltip, setShowTooltip] = useState(false)
    const [sliderValue, setSliderValue] = useState(5)
    
    const [arrTokens , setTokens] = useState(tokens)
    const [currentBalance, setBalance] = useState('')
    const [formData, setFormData] = useState({token: arrTokens[0], amount: '', tips: 0, total: 0, to: asso.address})

    const {onOpen: onConnectOpen, isOpen: isConnectOpen, onClose: onConnectClose} = useDisclosure()
    const {onOpen: onPaymentOpen, isOpen: isPaymentOpen, onClose: onPaymentClose} = useDisclosure()

    const {address, isConnected} = useAccount()

    useEffect(()=>{

        if(address){

            let arr = []
    
            arrTokens.forEach(async (token) => {
                const balance = await fetchBalance({
                    address,
                    token: token.contract
                })
    
                token.balance = Number((Math.round(balance.formatted * 100) / 100).toFixed(2));
    
                arr.push(token)
                if(arr.length === arrTokens.length) {
                    setTokens(arr)
                }
            })
        }

    }, [address])

    useEffect(()=>{
        const tips = (sliderValue * formData.amount) / 100 
        const total = Number(tips) + Number(formData.amount)
        setFormData({...formData, tips: tips, total: total})

        
        
        }, [sliderValue])

    function handleChange(e){
        const {name, value} = e.target

        if(name === 'token'){
            setFormData(prev => {
                return {...prev, [name]: arrTokens[value]}
            })
            const selectedToken = arrTokens[value] 

            if(selectedToken){
                setBalance(selectedToken.balance)
            }
        }else if(name === 'amount'){
                const tips = (sliderValue * formData.amount) / 100
                const total = Number(tips) + Number(value)
                setFormData(prev => {
                    return {...prev, [name]: Number(value), total: total, tips: tips}
                })
        }
        else{
            setFormData(prev => {
                return {...prev, [name]: value}
            })
        }
    }

    return ( 
        <Box p={10}>
            <HStack mb={10}>
                <Avatar src={asso.logo} size={'xl'} />
                <VStack>
                    <Heading size={'lg'}>
                        Faire un don à {asso.name}
                    </Heading>
                </VStack>
            </HStack>

            <SimpleGrid columns={{base: 1, md: 3 }} spacing={6}>
                <Card overflow={'hidden'}>
                    <CardHeader justifyContent={'center'} bg={'#2b6cb0'}>
                    <Flex justifyContent={'center'}>
                        <Heading color={'white'} size={'md'} >Mes coordonées</Heading>
                    </Flex>
                    </CardHeader> 

                    <CardBody>                        
                        <form>
                            <Accordion allowToggle pb={4} >
                                <AccordionItem border={'none'}>
                                    <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' >
                                            <Text fontWeight={'bolder'}>Payer en tant qu'organisme</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <FormLabel>
                                            Raison sociale*
                                            <Input mt={2}/>
                                        </FormLabel>
                                        <FormLabel>
                                            SIREN*
                                            <Input mt={2}/>
                                        </FormLabel>
                                        <FormLabel>
                                            Forme juridique*
                                            <Input mt={2}/>
                                        </FormLabel>
                                        <FormLabel w={'100%'}>
                                        Addresse*
                                        <Input mt={2} w={'100%'}/>
                                        </FormLabel>
                                        <FormLabel >
                                        Code Postal*
                                        <Input mt={2}/>
                                        </FormLabel>
                                        <FormLabel>
                                            Ville*
                                            <Input mt={2}/>
                                        </FormLabel>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <FormControl >
                                <VStack spacing={4} align={'start'}>
                                <HStack >
                                    <FormLabel >
                                        Prénom*
                                        <Input mt={2}/>
                                    </FormLabel>
                                    <FormLabel>
                                        Nom*
                                        <Input mt={2}/>
                                    </FormLabel>
                                </HStack>
                                <FormLabel w={'100%'}>
                                Mail*
                                <Input mt={2} w={'100%'}/>
                                </FormLabel>
                                <HStack>
                                </HStack>
                                        <Text opacity={'0.8'}>* Champs obligatoires</Text>
                                </VStack>
                            </FormControl>
                        </form>
                    </CardBody>
                </Card>

                <Card overflow={'hidden'}>
                    <CardHeader justifyContent={'center'} bg={'#2b6cb0'}>
                    <Flex justifyContent={'center'}>
                        <Heading color={'white'} size={'md'} >Mon don</Heading>
                    </Flex>
                    </CardHeader>
                    <CardBody>
                    <form>  
                        <FormControl >
                            <FormLabel> Choisissez un token</FormLabel>
                            <Select mb={4} name='token' value={arrTokens.indexOf(formData.token)} onChange={(e)=>handleChange(e)} >
                                {
                                    arrTokens.map(token =>{
                                        return <option key={arrTokens.indexOf(token)} value={arrTokens.indexOf(token)}>{token.symbol}</option>
                                    })
                                }
                            </Select>
            
                            <FormLabel> Le montant de votre don</FormLabel>
                            <Input placeholder="0.00" type="number"  step='any' name="amount" value={formData.amount} onChange={e => handleChange(e)} />
                            <Text fontSize={'sm'}>Balance: {currentBalance}</Text>

                            <FormLabel mt={4}>Contribution Core:</FormLabel>
                            <Slider
                            id='slider'
                            defaultValue={5}
                            min={0}
                            max={100}
                            colorScheme='teal'
                            onChange={(v) => {setSliderValue(v)}}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            value={sliderValue}
                            name={'tips'}
                          >
                            <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                              25%
                            </SliderMark>
                            <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                              50%
                            </SliderMark>
                            <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                              75%
                            </SliderMark>
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                              hasArrow
                              bg='teal.500'
                              color='white'
                              placement='top'
                              isOpen={showTooltip}
                              label={`${sliderValue}%`}
                            >
                              <SliderThumb />
                            </Tooltip>
                          </Slider>
                        </FormControl>
                    </form>
                    </CardBody>
                </Card>

                <Card overflow={'hidden'}>
                    <CardHeader justifyContent={'center'} bg={'#2b6cb0'}>
                    <Flex justifyContent={'center'}>
                        <Heading color={'white'} size={'md'} >Mon récapitulatif</Heading>
                    </Flex>
                    </CardHeader>
                    <CardBody>
                        <TableContainer size={'sm'} w={'95%'}>
                            <Table variant='simple'  >
                            <Thead>
                                <Tr>
                                <Th>Montant</Th>
                                <Th>Contribution</Th>
                                <Th>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                <Td>{formData.amount}</Td>
                                <Td>{formData.tips}</Td>
                                <Td>{formData.total}</Td>
                                </Tr>
                            </Tbody>
                            </Table>
                        </TableContainer>
                        
                    </CardBody> 
                    <CardFooter>
                    <VStack gap={6}>
                        <Text fontSize={'xs'} >
                        CORE est une entreprise sociale et solidaire, qui fournit gratuitement ses technologies de paiement à l'organisme {asso.name}. 
                        Une contribution au fonctionnement de CORE, modifiable et facultative, vous sera proposée avant la validation de votre paiement.
                        </Text>
                        {
                            isConnected ? 
                            <Button colorScheme={'blue'} variant={'ghost'} onClick={onPaymentOpen} isDisabled={currentBalance < formData.total || formData.total === ''} > 
                            {
                                currentBalance < formData.total ?
                                'Le montant est trop élevé':
                                'Valider votre Don'
                            }
                            </Button> : 
                            <Button colorScheme={'blue'} variant={'ghost'} onClick={onConnectOpen} > Connectez vous</Button>
                        }
                    </VStack>
                    </CardFooter> 


                </Card>
            </SimpleGrid>
            
            <PaymentModal isOpen={isPaymentOpen} onClose={onPaymentClose}  data={formData}/>
            <ConnectModal isOpen={isConnectOpen} onClose={onConnectClose}/>
        </Box>
    )
}