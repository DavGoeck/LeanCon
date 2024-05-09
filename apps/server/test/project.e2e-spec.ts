import { INestApplication } from '@nestjs/common'
import { loggedInUserSetup } from './setups'

describe('App e2e', () => {
  let pactum
  let app: INestApplication

  beforeAll(async () => {
    const setup = await loggedInUserSetup()
    pactum = setup.pactum
    app = setup.app
  })

  afterAll(async () => {
    app.close()
  })

  describe('Project', () => {
    let projectId;

    const projectBody = { title: 'Neues Projekt' }
    it('should create project', async () => {
      projectId = await pactum
        .spec()
        .post('projects')
        .withBody(projectBody)
        .expectStatus(201)
        .returns('id')
    })

    it('should retrieve projects', async () => {
      await pactum.spec()
        .get('projects')
        .expectStatus(200)
        .expectJsonLike([
          {
            title: 'Neues Projekt'
          }
        ])
    })

    it('should filter projects by title', async () => {
      await pactum.spec()
        .get('projects')
        .withQueryParams({ title: 'Falscher Titel' })
        .expectStatus(200)
        .expectJson([])
    })

    it('should update projects', async () => {
      const newTitle = 'Neuer Titel'
      const newSlug = 'neuer-titel'
      await pactum.spec()
        .patch(`projects/${projectId}`)
        .withBody({ title: newTitle })
        .expectStatus(200)
        .expectJsonLike({
          id: projectId,
          title: newTitle,
          slug: newSlug
        })
    })

    it('should delete project', async () => {
      await pactum.spec()
        .delete(`projects/${projectId}`)
        .expectStatus(204)
    })
  })
})