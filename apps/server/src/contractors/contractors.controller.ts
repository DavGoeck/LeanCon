import { Controller } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from 'api';

@Controller()
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @TsRestHandler(apiContract.contractors)
  async handler() {
    return tsRestHandler(apiContract.contractors, {
      getAll: async ({ query: { projectId } }) => {
        return {
          status: 200,
          body: await this.contractorsService.getAll(projectId)
        }
      },
      create: async ({ body }) => {
        return {
          status: 201,
          body: await this.contractorsService.create(body)
        }
      },
      remove: async ({ params: { id }}) => {
        const contractor = await this.contractorsService.remove(id)
        if(!contractor) {
          return {
            status: 404,
            body: {
              message: 'Item not found!'
            }
          }
        }

        return {
          status: 204,
          body: contractor
        }
      }
    })
  }
}
