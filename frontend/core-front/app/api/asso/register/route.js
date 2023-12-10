import axios from "axios";



export async function POST(request) {
    const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL
    const {email , password, encryptedPrivateKey, address, username} = await request.json()

    try {
        const response = await axios.post(`${CMS_URL}auth/local/register`, {email , password, encryptedPrivateKey, address, username})
            return Response.json(response.data)
    }catch(e) {
        return Response.error()
    }
}