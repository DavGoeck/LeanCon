import { Project } from 'api-contract'
import { createContext } from 'react'

type ProjectUpdater = {
    project: Project | null,
    setProject: (project: Project) => void
}

const defaultValue = { project: null, setProject: () => {} }
const ProjectContext = createContext<ProjectUpdater>(defaultValue)

export default ProjectContext