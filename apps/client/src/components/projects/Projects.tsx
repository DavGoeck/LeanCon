import { NavLink } from 'react-router-dom'
import ProjectList from './ProjectList'
import ProjectCreator from './ProjectCreator'

import './Projects.css'

const Projects = () => {

    return (
        <div id="projects">
            <ProjectHeadline />
            <ProjectList />
            <ProjectCreator />
        </div>
    )
}

const ProjectHeadline = () => {
    return (
        <div className="headline">
            <h1>Projekte</h1> <NavLink to="/projekte/neu">Neues Projekt</NavLink>
        </div>
    )
}

export default Projects