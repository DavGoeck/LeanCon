import { Link } from 'react-router-dom'
import ContractorsList from './ContractorList'
import useCurrentProject from "../../hooks/useCurrentProject.ts";

const Contractors = () => (
    <div id="contractors">
        <ContractorsHeadline />
        <ContractorsList />
    </div>
)

const ContractorsHeadline = () => {
    const { project: { slug } } = useCurrentProject()
    return (
        <div className="headline">
            <h1>Gewerke</h1> <Link to={`/p/${slug}/gewerke/neu`}>Neues Gewerk</Link>
        </div>
    )
}

export default Contractors
