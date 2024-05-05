import { useContext } from 'react'
import ProjectContext from '../context/ProjectContext'

const useProject = () => useContext(ProjectContext)

export default useProject