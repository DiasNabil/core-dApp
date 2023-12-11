'use client'

import { useEffect, useState } from "react"
import { tokens } from "@/helpers/tokens"
import { fetchBalance , sendTransaction } from "@wagmi/core"
import { Button, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/react"
import axios from "axios"
import { writeContract } from "viem/_types/actions/wallet/writeContract"



export default function TransactionForm({address}) {
    const [arrTokens , setTokens] = useState(tokens)
    const [formData, setFormData] = useState({token: null, amount: null, takerAddress: address})
    const [currentBalance, setBalance] = useState('')

    useEffect(()=>{
        let arr = []

        arrTokens.forEach(async (token) => {
            const balance = await fetchBalance({
                address,
                token: token.contract
            })

            token.balance = Number((Math.round(balance.formatted * 100) / 100).toFixed(2));

            arr.push(token)
            if(arr.length === arrTokens.length) {
                setTokens(arr)
            }
        })

    }, [])

    function handleChange(e){
        const {name, value} = e.target

        if(name === 'token'){
            const string = value
            const token = JSON.parse(string)
            setFormData(prev => {
                return {...prev, [name]: token}
            })

            const selectedToken = token 

            if(selectedToken){
                setBalance(selectedToken.balance)
            }
        }else{
            setFormData(prev => {
                return {...prev, [name]: value}
            })
        }

    }

    async function handleSubmit(e){

        e.preventDefault()
        formData.amount = Number(formData.amount + '0.005')
        const sellAmount = Number(formData.amount*10**formData.token.decimals)
        const data = {...formData, sellAmount}

        try{
            const params = {
                sellToken: data.token.contract,
                buyToken: tokens[0].contract,
                sellAmount: data.sellAmount,
                takerAddress: data.takerAddress,
                sources: ["Uniswap_V3"]
            }

            console.log(params)
            const headers = {
                '0x-api-key': process.env.NEXT_PUBLIC_0x_API_KEY,
            }

            const url = process.env.NEXT_PUBLIC_0x_URL+'/swap/v1/quote'

            const response = await axios.get(url, {params, headers})
            const receipt = await sendTransaction({
                to: response.data.to,
                data: response.data.data
            })
            console.log({receipt, response})
        }catch(e) {
            return console.error(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>  
            <FormControl>
                <FormLabel> Choisissez un token</FormLabel>
                <Select name='token' onChange={e =>handleChange(e)}>
                    {
                        arrTokens.map(token =>{
                            return <option key={arrTokens.indexOf(token)} value={JSON.stringify(token)}>{token.symbol}</option>
                        })
                    }
                </Select>

                <FormLabel> Le montant de votre don</FormLabel>
                <Input placeholder="0.00" type="number"  step='any' name="amount" onChange={e =>handleChange(e)}/>
                <Text>
                    Disponible: {currentBalance}
                </Text>

                <Button type='submit' isDisabled={currentBalance < formData.amount || formData.amount === ''}> 
                    {
                        currentBalance < formData.amount ?
                        'Le montant est trop élevé':
                        'Valider votre Don'
                    }
                
                </Button>
            </FormControl>
        </form>
    )
}