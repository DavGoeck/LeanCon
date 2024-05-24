import { useContext } from 'react'
import ProjectContext from '../../context/ProjectContext'
import API from '../../api-client'
import { Contractor } from 'api'

import './Contractors.css'
import { useQueryClient } from '@tanstack/react-query'
import useUser from '../../hooks/useUser'
import { germanDate } from '../../utils/date'
import useNav from "../../hooks/useNav.ts";
import Icon from "../helpers/Icon.tsx";

const ContractorsList = () => {
    const { project } = useContext(ProjectContext)
    const queryClient = useQueryClient()
    const { bearer } = useUser()
    const { navInProject } = useNav()

    if(!project) return <p>Kein Projekt ausgewählt</p>

    const { data } = API.contractors.getAll.useQuery(['contractors', project.id], {
        query: { projectId: project.id },
        headers: { authorization: bearer }
    })

    const { mutate: deletion } = API.contractors.remove.useMutation({
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contractors', project.id] })
    })

    const deleteContractor = (id: string) => (
        () => deletion({ params: { id }, body: {}, headers: { authorization: bearer }})
    )

    const editContractor = (id: string) => (
        () => navInProject(`gewerke/edit/${id}`)
    )

    const contractors: Contractor[] = data?.body || []
    
    if(!contractors?.length) return <p>Noch keine Gewerke</p>

    const contractorsList = contractors
        .sort((a, b) => ((a.start < b.start) ? -1 : 0))
        .map(contractor => {
            const { id, name, email, start, end } = contractor
            return (
                <tr className="contractor-row" key={id}>
                    <td className="contractor-name">{name}</td>
                    <td className="contractor-email">{email}</td>
                    <td>{germanDate(start)}</td>
                    <td>{germanDate(end)}</td>
                    <td className="contractor-edit" onClick={editContractor(id)}><Icon name={'edit'}/></td>
                    <td className="contractor-delete" onClick={deleteContractor(id)}><Icon name={'trash'}/></td>
                </tr>
            )
        })

    return (
        <table>
            <thead>
            <tr className="contractor-row">
            <th>Name</th>
                    <th>Email</th>
                    <th>Beginn</th>
                    <th>Ende</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { contractorsList }
            </tbody>
        </table>
    )
}

export default ContractorsList
