import LoginForm from "@/components/asso/loginForm";
import { Center } from "@chakra-ui/react";




export default function login(){


    return ( 
        <Center flexDirection={'column'} gap={5}>
            <LoginForm/>
        </Center>
    )
}