import { ReactNode, useState } from 'react'
import ProjectContext from './ProjectContext'
import { Project } from 'api'
import TokenContext from './TokenContext.tsx'

type ChildProps = {
    children: ReactNode
}

const AppContext = (props: ChildProps) => {
    const [ token, setToken ] = useState<string | null>(null)
    const [ project, setProject ] = useState<Project | null>(null)

    return <>
        <TokenContext.Provider value={{ token, setToken }}>
            <ProjectContext.Provider value={{ project, setProject }}>
                {props.children}
            </ProjectContext.Provider>
        </TokenContext.Provider>
    </>
}

export default AppContext