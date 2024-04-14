import ProjectList from './ProjectList'
import ProjectCreator from './ProjectCreator'

import './Projects.css'
import { Link } from 'react-router-dom'

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
            <h1>Projekte</h1> <Link to="/projekte/neu">Neues Projekt</Link>
        </div>
    )
}

export default Projects