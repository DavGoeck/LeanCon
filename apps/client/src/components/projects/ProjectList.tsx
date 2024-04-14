import API from '../../api-client';
import { useQueryClient } from '@tanstack/react-query'

type Project = {
    id: string,
    title: string
}

const ProjectList = () => {

    const { data } = API.projects.getAll.useQuery(['projects'])
    const projects: Project[] = data?.body || []

    const queryClient = useQueryClient() ;

    const { mutate: deletion } = API.projects.remove.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const deleteProject = (id: string) => {
        return () => {
            deletion({ params: { id } , body: {}})
        }
    }

    if(!projects) return <></>

    const projectList = projects.map(project => {
        const { id, title } = project;
        return (
            <div className="project-row" key={id}>
                <span className="project-title">{title}</span>
                <span className="project-delete" onClick={deleteProject(id)}>Löschen</span>
            </div>
        )
    })

    return (
        <div>
            { projectList }
        </div>
    )
}

export default ProjectList