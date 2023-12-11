import axios from "axios";
import { nftABI, nftAddress } from "@/helpers/coreNFTContract";
import { faucetAddress } from "@/helpers/faucet";
import { writeContract } from "@wagmi/core";


export async function POST(request){

    const {address} = await request.json()

        const {hash} = await writeContract({
            address: nftAddress, 
            abi: nftABI,
            functionName: 'approveDonnors',
            args: [address],
            account: faucetAddress,
        })

        
        return Response.json('ok')


}