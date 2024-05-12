import { useContext } from 'react'
import ProjectContext from '../context/ProjectContext'
import API from '../api-client'
import { Contractor } from 'api'
import { datediff } from '../components/helpers/Date'
import useUser from '../hooks/useUser'
import { germanDate } from '../utils/date'

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
    
    const contractorNames = contractors.map((contractor, index) => {
        const row = index + 1
        return <div key={contractor.id} style={{ 
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: row,
            gridRowEnd: row+1,
            marginBottom: 8 
        }}>
            {contractor.name}
        </div>
    })
    const contractorIntervals = contractors.map(contractor => {
        const { id, start, end } = contractor
        const offset = datediff(new Date(), start);
        const length = datediff(start, end);


        return <div style={{ flexGrow: 1, overflowX: 'visible' }}>
            <div 
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
                }}
            >
                { germanDate(start) } - { germanDate(end) }
            </div>
        </div>
    })

    return <>
        <h1>Zeitplan</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
            { contractorNames }
            { contractorIntervals }
        </div>
    </>
}

export default Timeline
