import { useEffect, useState } from 'react';
import Page from './common/Page';

const HomePage = () => {
    return (
      <Page content={<Home/>}/>
    )
}
  
function Home() {
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        fetch('/api').then(res => res.text()).then(setGreeting);
    }, []);

    return <h1>{greeting}</h1>
}

export default HomePage