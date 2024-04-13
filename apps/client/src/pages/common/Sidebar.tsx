import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => (
    <div id="sidebar">
        <NavLink to="/projekte">Projekte</NavLink>
        <NavLink to="/zeitplan">Zeitplan</NavLink>
        <NavLink to="/leistungsverzeichnis">Leistungsverzeichnis</NavLink>
        <NavLink to="/gewerke">Gewerke</NavLink>
    </div>
)

export default Sidebar;