import { useContext, useState } from 'react'
import API from '../../api-client'
import { useQueryClient } from '@tanstack/react-query'
import { redirect, useNavigate } from 'react-router-dom'
import ProjectContext from '../../context/ProjectContext'

const ContractorCreator = () => {
    const { project } = useContext(ProjectContext)
    const navigate = useNavigate()

    if(!project) {
        redirect('/')
        return <></>
    }
    const queryClient = useQueryClient()

    const { mutate: creation } = API.contractors.create.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contractors', project.id] })
        }
    })

    const createContractor = (name: string) => {
        creation({ body: { name, projectId: project.id } })
        navigate('/gewerke')
    }

    const [name, setName] = useState('')

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = 
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            createContractor(name)
            setName('')
        }

    return (
        <div>
            <h2>Neues Gewerk</h2>
            <form onSubmit={onSubmit}>
                <input name="title" value={name} onChange={handleNameChange}/>
                <button>Erstellen</button>
            </form>
        </div>
    )
}

export default ContractorCreator
