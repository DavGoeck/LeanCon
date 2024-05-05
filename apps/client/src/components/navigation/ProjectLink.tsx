import { NavLink } from 'react-router-dom'
import useProject from '../../hooks/useProject'

type Props = {
    to: string,
    children: any
}

const ProjectLink = (props: Props) => {
    const { to, children } = props

    const { project } = useProject()
    if(!project) return <></>
    return <NavLink to={`/p/${project.slug}/${to}`}>{ children }</NavLink>
}

export default ProjectLink