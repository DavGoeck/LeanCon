import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => (
    <div id="sidebar">
        <div>
            <NavLink to="/projekte">Projekte</NavLink>
        </div>
        <div>
            <NavLink to="/zeitplan">Zeitplan</NavLink>
        </div>
        <div>
            <NavLink to="/leistungsverzeichnis">Leistungsverzeichnis</NavLink>
        </div>
        <div>
            <NavLink to="/gewerke">Gewerke</NavLink>
        </div>
    </div>
)

export default Sidebar;