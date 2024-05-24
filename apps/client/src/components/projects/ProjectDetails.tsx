import ProjectLink from '../navigation/ProjectLink'
import API from '../../api-client'
import useUser from '../../hooks/useUser'
import useCurrentProject from "../../hooks/useCurrentProject.ts";

const ProjectDetails = () => {
    const { project, setProject } = useCurrentProject()
    const { bearer } = useUser()

    const publishProject = async () => {
        const response = await API.projects.start.mutation({
            params: { id: project.id },
            body: {},
            headers: { authorization: bearer }
        })
        if (response.status === 200) {
            setProject(response.body)
        }
    }

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

export default ProjectDetails