import { useEffect } from 'react'
import useProject from '../../hooks/useProject'
import useNav from '../../hooks/useNav'

import { Outlet, useParams } from 'react-router-dom'

import './Project.css'
import API from '../../api-client'
import useUser from '../../hooks/useUser'

const Project = () => {
    const { getHome } = useNav()
    const { project, setProject } = useProject()
    const { bearer } = useUser()
    const { slug } = useParams()

    useEffect(() => {
        const getProject = async () => {
            if (bearer) {
                if (slug) {
                    const response = await API.projects.getAll.query({ query: { slug }, headers: { authorization: bearer } })
                    const projects = response.body
                    if (projects.length) {
                        const queriedProject = projects[0]
                        setProject(queriedProject)
                    }
                } else {
                    getHome()
                }
            }
        }
        getProject()
    }, [project, slug, bearer])

    if (!project) return <></>
    return (
        <div id="project">
            <div className="project-headline">{ project.title }</div>
            <div className="project-info">
                <Outlet />
            </div>
        </div>
    )
}

export default Project