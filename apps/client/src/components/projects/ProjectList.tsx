import { useQueryClient } from '@tanstack/react-query'
import useUser from '../../hooks/useUser.ts'

import { Project } from 'api'
import API from '../../api-client'

import './Projects.css'
import useNav from '../../hooks/useNav'

const ProjectList = () => {
    const { navigate } = useNav()
    const { bearer } = useUser()

    const { data } = API.projects.getAll.useQuery(['projects', bearer], { headers: { authorization: bearer }})
    const projects = data?.body || []

    const queryClient = useQueryClient()

    const selectProject = (project: Project) => (
        () => navigate(`/p/${project.slug}`)
    )

    const { mutate: deletion } = API.projects.remove.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const deleteProject = (id: string) => (() => {
        deletion({ params: { id } , body: {}, headers: { authorization: bearer }})
    })

    if(!projects) return <></>

    const projectList = projects.map(project => {
        const { id, title } = project;
        return (
            <div className="project-row" key={id}>
                <span className="project-title" onClick={selectProject(project)}>{title}</span>
                <span className="project-delete" onClick={deleteProject(id)}>Löschen</span>
            </div>
        )
    })

    return (<>{ projectList }</>)
}

export default ProjectList