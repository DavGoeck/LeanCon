import { useContext } from 'react'
import TokenContext from '../context/TokenContext.tsx'
import { Credentials, User, UserSchema } from 'api'
import API from '../api-client.ts'
import { decode } from 'js-base64'

const useUser = () => {
    const { token, setToken } = useContext(TokenContext)

    const login = async (credentials: Credentials) => 
        await API.auth.signIn.mutation({ body: credentials })
        
    const logout = () => setToken(null)

    let user: User | null = null
    if(token) {
        const data = token.split('.')[1]
        user = UserSchema.parse(JSON.parse(decode(data)))
    }
    return { user, token, setToken, login, logout }
}

export default useUser