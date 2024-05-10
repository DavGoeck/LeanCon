import { useNavigate } from 'react-router-dom'
import useProject from './useProject'

const useNav = () => {
    const navigate = useNavigate()
    const { project } = useProject()

    const getHome = () => navigate('/')
    const navInProject = (target: string) => {
        if (project) {
            navigate(`/p/${project.slug}/${target}`)
        } else {
            getHome()
        }
    }

    const toLogin = (from?: string | undefined) => {
        const params = from ? `?from=${encodeURIComponent(from)}` : ''
        const path = `/nutzer/login${params}`
        navigate(path)
    }

    return { navigate, getHome, navInProject, toLogin }
}

export default useNav
