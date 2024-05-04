import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { PersistenceService } from '../src/persistence/persistence.service'
import * as pactum from 'pactum';
import { AuthService } from '../src/auth/auth.service';
import { userCredentials, userInfo } from './data';

export const baseTestSetup = async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule]
    }).compile()
    const app = moduleRef.createNestApplication()
    await app.init()
    await app.listen(3333)

    const prisma = app.get(PersistenceService)
    await prisma.cleanDb()

    pactum.request.setBaseUrl('http://localhost:3333/api/')

    return { pactum, app, prisma }
}

export const loggedInUserSetup = async () => {
    const { pactum, app, prisma } = await baseTestSetup()

    const authService = await app.resolve(AuthService)
    await authService.signUp(userInfo)
    const { 'access-token': token } = await authService.signIn(userCredentials)
    pactum.request.setDefaultHeaders('Authorization', `Bearer ${token}`)

    return { pactum, app, prisma }
}
