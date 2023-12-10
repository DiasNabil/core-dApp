'use client'

import {Flex, HStack, Box, VStack, IconButton, CloseButton, Button,  InputGroup, InputLeftElement, Input  } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import Logo from "@/app/Logo";
import { useDisclosure } from '@chakra-ui/react'
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const mobileNav = useDisclosure();
    const pathName = usePathname()

    const assoPath = [
        '/associations/dashboard',
        '/associations/dashboard/profile',
        '/associations/dashboard/donationlist'
    ]

    return ( 
        <Box as="header"
          w="full"
          px={{
            base: 2,
            sm: 4,
          }}
          py={4}
          shadow="md"
          display={assoPath.includes(pathName) ? 'none' : 'block'}
          >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <HStack display="flex" spacing={3} alignItems="center" zIndex={2}>
                    <Box
                        display={{
                        base: "inline-flex",
                        lg: "none",
                    }}
                    >
                        <IconButton
                        display={{
                            base: "flex",
                            lg: "none",
                        }}
                        aria-label="Open menu"
                        fontSize="20px"
                        color="gray.800"
                        _dark={{
                            color: "inherit",
                        }}
                        variant="ghost"
                        icon={<CiMenuBurger  />}
                        onClick={mobileNav.onOpen}
                        />
                        <VStack
                        pos="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bg={'white'}
                        display={mobileNav.isOpen ? "flex" : "none"}
                        flexDirection="column"
                        p={2}
                        pb={4}
                        m={2}
                        spacing={12}
                        rounded="sm"
                        shadow="sm"
                        >
                        <CloseButton
                        aria-label="Close menu"
                        justifySelf="self-start"
                            onClick={mobileNav.onClose}
                            />
                            <Link href={'/about'} >
                            <Button w="full" variant="ghost" >
                            Notre Mission
                            </Button>
                            </Link>

                            <Link href={'/lists'} >
                            <Button
                            w="full"
                            variant="solid"
                            colorScheme={'blue'}
                            >
                            Faire un Don
                            </Button>
                            </Link>

                            <Link href={'/associations'} >
                            <Button
                            w="full"
                            variant="ghost"
                            >
                            Portail Associations
                            </Button>
                            </Link>
                            </VStack>
                    </Box>
                    <Link
                        href="/"
                    >
                        <Logo />
                    </Link> 
                </HStack>

                <HStack
                spacing={3}
                display={mobileNav.isOpen ? "none" : "flex"}
                alignItems="center"
                >
                <Link href={'/about'} >
                <Button w={'250px'} display={{base: "none", lg: "flex"}} >Notre Mission</Button>
                </Link>


                <InputGroup>
                <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
                </InputLeftElement>
                <Input type="tel" placeholder="Search..." />
                </InputGroup>
                
                <Link href={'/lists'} >
                    <Button display={{base: "none", md: "flex"}} colorScheme={'blue'}>Faire un Don</Button>
                </Link>
                <Link href={'/associations'} >
                    <Button display={{base: "none", md: "flex"}}>Portail ONG</Button>
                </Link>
                
                </HStack>
            </Flex>
        </Box>
    )
}