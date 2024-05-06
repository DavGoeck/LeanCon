import { decode } from 'js-base64'

export const parseJwt = (token: string | null) => {
    if (!token) return null
    const jwtContent = token.split('.')[1]
    const data = decode(jwtContent)
    return JSON.parse(data)
}
