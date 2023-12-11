'use client'
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VisuallyHidden,
  chakra,
  Divider,
} from "@chakra-ui/react";

export default function ProfileForm () {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    website:'',
    description: '',
    logo: '',
    cover: '',
    location:'',
    city: '',
    postcode:'',

  })

  function handleChange(e){
    const {name, value} = e.target
    setUserData(prev => {
        return {...userData, [name]: value}
    })
  }

  function handleSubmit(e){

    e.preventDefault()
    console.log(userData)
  }

  return (
    <Box p={10}>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <Box>
        <SimpleGrid
          display={{ base: "initial", lg: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Profile
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Ces informations seront publiées publiquement 
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <form>
            <box
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                bg="white"
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Votre site web
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        bg="gray.50"
                        _dark={{ bg: "gray.800" }}
                        color="gray.500"
                        rounded="md"
                      >
                        http://
                      </InputLeftAddon>
                      <Input
                        type="url"
                        name="website"
                        value={userData.website}
                        onChange={(e)=>handleChange(e)}
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <div>
                  <FormControl id="email" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      placeholder="you@example.com"
                      name="description"
                      value={userData.description}
                      onChange={(e)=>handleChange(e)}
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                    />
                    <FormHelperText>
                      Description détaillé de votre profile
                    </FormHelperText>
                  </FormControl>
                </div>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{ color: "gray.50" }}
                  >
                    Photo
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    <Avatar
                      boxSize={12}
                      bg="gray.100"
                      _dark={{ bg: "gray.800" }}
                      name={userData.name}
                      src={userData.logo}
                    />
                    <Button as={'label'}
                      cursor={'pointer'}
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      
                    >
                    <span>Modifier</span>
                      <VisuallyHidden>
                        <input
                          name="logo"
                          type="file"
                          value={userData.logo}
                          onChange={(e)=>handleChange(e)}
                          accept=".jpg, .jpeg, .png"
                        />
                      </VisuallyHidden>
                    </Button>
                  </Flex>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{ color: "gray.50" }}
                  >
                    Cover photo
                  </FormLabel>
                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    _dark={{ color: "gray.500" }}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    <Stack spacing={1} textAlign="center">
                      <Icon
                        mx="auto"
                        boxSize={12}
                        color="gray.400"
                        _dark={{ color: "gray.500" }}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Icon>
                      <Flex
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                        alignItems="baseline"
                      >
                        <chakra.label
                          htmlFor="cover"
                          cursor="pointer"
                          rounded="md"
                          fontSize="md"
                          color="brand.600"
                          _dark={{ color: "brand.200" }}
                          pos="relative"
                          _hover={{
                            color: "brand.400",
                            _dark: { color: "brand.300" },
                          }}
                        >
                          <span>Upload a file</span>
                          <VisuallyHidden>
                            <input
                              name="cover"
                              type="file"
                              value={userData.cover}
                              onChange={(e)=>handleChange(e)}
                              accept=".jpg, .jpeg, .png"
                            />
                          </VisuallyHidden>
                        </chakra.label>
                        <Text pl={1}>or drag and drop</Text>
                      </Flex>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        _dark={{ color: "gray.50" }}
                      >
                        PNG, JPG, GIF up to 10MB
                      </Text>
                    </Stack>
                  </Flex>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg="gray.50"
                _dark={{ bg: "#121212" }}
                textAlign="right"
              >
              </Box>
            </box>
            </form>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{ borderColor: "whiteAlpha.300" }}
        visibility={{ base: "hidden", sm: "visible" }}
      />

      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: "initial", lg: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Informations personnelles
              </Heading>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{ bg: "#141517" }}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Nom de la société
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={userData.name}
                      onChange={(e)=>handleChange(e)}
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor={'mail'}
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Email 
                    </FormLabel>
                    <Input
                      type="mail"
                      name="mail"
                      id="mail"
                      value={userData.mail}
                      onChange={userData.mail}
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="phone"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Telephone
                    </FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={userData.phone}
                      onChange={(e)=>handleChange(e)}
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    >
                    </Input>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="location"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Addresse du siège
                    </FormLabel>
                    <Input
                      type="text"
                      name="location"
                      value={userData.location}
                      onChange={(e) => handleChange(e)}
                      id="street_address"
                      
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <FormLabel
                      htmlFor="city"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Ville
                    </FormLabel>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      onChange={(e) => handleChange(e)}
                      value={userData.city}
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                    <FormLabel
                      htmlFor="postcode"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Code postal
                    </FormLabel>
                    <Input
                      type="number"
                      name="postcode"
                      id="postcode"
                      value={userData.postcode}
                      onChange={(e)=>handleChange(e)}
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>
                </SimpleGrid>
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>

        <Box
        px={{ base: 4, sm: 6 }}
        py={3}
        bg="gray.50"
        _dark={{ bg: "#121212" }}
        textAlign="right"
      >
      <Button
        type="submit"
        variant="outline"
        _focus={{ shadow: "" }}
        fontWeight="md"
      >
        Sauvegarder
      </Button>

      </Box>
      </Box>
    </form>
    </Box>
  );
};

