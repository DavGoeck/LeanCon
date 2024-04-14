import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ProjectsService {
  private projects: Project[] = []

  getAll(title: string): Project[] {
    if(title) return this.projects.filter(project => project.title === 'title')
    return this.projects
  }

  getOne(id: string): Project {
    return this.projects.find(project => project.id === id)
  }

  create(title: string): Project {
    const project = { id: v4(), title }
    this.projects.push(project)
    return project
  }

  update(id, body): Project {
    const index = this.projects.findIndex(project => project.id === id)
    if (index < 0) return null

    this.projects[index] = {
        ...this.projects[index],
        ...body
    }

    return this.projects[index]
  }

  remove(id: string) {
    const index = this.projects.findIndex(project => project.id === id)
    if (index < 0) return null

    this.projects  = this.projects.filter(project => project.id !== id)

    return {}
  }
}
