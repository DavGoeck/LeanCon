import { useContext, useEffect, useState } from 'react';
import ProjectContext from '../context/ProjectContext';

function Dashboard() {
    const { project } = useContext(ProjectContext)
    const title = project?.title || 'Kein Projekt ausgewählt'

    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        fetch('/api').then(res => res.text()).then(setGreeting);
    }, []);

    return <>
        <h1>{greeting}</h1>
        <p>Aktuell ausgewähltes Projekt: {title}</p>
    </>
}

export default Dashboard