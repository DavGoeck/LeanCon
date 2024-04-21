import { NavLink } from 'react-router-dom';
import './Header.css';
import useUser from '../../hooks/useUser.ts';

const Header = () => {
    const { user } = useUser()

    const logInOut = user ?
        <span style={{ display: 'flex' }}><span>Hallo, { user.firstName } { user.lastName }</span><NavLink to='/nutzer/logout'>Logout</NavLink></span> :
        <NavLink to='/nutzer/login'>Login</NavLink>

    return (
        <div id='header'>
            <NavLink to='/'>LeanCon - POC</NavLink>
            { logInOut }
        </div>
    )
}

export default Header;
