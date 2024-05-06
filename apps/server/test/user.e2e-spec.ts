import { INestApplication } from '@nestjs/common'
import { baseTestSetup } from './setups'

import { randomUserInfo, userCredentials, userInfo } from './data'

describe('App e2e', () => {
  let pactum
  let app: INestApplication

  let userInfo: any
  let token: string

  beforeAll(async () => {
    const setup = await baseTestSetup()
    pactum = setup.pactum
    app = setup.app

    userInfo = randomUserInfo()
    await pactum.spec()
        .post('auth/signup')
        .withBody(userInfo)
        .expectStatus(201)

    const userCredentials = {
        username: userInfo.email,
        password: userInfo.password
    }
    
    token = await pactum.spec()
        .post('auth/signin')
        .withBody(userCredentials)
        .expectStatus(200)
        .returns('access-token')
  })

  afterAll(async () => {
    app.close()
  })

  describe('User', () => {

    it('should inform signed in user', async () => {
        const { password, match, ...rest } = userInfo
        await pactum.spec()
            .get('user/me')
            .withHeaders({ authorization: `Bearer ${token}` })
            .expectStatus(200)
            .expectJsonLike(rest)
    })

    it('should reject anonymous user', async () => {
        await pactum.spec()
            .get('user/me')
            .expectStatus(401)
    })

  })
})
