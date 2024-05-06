import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PersistenceService } from '../persistence/persistence.service'

import { Project } from '@prisma/client'
import { toSlug } from '../utils/strings'

@Injectable()
export class ProjectsService {
  constructor(private prisma: PersistenceService) { }

  async getAll(title: string, slug: string): Promise<Project[]> {
    const filter: any = {}
    if (title) filter.title = title
    if (slug) filter.slug = slug
    return await this.prisma.project.findMany({ where: filter })
  }

  async getOne(id: string): Promise<Project> {
    return await this.prisma.project.findUnique({ where: { id } })
  }

  async getBySlug(slug: string): Promise<Project> {
    return await this.prisma.project.findFirst({ where: { slug }})
  }

  async create(title: string): Promise<Project> {
    const project = { id: v4(), title, slug: toSlug(title) }
    return await this.prisma.project.create({ data: project })
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
