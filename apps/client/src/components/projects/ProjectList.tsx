import { useContext } from 'react'
import API from '../../api-client'
import { useQueryClient } from '@tanstack/react-query'
import ProjectContext from '../../context/ProjectContext'
import { Project } from 'api'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser.ts'

const ProjectList = () => {
    const navigate = useNavigate()
    const { bearer } = useUser()
    const { setProject } = useContext(ProjectContext)

    const { data } = API.projects.getAll.useQuery(['projects'], { headers: { authorization: bearer } })
    const projects = data?.body || []

    const queryClient = useQueryClient() ;

    const selectProject = (project: Project) => {
        return () => {
            setProject(project)
            navigate('/')
        }
    }

    const { mutate: deletion } = API.projects.remove.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const deleteProject = (id: string) => {
        return () => {
            deletion({ params: { id } , body: {}, headers: { authorization: bearer }})
        }
    }

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

    return (
        <div>
            { projectList }
        </div>
    )
}

export default ProjectList