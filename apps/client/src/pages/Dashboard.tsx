import ProjectList from '../components/projects/ProjectList';
import { Link } from 'react-router-dom';
function Dashboard() {
    return <>
        <div className="headline">
            <h1>LeanCon Dashboard</h1>
            <Link to={`/p/neu`}>Neues Projekt</Link>
        </div>
        <ProjectList />
    </>
}

export default Dashboard
