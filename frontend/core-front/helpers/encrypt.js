
import * as crypto from 'crypto'




const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
const ecnryption_method = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD


const key = crypto
  .createHash('sha512')
  .update(secret_key)
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update(secret_iv)
  .digest('hex')
  .substring(0, 16)

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
}

// Decrypt data
export function decryptData(encryptedData) {
  const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV)
  return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8')
}