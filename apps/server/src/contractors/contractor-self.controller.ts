import { Controller } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from 'api';
import { notFound, ok } from '../utils/http';

@Controller()
export class ContractorSelfserviceController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @TsRestHandler(apiContract.contractor)
  async handler() {
    return tsRestHandler(apiContract.contractor, {
      getSelf: async ({ query: { token }}) => {
        const contractor = await this.contractorsService.getByToken(token)
        return contractor ? ok(contractor) : notFound({ message: 'Contractor not found' })
      },
      updateSelf: async ({ query: { token }, body }) => {
        const contractor = await this.contractorsService.updateByToken(token, body)
        return contractor ? ok(contractor) : notFound({ message: 'Contractor not found' })
      }
    })
  }
}
