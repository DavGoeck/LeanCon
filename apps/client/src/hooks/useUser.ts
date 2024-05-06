import { useContext } from 'react'
import TokenContext from '../context/TokenContext.tsx'
import { Credentials, UserSchema } from 'api'
import API from '../api-client.ts'
import useCookies, { Cookies } from './useCookies'
import { parseJwt } from '../utils/jwtUtils'
import useNav from './useNav'

const useUser = () => {
    const { token, setToken } = useContext(TokenContext)
    const [ cookies, setCookie, removeCookie ] = useCookies()
    const { toLogin } = useNav()

    const bearer = token ? `Bearer ${token}` : null
    
    const jwtContent: any = parseJwt(token)
    const user = jwtContent ? UserSchema.parse(jwtContent) : null

    const login = async (credentials: Credentials) => {
        const response = await API.auth.signIn.mutation({ body: credentials })
        const { body, status } = response
        if(status === 200) {
            const token = body['access-token']
            const jwtContent = parseJwt(token)
            setToken(token)
            setCookie(Cookies.JWT, token, {
                expires: new Date(1000 * jwtContent.exp)
            })
        }
        return response
    }

    const isLoggedIn = async () => {
        if (token) {
            const response = await API.user.me.query({ headers: { authorization: bearer }})
            if (response.status === 200) {
                return !!response.body
            }
        }
        return false
    }

    const checkLogin = async () => {
        const loggedIn = await isLoggedIn()
        if (!loggedIn) {
            const cookieToken = cookies['jwt-authorization']
            if(cookieToken) {
                setToken(cookieToken)
            } else {
                toLogin(location.pathname)
            }
        }
    }

    const logout = () => {
        removeCookie(Cookies.JWT)
        setToken(null)
    }

    return { bearer, user, login, isLoggedIn, checkLogin, logout }
}

export default useUser