import { ReactNode, useState } from 'react'
import ProjectContext from './ProjectContext'
import { Project } from 'api'

type ChildProps = {
    children: ReactNode
}

const AppContext = (props: ChildProps) => {
    const [ project, setProject ] = useState<Project | null>(null)

    return <>
        <ProjectContext.Provider value={{ project, setProject }}>
            {props.children}
        </ProjectContext.Provider>
    </>
}

export default AppContext