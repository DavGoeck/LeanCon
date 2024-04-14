import { useState } from 'react'
import API from '../../api-client'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const ProjectCreator = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutate: creation } = API.projects.create.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })

    const createProject = (title: string) => {
        creation({ body: { title } })
        navigate('/projekte')
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

export default ProjectCreator
