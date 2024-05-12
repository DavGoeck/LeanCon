import { useContext, useState } from 'react'
import API from '../../api-client'
import { redirect } from 'react-router-dom'
import ProjectContext from '../../context/ProjectContext'
import { currentDate, IntervalPicker } from '../helpers/Date'
import useUser from '../../hooks/useUser'
import useNav from '../../hooks/useNav'
import { ContractorCreation } from 'api'
import { httpHandler } from '../../utils/http'

const ContractorCreator = () => {
    const { project } = useContext(ProjectContext)
    const { navInProject } = useNav()
    const { bearer } = useUser()

    if(!project) {
        redirect('/')
        return <></>
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ emailError, setEmailError ] = useState(false)

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        if(emailError) setEmailError(false)
    }

    const date = currentDate()
    const [startDate, setStartDate] = useState<Date|null>(date)
    const [endDate, setEndDate] = useState<Date|null>(date)

    const handleIntervalChange = (dates: [Date | null, Date | null]) => {
        const [ start, end ] = dates
        setStartDate(start),
        setEndDate(end)
    }

    const createContractor = async () => {
        if ( !startDate || !endDate ) return
        const body: ContractorCreation = { name, email, projectId: project.id, start: startDate, end: endDate }
        const response = await API.contractors.create.mutation({
            body,
            headers: { authorization: bearer }
        })
        httpHandler(response, {
            201: () => navInProject('gewerke'),
            400: () => { setEmailError(true) },
            default: (r) => { console.log(r) }
        })
    }

    const submit = async (e: React.MouseEvent) => {
        e.preventDefault()
        createContractor()
    }

    return (
        <div>
            <h2>Neues Gewerk</h2>
            <div>
                <label htmlFor='nameInput'>Name</label><br/>
                <input id='nameInput' value={name} onChange={handleNameChange}/><br/><br/>
                <label htmlFor='emailInput'>Email</label><br/>
                <input id='emailInput' value={email} onChange={handleEmailChange}/>
                { emailError && <><br/><span className='input-error'>Fehler in Email</span></> }
                <br/><br/>

                <IntervalPicker start={startDate} end={endDate} onChange={handleIntervalChange}/><br/><br/>
                <button onClick={submit}>Erstellen</button>
            </div>
        </div>
    )
}

export default ContractorCreator
