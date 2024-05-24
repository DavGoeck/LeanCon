import { useState } from 'react'
import API from '../../api-client'
import useUser from '../../hooks/useUser'
import useNav from '../../hooks/useNav'
import useCurrentProject from "../../hooks/useCurrentProject.ts";

const ProjectModifier = () => {
    const { project } = useCurrentProject()
    const { navigate } = useNav()
    const { bearer } = useUser()

    const [ title, setTitle ] = useState(project.title)

    const handleChange = (setter: (event: string) => void) => (
        (e: React.FormEvent<HTMLInputElement>) => { setter(e.currentTarget.value) }
    )

    const handleTitleChange = handleChange(setTitle)

    const updateProject = async (title: string) => {
        const response = await API.projects.update.mutation({
            params: { id: project.id },
            body: { title },
            headers: { authorization: bearer }
        })

        if (response.status === 200) {
            const updatedProject = response.body
            navigate(`/p/${updatedProject.slug}`)
        } else {
            navigate(`/p/${project.id}`)
        }
    }

    const submit: React.MouseEventHandler<HTMLButtonElement> = 
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            updateProject(title)
        }

    return <>
        <h1>Projekt bearbeiten</h1>
        <div>
            <label>Projekttitel</label><br/>
            <input value={title} onChange={handleTitleChange} />
            <button onClick={submit}>Speichern</button>
        </div>
    </>
}

export default ProjectModifier