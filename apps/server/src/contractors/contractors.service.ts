import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid'
import { PersistenceService } from '../persistence/persistence.service';
import { Contractor } from '@prisma/client';

@Injectable()
export class ContractorsService {
    constructor(private prisma: PersistenceService) {}

    async getAll(projectId): Promise<Contractor[]> {
        return await this.prisma.contractor.findMany({ where: { projectId }})
    }

    async create(body): Promise<Contractor> {
        const contractor = { ...body, id: v4() }
        return await this.prisma.contractor.create({ data: contractor })
    }

    async remove(id): Promise<Object> {
        const contractor = this.prisma.contractor.delete({ where: { id }})
        return contractor ? {} : null
    }

}
