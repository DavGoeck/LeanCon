import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';



@Injectable()
export class AppService {

  projects: Project[] = []

  getHello(): string {
    return 'Hallo LeanCon!'
  }

  retrieveProjects(): Project[] {
    return this.projects
  }

  createProject(title: string): Project[] {
    const project = { id: v4(), title }
    this.projects.push(project)
    return this.projects
  }

  deleteProject(id: string): Project[] {
    this.projects = this.projects
      .filter(project => project.id !== id)
    return this.projects
  }
}
