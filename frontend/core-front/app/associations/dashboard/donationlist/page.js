import DonationTab from "@/components/asso/dashboard/donationTab";
import { Heading } from "@chakra-ui/layout";


export default function DonationList(){

    return (
        <>
        <Heading px={50} py={4} >Historique des Dons</Heading>
        <DonationTab/>
        </>
    )
}