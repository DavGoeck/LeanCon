import { useSearchParams } from 'react-router-dom'
import API from '../../api-client'
import { useState } from 'react'
import { Contractor } from 'api'
import { IntervalPicker } from '../helpers/Date'
import { germanDate } from '../../utils/date'
import { useQueryClient } from '@tanstack/react-query'

const ContractorSelfservice = () => {
    const [ params ] = useSearchParams()
    const token = params.get('token')

    const { data } = API.contractor.getSelf.useQuery(['contractor', token], { query: { token: (token || "") } })
    const contractor = data?.body || null
    
    if (!contractor || !token) {
        return <p>Zum gegebenen Code konnte kein Gewerk ausgemacht werden!</p>
    }

    return <ContractorForm contractor={contractor} />
}

type ContractorFormProps = {
    contractor: Contractor
}
const ContractorForm = (props: ContractorFormProps) => {
    const { contractor } = props
    const { token } = contractor

    const queryClient = useQueryClient()

    contractor.start = new Date(contractor.start)
    contractor.end = new Date(contractor.end)

    const [ newStart, setNewStart ] = useState<Date>(contractor.start)
    const [ newEnd, setNewEnd ] = useState<Date>(contractor.end)

    const handleIntervalChange = (dates: [Date, Date]) => {
        const [ start, end ] = dates
        setNewStart(start),
        setNewEnd(end)
    }

    const updateInterval = async () => {
        const body = { start: newStart, end: newEnd }
        const response = await API.contractor.updateSelf.mutation({ query: { token }, body })
        if (response.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['contractor', token] })
        }
    }

    const { name, email, start, end } = contractor
    return <div>
        <div> { name } </div>
        <div> { email } </div>
        <div> { germanDate(start) } - { germanDate(end) } </div><br/>
        <IntervalPicker start={newStart} end={newEnd} onChange={handleIntervalChange}/><br/>
        <button onClick={updateInterval}>Zeitraum anpassen</button>
    </div>
}

export default ContractorSelfservice
