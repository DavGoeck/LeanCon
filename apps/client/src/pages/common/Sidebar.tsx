import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import Icon from '../../components/utility/Icon';

const Sidebar = () => (
    <div id="sidebar">
        <NavLink to="/projekte"><Icon name={'home'} />Projekte</NavLink>
        <NavLink to="/zeitplan"><Icon name={'clock'} />Zeitplan</NavLink>
        <NavLink to="/leistungsverzeichnis"><Icon name={'list'} />Leistungsverzeichnis</NavLink>
        <NavLink to="/gewerke"><Icon name={'tool'} />Gewerke</NavLink>
    </div>
)

export default Sidebar;