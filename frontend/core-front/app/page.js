'use client'
import React from "react";
import { chakra, Box, Icon, Image, SimpleGrid} from "@chakra-ui/react";
import { assos } from "@/helpers/asso";

import CardAsso from "@/components/CardAsso";

export default function Home() {
  return (
    <Box>
      <Box pos="relative" overflow="hidden" bg={'white'} zIndex={-1}>
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
            maxW={{ lg: "2xl" }}
            w={{ lg: "full" }}
            zIndex={1}
            bg={'white'}
            border="solid 1px transparent"
          >
            <Icon
              display={{ base: "none", lg: "block" }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={'white'}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </Icon>
            <Box
              mx="auto"
              maxW={{ base: "7xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
              mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
            >
              <Box
                w="full"
                textAlign={{ sm: "center", lg: "left" }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color="gray.900"
                >
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    DÉCUPLONS L'IMPACT{" "}
                  </chakra.span>
                  <chakra.span
                    display={{ base: "block", xl: "inline" }}
                    color="brand.600"
                    _dark={{ color: "brand.400" }}
                  >
                    DES ONG
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  fontSize={{ sm: "lg", md: "xl" }}
                  maxW={{ sm: "xl" }}
                  mx={{ sm: "auto", lg: 0 }}
                  color="gray.500"
                >
                  L’application pour faire des dons à des ONG en cryptomonnaies, 
                  et leur offrir la possibilité de les faire fructifier, 
                  grâce à la technologie blockchain et à la finance décentralisée. 
                </chakra.p>
            
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          position={{ lg: "absolute" }}
          top={{ lg: 0 }}
          bottom={{ lg: 0 }}
          right={{ lg: 0 }}
          w={{ lg: "50%" }}
          border="solid 1px transparent"
        >
          <Image
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src='/hero.jpg'
            alt=""
            loading="lazy"
          />
        </Box>
      </Box>


        <SimpleGrid columns={{base: 1,md:2, lg: 3}} spacing={4} px={4} py={8} bg={'#edf2f7'} shadow={'md'}>
          {
            assos.map(asso => {

              return (
                <CardAsso asso={asso}/>
              )
            })
          }
        </SimpleGrid>
      
    </Box>
  );
};
