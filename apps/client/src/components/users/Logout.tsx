import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser.ts'
import { useEffect } from 'react'

const Logout = () => {
    const { logout } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate('/nutzer/login')
    }, [])

    return <></>
}

export default Logout