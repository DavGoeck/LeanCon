import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Sidebar from '../../components/navigation/Sidebar.tsx'

import useUser from '../../hooks/useUser.ts'

const Content = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(!user) navigate(`/nutzer/login?from=${encodeURIComponent(location.pathname)}`) 
    }, [user])

    return <div className="main">
        <Sidebar />
        <div className="content">
            <Outlet />
        </div>
    </div>
}

export default Content
