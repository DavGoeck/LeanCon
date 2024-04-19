import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PersistenceService } from '../persistence/persistence.service.js'

import { Project } from '@prisma/client'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PersistenceService) { }
  private projects: Project[] = []

  async getAll(title: string): Promise<Project[]> {
    const allProjects = await this.prisma.project.findMany({})
    if(title) return allProjects.filter(project => project.title === 'title')
    return allProjects
  }

  async getOne(id: string): Promise<Project> {
    return await this.prisma.project.findUnique({ where: { id } })
  }

  async create(title: string): Promise<Project> {
    const project = { id: v4(), title }
    const savedProject = await this.prisma.project.create({ data: project })
    return savedProject
  }

  async update(id, body): Promise<Project> {
    try {
      return await this.prisma.project.update({ where: { id }, data: body })
    } catch (e) {
      return null
    }
  }

  async remove(id: string) {
    const project = await this.prisma.project.delete({ where: { id }})
    return project ? {} : null
  }
}
