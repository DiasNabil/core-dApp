import LoginForm from "@/components/asso/loginForm";
import { Center } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'



export default function login(){

    
    if(cookies().get('jwt')){
        redirect('/associations/dashboard')
    }
    
    return ( 
        <Center flexDirection={'column'} gap={5}>
            <LoginForm/>
        </Center>
    )
}