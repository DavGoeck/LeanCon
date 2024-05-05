import { Link } from 'react-router-dom'
import ContractorsList from './ContractorList'
import useProject from '../../hooks/useProject'

const Contractors = () => (
    <div id="contractors">
        <ContractorsHeadline />
        <ContractorsList />
    </div>
)

const ContractorsHeadline = () => {
    const { project } = useProject()
    const { slug } = project || {}

    return (
        <div className="headline">
            <h1>Gewerke</h1> <Link to={`/p/${slug}/gewerke/neu`}>Neues Gewerk</Link>
        </div>
    )
}

export default Contractors
