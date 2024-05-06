import { NavLink } from 'react-router-dom';
import './Header.css';
import UserMenu from '../../components/navigation/UserMenu';

const Header = () => {

    return (
        <div id='header'>
            <NavLink to='/'>LeanCon - POC</NavLink>
            <UserMenu />
        </div>
    )
}

export default Header;
