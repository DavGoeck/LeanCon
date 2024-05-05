import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const c = initContract()

const IdSchema = z.object({
    id: z.string()
})

const UserDataSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
})

const IdenticalPasswordSchema = z.object({
    password: z.string().min(8),
    match: z.string()
})

export const UserRegistrationSchema = UserDataSchema.merge(IdenticalPasswordSchema)
export const UserSchema = UserDataSchema.merge(IdSchema)

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string()
})

export const ContractorSchema = z.object({
    id: z.string(),
    name: z.string(),
    projectId: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
})

export const CredentialsSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const JwtSchema = z.object({
    "access-token": z.string()
})

export const ErrorSchema = z.object({
    type: z.string().optional(),
    message: z.string()
})

export const BearerSchema = z.object({
    authorization: z.string()
})

export type UserRegistration = z.infer<typeof UserRegistrationSchema>
export type User = z.infer<typeof UserSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Contractor = z.infer<typeof ContractorSchema>
export type Credentials = z.infer<typeof CredentialsSchema>
export type Jwt = z.infer<typeof JwtSchema>

export const apiContract = c.router(
    {
        projects: {
            create: {
                method: 'POST',
                path: '/projects',
                body: ProjectSchema.omit({ id: true, slug: true }),
                headers: BearerSchema,
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
                headers: BearerSchema,
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
                headers: BearerSchema,
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
                headers: BearerSchema,
                responses: {
                    200: ContractorSchema.array()
                }
            },
            create: {
                method: 'POST',
                path: '/contractors',
                body: ContractorSchema.omit({ id: true }),
                headers: BearerSchema,
                responses: {
                    201: ContractorSchema
                }
            },
            remove: {
                method: 'DELETE',
                path: '/contractors/:id',
                headers: BearerSchema,
                body: z.any(),
                responses: {
                    204: z.object({}),
                    404: z.object({})
                }
            }
        },
        auth: {
            signUp: {
                method: 'POST',
                path: '/auth/signup',
                body: UserRegistrationSchema,
                responses: {
                    201: UserRegistrationSchema
                        .omit({ password: true, match: true})
                        .merge(z.object({ id: z.string() })),
                    409: ErrorSchema
                }
            },
            signIn: {
                method: 'POST',
                path: '/auth/signin',
                body: CredentialsSchema,
                responses: {
                    200: JwtSchema,
                    401: ErrorSchema
                }
            }
        }
    },
    {
        pathPrefix: '/api',
        strictStatusCodes: true
    }
)
