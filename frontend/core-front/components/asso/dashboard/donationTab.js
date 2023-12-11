'use client'
import React from "react";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";


export default function DonationTab() {
  const data = [
    { name: "Segun Adebayo", email: "sage@chakra.com", date: '08/12/2023', montant: '200 USDC', url:'' },
    { name: "Josef Nikolas", email: "Josef@mail.com", date: '08/12/2023', montant: '50 USDC', url:'' },
    { name: "Lazar Nikolov", email: "Lazar@mail.com", date: '08/12/2023', montant: '500 USDC', url:'' },
    { name: "Abraham", email: "abraham@anu.com", date: '08/12/2023', montant: '1500 USDC', url:'' },
  ];
  const dataColor = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  return (
    <Box >
      <Flex
      w="full"
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        gap={{base: 4, lg: 10}}
      >
        {data.map((person, pid) => {
          return (
            <Flex
              direction={{ base: "row", lg: "column" }}
              bg={dataColor}
              key={pid}
              shadow="lg"
            >
              <SimpleGrid
                spacingY={5}
                columns={{ base: 1, lg: 5 }}
                w={{ base: 120, md: "full" }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{ base: 4, lg: 4 }}
                px={{ base: 2, lg: 10 }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Name</span>
                <span>Email</span>
                <span>Date</span>
                <span>Montant</span>
                <chakra.span textAlign={{ lg: "right" }}>Actions</chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={8}
                columns={{ base: 1, lg: 5 }}
                w="full"
                py={4}
                px={10}
                fontWeight="hairline"
              >
                <span>{person.name}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {person.email}
                </chakra.span>
                <chakra.span
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {person.date}
              </chakra.span>
              <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {person.montant}
            </chakra.span>
                <Flex justify={{ lg: "end" }}>
                  <Button as={'a'}  href={person.url} variant="solid" size="sm">
                    + Info
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
      </Flex>
    </Box>
  );
};
