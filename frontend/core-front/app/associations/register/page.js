import { Center } from "@chakra-ui/react";
import RegisterForm from "../../../components/asso/RegisterForm";

export default function Register(){
    return ( 
        <Center flexDirection={'column'} gap={5}>
            <RegisterForm/>
        </Center>
    )
}