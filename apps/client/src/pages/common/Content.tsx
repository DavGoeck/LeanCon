import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../../components/navigation/Sidebar.tsx'
import useUser from '../../hooks/useUser'


const Content = () => {
    const { checkLogin } = useUser()

    // Get this in the code somehow
    useEffect(() => {
        checkLogin()
    }, [])

    return <div className="main">
        <Sidebar />
        <div className="content">
            <Outlet />
        </div>
    </div>
}

export default Content
