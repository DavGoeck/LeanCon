import useUser from '../../hooks/useUser'
import useNav from '../../hooks/useNav'
import { useEffect } from 'react'

const Logout = () => {
    const { logout } = useUser()
    const { toLogin } = useNav()

    useEffect(() => {
        logout()
        toLogin()
    }, [])

    return <></>
}

export default Logout