import { INestApplication } from '@nestjs/common'
import { loggedInUserSetup } from './setups'
import { contractorData } from './data'

describe('App e2e', () => {
  let pactum
  let app: INestApplication

  let projectId: string

  beforeAll(async () => {
    const setup = await loggedInUserSetup()
    pactum = setup.pactum
    app = setup.app

    projectId = await pactum.spec()
        .post('projects')
        .withBody({ title: 'TestProjekt' })
        .expectStatus(201).returns('id')
  })

  afterAll(async () => {
    app.close()
  })

  describe('Contractors', () => {

    let contractorId: string

    it('should create contractor', async () => {

        const contractor = contractorData(projectId)

        contractorId = await pactum.spec()
            .post('contractors')
            .withBody(contractor)
            .expectStatus(201)
            .returns('id')
    })

    it('should get contractor', async () => {

        await pactum.spec().get('contractors')
            .withQueryParams({ projectId })
            .expectStatus(200)
            .expectJsonLength(1)
    })

    it('should not get contractor in different project', async () => {

        await pactum.spec().get('contractors')
            .withQueryParams({ projectId: 'falscheId' })
            .expectStatus(200)
            .expectJsonLength(0)
    })

    it('should delete contractor', async () => {
        await pactum.spec()
            .delete(`contractors/${contractorId}`)
            .expectStatus(204)

        await pactum.spec()
            .get('contractors')
            .withQueryParams({ projectId })
            .expectStatus(200)
            .expectJson([])
    })
  })
})