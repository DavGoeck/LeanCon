import { INestApplication } from '@nestjs/common'
import { baseTestSetup } from './setups'

import { userCredentials, userInfo } from './data'

describe('App e2e', () => {
  let pactum
  let app: INestApplication

  beforeAll(async () => {
    const setup = await baseTestSetup()
    pactum = setup.pactum
    app = setup.app
  })

  afterAll(async () => {
    app.close()
  })

  describe('Auth', () => {

    it('should let user sign up', async () => {
      await pactum.spec()
        .post('auth/signup')
        .withBody(userInfo)
        .expectStatus(201)
    })

    it('should let user sign in', async () => {
      await pactum.spec()
        .post('auth/signin')
        .withBody(userCredentials)
        .expectStatus(200)
    })

    it('should reject user with wrong credentials', async() => {
      await pactum.spec()
        .post('auth/signin')
        .withBody({ username: userInfo.email, password: 'blurb' })
        .expectStatus(401)
    })

  })
})