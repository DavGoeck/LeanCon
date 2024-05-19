import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid'
import { PersistenceService } from '../persistence/persistence.service';
import { Contractor } from '@prisma/client';
import { generateToken } from '../utils/random';

@Injectable()
export class ContractorsService {
    constructor(private prisma: PersistenceService) {}

    async getAll(projectId): Promise<Contractor[]> {
        const contractors = await this.prisma.contractor.findMany({ where: { projectId }})
        return contractors.map(contractor => { if (contractor.email === null) { delete contractor.email }; return contractor })
    }

    async create(body): Promise<Contractor> {
        const contractorInfo = { ...body, id: v4(), token: generateToken(10) }
        const contractor = await this.prisma.contractor.create({ data: contractorInfo })
        if (contractor.email === null) delete contractor.email
        return contractor
    }

    async remove(id): Promise<Object> {
        return await this.prisma.contractor.delete({ where: { id }})
    }

    async getByToken(token): Promise<Contractor> {
        const contractor = await this.prisma.contractor.findFirst({ where: { token } })
        return contractor
    }

    async updateByToken(token, body): Promise<Contractor> {
        const contractor = await this.prisma.contractor.update({ where: { token }, data: body })
        return contractor
    }

}
