import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const c = initContract()

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string()
})

export const ContractorSchema = z.object({
    id: z.string(),
    name: z.string(),
    projectId: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
})

export type Project = z.infer<typeof ProjectSchema>
export type Contractor = z.infer<typeof ContractorSchema>

export const apiContract = c.router(
    {
        projects: {
            create: {
                method: 'POST',
                path: '/projects',
                body: ProjectSchema.omit({ id: true }),
                responses: {
                    201: ProjectSchema
                }
            },
            getAll: {
                method: 'GET',
                path: '/projects',
                query: z.object({
                    title: z.string().optional()
                }),
                responses: {
                    200: ProjectSchema.array()
                }
            },
            getOne: {
                method: 'GET',
                path: '/projects/:id',
                pathParams: z.object({
                    id: z.coerce.string()
                }),
                responses: {
                    200: ProjectSchema,
                    404: z.object({
                        message: z.string()
                    })
                }
            },
            update: {
                method: 'PATCH',
                path: '/projects/:id',
                pathParams: z.object({
                    id: z.string()
                }),
                body: ProjectSchema.omit({ id: true }).partial(),
                responses: {
                    200: ProjectSchema,
                    404: z.object({
                        message: z.string()
                    })
                }
            },
            remove: {
                method: 'DELETE',
                path: '/projects/:id',
                pathParams: z.object({
                    id: z.string()
                }),
                body: z.any(),
                responses: {
                    204: z.object({}),
                    404: z.object({
                        message: z.string()
                    })
                }
            }
        },
        contractors: {
            getAll: {
                method: 'GET',
                path: '/contractors',
                query: z.object({
                    projectId: z.string()
                }),
                responses: {
                    200: ContractorSchema.array()
                }
            },
            create: {
                method: 'POST',
                path: '/contractors',
                body: ContractorSchema.omit({ id: true }),
                responses: {
                    201: ContractorSchema
                }
            },
            remove: {
                method: 'DELETE',
                path: '/contractors/:id',
                body: z.any(),
                responses: {
                    204: z.object({}),
                    404: z.object({})
                }
            }
        }
    },
    {
        pathPrefix: '/api',
        strictStatusCodes: true
    }
)
