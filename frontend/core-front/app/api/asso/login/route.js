import { cookies } from 'next/headers'
import axios from "axios";




export async function POST(request) {
    const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
    const {email , password} = await request.json()

    try {
        const response = await axios.post(`${CMS_URL}auth/local`, {identifier: email , password})
        cookies().set('jwt', response.data.jwt,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        
        return Response.json(response.data)
    }catch(e) {

        return Response.error()
    }
}