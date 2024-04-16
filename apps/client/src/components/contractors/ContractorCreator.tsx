import { useContext, useState } from 'react'
import API from '../../api-client'
import { useQueryClient } from '@tanstack/react-query'
import { redirect, useNavigate } from 'react-router-dom'
import ProjectContext from '../../context/ProjectContext'
import { currentDate, IntervalPicker } from '../../utils/Date'

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

    const [name, setName] = useState('')

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const date = currentDate()
    const [startDate, setStartDate] = useState<Date|null>(date)
    const [endDate, setEndDate] = useState<Date|null>(date)

    const handleIntervalChange = (dates: [Date | null, Date | null]) => {
        const [ start, end ] = dates
        setStartDate(start),
        setEndDate(end)
    }

    const createContractor = () => {
        if ( !startDate || !endDate ) return
        creation({ body: { name, projectId: project.id, start: startDate, end: endDate } })
        navigate('/gewerke')
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = 
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            createContractor()
            setName('')
        }

    return (
        <div>
            <h2>Neues Gewerk</h2>
            <form onSubmit={onSubmit}>
                <input name='title' value={name} onChange={handleNameChange}/><br/>
                <IntervalPicker start={startDate} end={endDate} onChange={handleIntervalChange}/><br/>
                <button>Erstellen</button>
            </form>
        </div>
    )
}

export default ContractorCreator
