import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import Icon from '../helpers/Icon';
import useProject from '../../hooks/useProject';
import ProjectLink from './ProjectLink';

const Sidebar = () => {

    const links = []
    links.push(
        <NavLink key='projekte' to="/"><Icon name={'home'} />Projekte</NavLink>
    )
    
    const { project } = useProject()

    if (project) {
        links.push(
            <ProjectLink key='zeitplan' to="zeitplan"><Icon name={'clock'} />Zeitplan</ProjectLink>,
            <ProjectLink key='leistungsverzeichnis' to="leistungsverzeichnis"><Icon name={'list'} />Leistungsverzeichnis</ProjectLink>,
            <ProjectLink key='gewerke' to="gewerke"><Icon name={'tool'} />Gewerke</ProjectLink>
        )
    }

    return (
        <div id="sidebar">
            { links }
        </div>
    )
}

export default Sidebar;