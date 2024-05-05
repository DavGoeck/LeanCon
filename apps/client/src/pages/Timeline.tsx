import { useContext } from 'react'
import ProjectContext from '../context/ProjectContext'
import API from '../api-client'
import { Contractor } from 'api'
import { datediff } from '../utils/Date'
import useUser from '../hooks/useUser'

const blockWidth = 48

const Timeline = () => {
    const { project } = useContext(ProjectContext)
    const { bearer } = useUser()

    if(!project) return <p>Kein Projekt ausgewählt</p>

    const { data } = API.contractors.getAll.useQuery(['contractors', project.id], {
        query: { projectId: project.id },
        headers: { authorization: bearer }
    })

    const contractors: Contractor[] = data?.body || []

    contractors.sort((a, b) => a.start >= b.start ? 1 : -1)
    
    const contractorNames = contractors.map(contractor => <div key={contractor.id} style={{ marginBottom: 8 }}>{contractor.name}</div>)
    const contractorIntervals = contractors.map(contractor => {
        const { id, start, end } = contractor
        const offset = datediff(new Date(), start);
        const length = datediff(start, end);

        return <div 
            key={ id }
            style={{ 
                position: 'relative',
                left: offset * blockWidth,
                width: length * blockWidth,
                backgroundColor: 'orange',
                textWrap: 'nowrap',
                overflowX: 'hidden',
                marginBottom: 8,
                paddingInline: 8,
                borderRadius: 2
            }}>
                { start.toDateString() } - { end.toDateString() }
            </div>
    })

    return <>
        <h1>Zeitplan</h1>
        <div className='timetable'>
            <div>Name</div>
            <div className='table' style={{ display: 'flex' }}>
                <div>{ contractorNames }</div>
                <div style={{ flexGrow: 1, overflowX: 'scroll' }}>{ contractorIntervals }</div>
            </div>
        </div>
    </>
}

export default Timeline
