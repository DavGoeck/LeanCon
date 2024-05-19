import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsController } from './contractors.controller';
import { ContractorSelfserviceController } from './contractor-self.controller';

@Module({
  controllers: [ContractorsController, ContractorSelfserviceController],
  providers: [ContractorsService],
})
export class ContractorsModule {}
