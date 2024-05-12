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

    let contractorIds: string[] = []

    it('should create contractor', async () => {

      const contractor = contractorData(projectId)

      const contractorId = await pactum.spec()
        .post('contractors')
        .withBody(contractor)
        .expectStatus(201)
        .returns('id')

      contractorIds.push(contractorId)
    })

    it('should create with correct email only', async () => {
      let contractor = contractorData(projectId, 'test@mail')

      await pactum.spec()
        .post('contractors')
        .withBody(contractor)
        .expectStatus(400)

      contractor = contractorData(projectId, 'test@mail.com')

      contractorIds.push(
        await pactum.spec()
          .post('contractors')
          .withBody(contractor)
          .expectStatus(201)
          .expectJsonLike({

          })
          .returns('id')
      )
    })

    it('should get contractor', async () => {

        await pactum.spec().get('contractors')
            .withQueryParams({ projectId })
            .expectStatus(200)
            .expectJsonLength(2)
    })

    it('should not get contractor in different project', async () => {

        await pactum.spec().get('contractors')
            .withQueryParams({ projectId: 'falscheId' })
            .expectStatus(200)
            .expectJsonLength(0)
    })

    it('should delete contractor', async () => {
        const [ id1, id2 ] = contractorIds
        await pactum.spec()
          .delete(`contractors/${id1}`)
          .expectStatus(204)

        await pactum.spec()
          .delete(`contractors/${id2}`)
          .expectStatus(204)

        await pactum.spec()
            .get('contractors')
            .withQueryParams({ projectId })
            .expectStatus(200)
            .expectJson([])
    })
  })
})