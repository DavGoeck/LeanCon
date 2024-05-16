import { Controller, UseGuards } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { apiContract } from 'api'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { AuthGuard } from '@nestjs/passport'
import { created, noContent, notFound, ok } from '../utils/http'

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @TsRestHandler(apiContract.projects)
  async handler() {
    return tsRestHandler(apiContract.projects, {
      getAll: async ({ query: { title, slug } }) => {
        const projects = await this.projectsService.getAll(title, slug)
        return ok(projects)
      },
      getOne: async ({ params: { id } }) => {
        const project = await this.projectsService.getOne(id)
        return project ? ok(project) : notFound({ message: 'Project not found.' })
      },
      create: async ({ body: { title } }) => {
        return created(await this.projectsService.create(title))
      },
      update: async ({ params: { id }, body }) => {
        const project = await this.projectsService.update(id, body)
        return project ? ok(project) : notFound({ message: 'Project not found.' })
      },
      start: async ({ params: { id } }) => {
        const project = await this.projectsService.start(id)
        return project ? ok(project) : notFound({ message: 'Project not found.' })
      },
      remove: async ({ params: { id }}) => {
        const project = await this.projectsService.remove(id)
        return project ? noContent() : notFound({ message: 'Project not found!' })
      }
    })
  }
}
