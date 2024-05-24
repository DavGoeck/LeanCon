import {useContext} from "react";
import ProjectContext from "../context/ProjectContext.tsx";

const useCurrentProject = () => {
    const { project, setProject } = useContext(ProjectContext)
    if (!project) throw new Error('Expected to have project!')
    return { project, setProject }
}

export default useCurrentProject