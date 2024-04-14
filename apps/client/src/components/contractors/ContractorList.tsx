import { useContext } from 'react'
import ProjectContext from '../../context/ProjectContext'
import API from '../../api-client'
import { Contractors } from 'api-contract'

import './Contractors.css'
import { useQueryClient } from '@tanstack/react-query'

const ContractorsList = () => {
    const { project } = useContext(ProjectContext)
    const queryClient = useQueryClient()

    if(!project) return <p>Kein Projekt ausgewählt</p>

    const { data } = API.contractors.getAll.useQuery(['contractors', project.id], {
        query: { projectId: project.id }
    })

    const { mutate: deletion } = API.contractors.remove.useMutation({
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contractors', project.id] })
    })

    const deleteContractor = (id: string) => (
        () => deletion({ params: { id }, body: {}})
    )

    const contractors: Contractors[] = data?.body || []

    if(!contractors?.length) return <p>Noch keine Gewerke</p>

    const contractorsList = contractors.map(contractor => {

        const { id, name } = contractor;
        return (
            <div className="contractor-row" key={id}>
                <span className="contractor-name">{name}</span>
                <span className="contractor-delete" onClick={deleteContractor(id)}>Löschen</span>
            </div>
        )
    })

    return (
        <div>
            { contractorsList }
        </div>
    )
}

export default ContractorsList