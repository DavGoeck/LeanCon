import useUser from '../../hooks/useUser'
import useNav from '../../hooks/useNav'

const Logout = () => {
    const { logout } = useUser()
    const { toLogin } = useNav()

    logout()
    toLogin()

    return <></>
}

export default Logout