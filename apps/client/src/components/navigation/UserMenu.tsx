import { NavLink } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { User } from 'api'

const UserMenu = () => {
    const { user } = useUser()

    return (<>
        <UserMenuComp user={user} />
        <LoginOrOut user={user} />
    </>)
}

type UserProps = { user: User | null }
const UserMenuComp = (props: UserProps) => {
    const { user } = props
    if (!user) return <></>
    return (<span>
        Hallo, { user.firstName } { user.lastName }
    </span>)
}
const LoginOrOut = (props: UserProps) => {
    return props.user ? <LogoutLink /> : <LoginLink />
}

const LogoutLink = () => <NavLink to='/nutzer/logout'>Logout</NavLink>
const LoginLink = () => <NavLink to='/nutzer/login'>Login</NavLink>

export default UserMenu