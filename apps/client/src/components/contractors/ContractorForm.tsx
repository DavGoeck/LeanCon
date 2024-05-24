import {useContext, useEffect, useState} from "react";
import ProjectContext from "../../context/ProjectContext.tsx";
import useNav from "../../hooks/useNav.ts";
import useUser from "../../hooks/useUser.ts";
import {redirect} from "react-router-dom";
import { IntervalPicker } from "../helpers/Date.tsx";
import {Contractor, ContractorCreation, ContractorUpdate} from "api";
import API from "../../api-client.ts";
import { httpHandler } from "../../utils/http.ts";

type Props = {
    contractor?: Contractor
}

const ContractorForm = (props: Props) => {
    const { contractor } = props

    const { project } = useContext(ProjectContext)
    const { navInProject } = useNav()
    const { bearer } = useUser()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const date = new Date()
    const [startDate, setStartDate] = useState<Date>(date)
    const [endDate, setEndDate] = useState<Date>(date)

    const [ emailError, setEmailError ] = useState(false)

    useEffect(() => {
        if (contractor) {
            const { name, email, start, end } = contractor
            setName(name)
            setEmail(email)
            setStartDate(start)
            setEndDate(end)
        }
    }, [contractor]);


    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        if(emailError) setEmailError(false)
    }

    const handleIntervalChange = (dates: [Date, Date]) => {
        const [ start, end ] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const updateContractor = async (contractor: Contractor) => {
        if ( !startDate || !endDate ) return
        const body: ContractorUpdate = { name, email, start: startDate, end: endDate }
        const response = await API.contractors.update.mutation({
            params: { id: contractor.id },
            body,
            headers: { authorization: bearer }
        })
        httpHandler(response, {
            200: () => navInProject('gewerke'),
            default: (r) => { console.log(r) }
        })
    }

    const createContractor = async () => {
        if ( !startDate || !endDate ) return
        const body: ContractorCreation = { name, email, projectId: project?.id || '', start: startDate, end: endDate }
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
        if (contractor) {
            updateContractor(contractor)
        } else {
            createContractor()
        }
    }


    if(!project) {
        redirect('/')
        return <></>
    }

    return (
        <div>
            <h2>{ contractor ? 'Gewerk bearbeiten' : 'Neues Gewerk' }</h2>
            <div>
                <label htmlFor='nameInput'>Name</label><br/>
                <input id='nameInput' value={name} onChange={handleNameChange}/><br/><br/>
                <label htmlFor='emailInput'>Email</label><br/>
                <input id='emailInput' value={email} onChange={handleEmailChange}/>
                { emailError && <><br/><span className='input-error'>Fehler in Email</span></> }
                <br/><br/>

                <IntervalPicker start={startDate} end={endDate} onChange={handleIntervalChange}/><br/><br/>
                <button onClick={submit}>{ contractor ? 'Speichern' : 'Erstellen' }</button>
            </div>
        </div>
    )
}

export default ContractorForm