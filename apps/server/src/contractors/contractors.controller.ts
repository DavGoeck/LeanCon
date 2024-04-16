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
          body: this.contractorsService.getAll(projectId)
        }
      },
      create: async ({ body }) => {
        return {
          status: 201,
          body: this.contractorsService.create(body)
        }
      },
      remove: async ({ params: { id } }) => {
        return {
          status: 204,
          body: this.contractorsService.remove(id)
        }
      }
    })
  }
}
