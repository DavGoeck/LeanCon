import { useEffect } from 'react'
import useProject from '../../hooks/useProject'
import useNav from '../../hooks/useNav'

import { Outlet } from 'react-router-dom'

import './Project.css'

const Project = () => {
    const { getHome } = useNav()
    const { project } = useProject()
    
    useEffect(() => {
        if(!project) getHome()
    }, [project])

    if (project) {
        return (
            <div id="project">
                <div className="project-headline">{ project.title }</div>
                <div className="project-info">
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default Project