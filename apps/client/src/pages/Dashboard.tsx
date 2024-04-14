import { useEffect, useState } from 'react';

function Dashboard() {
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        fetch('/api').then(res => res.text()).then(setGreeting);
    }, []);

    return <h1>{greeting}</h1>
}

export default Dashboard