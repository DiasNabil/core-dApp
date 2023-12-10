'use client'
import {
    Box,
    Button,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,

    useDisclosure,
  } from "@chakra-ui/react";
import { FiMenu} from "react-icons/fi";
import React from "react";
import Logo from "@/app/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
  
export default function TemplateDashboard({children}){
    const sidebar = useDisclosure();

    const router = useRouter()
    
    async function logout() {
        try {
            await axios.get('/api/asso/logout')
            console.log('fin de la session de connexion.')
        } catch(e) {
            console.error('une erreur est survenue durant la deconnexion veuillez réessayer.')
        }

        router.push('/')
    }
  
    const NavItem = (props) => {
      const { icon, children, ...rest } = props;
      return (
        <Flex
          align="center"
          px="4"
          mx="2"
          rounded="md"
          py="3"
          cursor="pointer"
          color="whiteAlpha.700"
          _hover={{
            bg: "blackAlpha.300",
            color: "whiteAlpha.900",
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: "gray.300",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      );
    };
  
    const SidebarContent = (props) => (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="brand.600"
        borderColor="blackAlpha.300"
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Logo />
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="red"
          aria-label="Main Navigation"
        >
          <Link href='/associations/dashboard'><NavItem color={'black'}>Portefeuille</NavItem></Link>
          <Link href='/associations/dashboard/donationlist'><NavItem color={'black'}>Dons recus</NavItem></Link>
          <Link href='/associations/dashboard/profile'><NavItem color={'black'}>Fiche information</NavItem></Link>
          <Link href='/associations/dashboard'><NavItem color={'black'}>Reglages</NavItem></Link>
        </Flex>
      </Box>
    );
    return (
      <Box as="section" bg="gray.50" minH="100vh">
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify={{base:"space-between", md: 'flex-end'}}
            w="full"
            p="8"
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderBottomWidth="1px"
            borderColor="blackAlpha.300"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
  
            <Button onClick={logout} >Déconnexion</Button>
          </Flex>
  
          <Box as="main" p="4">
            {children}
          </Box>
        </Box>
      </Box>
    );
  }