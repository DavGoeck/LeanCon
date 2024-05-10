import ProjectLink from '../navigation/ProjectLink'
import useProject from '../../hooks/useProject'
import API from '../../api-client'
import useUser from '../../hooks/useUser'

const ProjectDetails = () => {
    const { project, setProject } = useProject()
    const { bearer } = useUser()

    const publishProject = async () => {
        if (project) {
            const response = await API.projects.update.mutation({ 
                params: { id: project.id },
                body: { published: new Date() },
                headers: { authorization: bearer }
            })
            if (response.status === 200) {
                setProject(response.body)
            }
        }
    }

    if (project) {
        const published = project.published && project.published.getFullYear() > 1970
        return <>
            <div className="headline">
                <h1>Projekt Details</h1>
                <ProjectLink to={'bearbeiten'}>Bearbeiten</ProjectLink>
            </div>
            <div>
                <p>{project.title}</p>
                { !published && <button onClick={publishProject}>Projekt veröffentlichen</button>}
            </div>
        </>
    }
    return <></>
}

export default ProjectDetails