import { useEffect, useState } from 'react'
import Page from './common/Page'
import API from '../api/project'

interface Project {
    id: string,
    title: string
}

const ProjectsPage = () => {
    return <Page content={<Projects/>}/>
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const loadProjects = async () => {
            const loadedProjects = await API.retrieveProjects()
            setProjects(loadedProjects)
        }
        loadProjects()
    }, [])

    const deleteProject = (title: string) => {
        return async () => {
            const currentProjects = await API.deleteProject(title);
            setProjects(currentProjects);
        }
    }

    const createProject = async (title: string) => {
        const currentProjects = await API.createProject(title)
        setProjects(currentProjects)
    }

    return (
        <>
            <h1>Projekte</h1>
            <div>
                <ProjectList projects={projects} onDelete={deleteProject}/>
                <ProjectCreator onCreate={createProject} />
            </div>
        </>
    )
}

interface ProjectListProps {
    projects: Project[],
    onDelete: (id: string) => (() => void)
}

const ProjectList = (props: ProjectListProps) => {

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
    
    const { projects, onDelete } = props;
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
