import { Injectable } from '@nestjs/common'
import { PersistenceService } from '../persistence/persistence.service.js'

@Injectable()
export class UserService {
    constructor(private prisma: PersistenceService) {}

    async register(user) {
        return await this.prisma.user.create({ data: user })
    }

    async findOne(username: string) {
        return await this.prisma.user.findFirst({ where: { email: username }})
    }
}
