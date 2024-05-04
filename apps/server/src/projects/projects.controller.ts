import { Controller, UseGuards } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { apiContract } from 'api'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'
import { AuthGuard } from '@nestjs/passport'

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @TsRestHandler(apiContract.projects)
  async handler() {
    return tsRestHandler(apiContract.projects, {
      getAll: async ({ query: { title } }) => {
        return {
          status: 200,
          body: await this.projectsService.getAll(title)
        }
      },
      getOne: async ({ params: { id } }) => {
        const project = await this.projectsService.getOne(id)

        if(!project) {
          return {
            status: 404,
            body: {
              message: 'Item not found.'
            }
          }
        }

        return {
          status: 200,
          body: project
        }
      },
      create: async ({ body: { title } }) => {
        return {
          status: 201, 
          body: await this.projectsService.create(title)
        }
      },
      update: async ({ params: { id }, body }) => {
        const project = await this.projectsService.update(id, body)

        if(!project) {
          return {
            status: 404,
            body: {
              message: 'Project not found.'
            }
          }
        }

        return {
          status: 200,
          body: project
        }
      },
      remove: async ({ params: { id }}) => {
        const project = await this.projectsService.remove(id)

        if(!project) {
          return {
            status: 404,
            body: {
              message: 'Item not found!'
            }
          }
        }

        return {
          status: 204,
          body: {}
        }
      }
    })
  }
}
