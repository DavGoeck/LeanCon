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

    return { getHome, navInProject }
}

export default useNav