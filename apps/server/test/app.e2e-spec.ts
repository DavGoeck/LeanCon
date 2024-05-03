import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { PersistenceService } from '../src/persistence/persistence.service';
import * as pactum from 'pactum';
import { Project } from 'api';

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PersistenceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleRef.createNestApplication()
    await app.init()
    await app.listen(3333)

    prisma = app.get(PersistenceService)
    await prisma.cleanDb()

    pactum.request.setBaseUrl('http://localhost:3333/api/')
  })

  afterAll(async () => {
    app.close()
  })

  describe('Projects', () => {
    describe('Lifecycle', () => {
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

      it('should delete project', async () => {
        await pactum.spec()
          .delete(`projects/${projectId}`)
          .expectStatus(204)
      })
    })
  })
})