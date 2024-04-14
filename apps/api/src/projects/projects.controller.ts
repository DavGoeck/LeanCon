import { Controller } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { apiContract } from 'api-contract'
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest'

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @TsRestHandler(apiContract.projects)
  async handler() {
    return tsRestHandler(apiContract.projects, {
      getAll: async ({ query: { title }}) => {
        return {
          status: 200,
          body: this.projectsService.getAll(title)
        }
      },
      getOne: async ({ params: { id } }) => {
        const item = this.projectsService.getOne(id)

        if(!item) {
          return {
            status: 404,
            body: {
              message: 'Item not found.'
            }
          }
        }

        return {
          status: 200,
          body: item
        }
      },
      create: async ({ body: { title } }) => {
        return {
          status: 201, 
          body: this.projectsService.create(title)
        }
      },
      update: async ({ params: { id }, body }) => {
        const item = this.projectsService.update(id, body)

        if(!item) {
          return {
            status: 404,
            body: {
              message: 'Item not found.'
            }
          }
        }

        return {
          status: 200,
          body: item
        }
      },
      remove: async ({ params: { id }}) => {
        const item = this.projectsService.remove(id)

        if(!item) {
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
