const API = {
    retrieveProjects: async () => {
        return await fetch('/api/projects').then(res => res.json())
    },
    createProject: async (title: string) => {
        return await fetch('/api/project', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        }).then(res => res.json())
    },
    deleteProject: async (id: string) => {
        return await fetch('/api/project', {
            method: 'delete',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(res => res.json())
    }
}

export default API