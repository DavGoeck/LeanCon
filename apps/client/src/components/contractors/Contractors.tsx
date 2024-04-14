import { Link } from 'react-router-dom'
import ContractorsList from './ContractorList'

const Contractors = () => (
    <div id="contractors">
        <ContractorsHeadline />
        <ContractorsList />
    </div>
)

const ContractorsHeadline = () => {
    return (
        <div className="headline">
            <h1>Gewerke</h1> <Link to="/gewerke/neu">Neues Gewerk</Link>
        </div>
    )
}

export default Contractors
