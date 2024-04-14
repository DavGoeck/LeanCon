import { useState } from 'react'
import Page from './common/Page'
import API from '../api-client'
import { useQueryClient } from '@tanstack/react-query'

const ProjectsPage = () => {
    return <Page content={<Projects/>}/>
}

const projectRowStyle = {
    marginBottom: 8
}

const projectStyle = {
    fontWeight: 'bold',
    marginRight: 12
}

const deleteButtonStyle = {
    backgroundColor: 'orange',
    padding: 4,
    borderRadius: 2,
    cursor: 'pointer'
}

type Project = {
    id: string,
    title: string
}

const Projects = () => {

    return (
        <div>
            <h1>Projekte</h1>
            <ProjectList />
            <ProjectCreator />
        </div>
    )
}

const ProjectList = () => {

    const { data } = API.projects.getAll.useQuery(['projects'])
    const projects: Project[] = data?.body || []

    const queryClient = useQueryClient();

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
            <div style={projectRowStyle} key={id}>
                <span style={projectStyle}>{title}</span>
                <span style={deleteButtonStyle} onClick={deleteProject(id)}>Löschen</span>
            </div>
        )
    })

    return (
        <div>
            { projectList }
        </div>
    )
}

const ProjectCreator = () => {
    const queryClient = useQueryClient();

    const { mutate: creation } = API.projects.create.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const createProject = (title: string) => {
        creation({ body: { title } })
    }

    const [title, setTitle] = useState('')

    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = 
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            createProject(title)
            setTitle('')
        }

    return (
        <div>
            <h2>Neues Projekt</h2>
            <form onSubmit={onSubmit}>
                <input name="title" value={title} onChange={handleTitleChange}/>
                <button>Erstellen</button>
            </form>
        </div>
    )
}

export default ProjectsPage
