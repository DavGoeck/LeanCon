import { ReactNode, useState } from 'react'
import ProjectContext from './ProjectContext'
import { Project } from 'api'
import TokenContext from './TokenContext.tsx'
import { CookiesProvider } from 'react-cookie'

type ChildProps = {
    children: ReactNode
}

const AppContext = (props: ChildProps) => {
    const [ token, setToken ] = useState<string | null>(null)
    const [ project, setProject ] = useState<Project | null>(null)

    return <>
        <CookiesProvider>
            <TokenContext.Provider value={{ token, setToken }}>
                <ProjectContext.Provider value={{ project, setProject }}>
                    {props.children}
                </ProjectContext.Provider>
            </TokenContext.Provider>
        </CookiesProvider>
    </>
}

export default AppContext