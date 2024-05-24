import { Controller, UseGuards } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from 'api';
import { AuthGuard } from '@nestjs/passport';
import { created, noContent, notFound, ok } from '../utils/http';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @TsRestHandler(apiContract.contractors)
  async handler() {
    return tsRestHandler(apiContract.contractors, {
      getAll: async ({ query: { projectId } }) => {
        const contractors = await this.contractorsService.getAll(projectId)
        return ok(contractors)
      },
      getOne: async ({ params: { id} }) => {
        const contractor = await this.contractorsService.getOne(id)
        return contractor ? ok(contractor) : notFound({ message: 'Contractor not found' })
      },
      update: async ({ params: { id }, body }) => {
        const contractor = await this.contractorsService.updateById(id, body)
        return contractor ? ok(contractor) : notFound({ message: 'Contractor not found' })
      },
      create: async ({ body }) => {
        const contractor = await this.contractorsService.create(body)
        return created(contractor)
      },
      remove: async ({ params: { id }}) => {
        const contractor = await this.contractorsService.remove(id)
        return contractor ? noContent() : notFound({ message: 'Contractor not found!' })
      }
    })
  }
}
