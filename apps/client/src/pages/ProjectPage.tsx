import { useState } from 'react'
import Page from './common/Page'
import API from '../api-client'
//import { useQueryClient } from '@tanstack/react-query'

const ProjectsPage = () => {
    return <Page content={<Projects/>}/>
}

type Project = {
    id: string,
    title: string
}

const Projects = () => {
    //const queryClient = useQueryClient();
    
    /*const { data } = API.projects.getAll.useQuery(['projects'])
    const projects: Project[] = data?.body || []

    const { mutate: deletion } = API.projects.remove.useMutation({
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const { mutate: creation } = API.projects.create.useMutation({
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })*/

    const deleteProject = (id: string) => {
        return () => {
            //deletion({ params: { id } , body: {}})
        }
    }

    const createProject = (title: string) => {
        //creation({ body: { title } })
    }

    return (
        <div>
            <h1>Projekte</h1>
            <ProjectList projects={[]} onDelete={deleteProject}/>
            <ProjectCreator onCreate={createProject} />
        </div>
    )
}

interface ProjectListProps {
    projects: {id: string, title: string}[] | undefined,
    onDelete: (id: string) => (() => void)
}

const ProjectList = (props: ProjectListProps) => {
    const { projects, onDelete } = props;

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

    if(!projects) return <></>

    const projectList = projects.map(project => {
        const { id, title } = project;
        return (
            <div style={projectRowStyle} key={id}>
                <span style={projectStyle}>{title}</span>
                <span style={deleteButtonStyle} onClick={onDelete(id)}>Löschen</span>
            </div>
        )
    })

    return (
        <div>
            { projectList }
        </div>
    )
}

interface ProjectCreatorProps {
    onCreate: (title: string) => void
}

const ProjectCreator = (props: ProjectCreatorProps) => {
    const [title, setTitle] = useState('')

    const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = 
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            props.onCreate(title)
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
