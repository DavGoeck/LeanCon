import ProjectLink from '../navigation/ProjectLink'
import useProject from '../../hooks/useProject'

const ProjectDetails = () => {
    const { project } = useProject()
    if (!project) return <></>
    return <>
        <div className="headline">
            <h1>Projekt Details</h1>
            <ProjectLink to={'bearbeiten'}>Bearbeiten</ProjectLink>
        </div>
        <div>
            <p>{project.title}</p>
        </div>
    </>
}

export default ProjectDetails