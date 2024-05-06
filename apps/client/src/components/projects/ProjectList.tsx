import useProject from '../../hooks/useProject'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser.ts'

import { Project } from 'api'
import API from '../../api-client'

import './Projects.css'

const ProjectList = () => {
    const navigate = useNavigate()
    const { bearer } = useUser()
    const { setProject } = useProject()

    const { data } = API.projects.getAll.useQuery(['projects'], { headers: { authorization: bearer } })
    const projects = data?.body || []

    const queryClient = useQueryClient() ;

    const selectProject = (project: Project) => {
        return () => {
            setProject(project)
            navigate(`/p/${project.slug}`)
        }
    }

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