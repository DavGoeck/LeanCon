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
    slug: z.string(),
    published: z.coerce.date().optional()
})

export const ContractorSchema = z.object({
    id: z.string(),
    name: z.string(),
    token: z.string(),
    email: z.string().email(),
    projectId: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
})

export const ContractorCreationSchema = ContractorSchema.omit({ id: true, token: true })

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
}).optional()

export type UserRegistration = z.infer<typeof UserRegistrationSchema>
export type User = z.infer<typeof UserSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Contractor = z.infer<typeof ContractorSchema>
export type ContractorCreation = z.infer<typeof ContractorCreationSchema>
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
                    title: z.string().optional(),
                    slug: z.string().optional()
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
                    404: ErrorSchema
                }
            },
            update: {
                method: 'PATCH',
                path: '/projects/:id',
                pathParams: z.object({
                    id: z.string()
                }),
                headers: BearerSchema,
                body: ProjectSchema.omit({ id: true, published: true }).partial(),
                responses: {
                    200: ProjectSchema,
                    404: ErrorSchema
                }
            },
            start: {
                method: 'PATCH',
                path: '/projects/:id/start',
                pathParams: z.object({
                    id: z.string()
                }),
                headers: BearerSchema,
                body: z.any(),
                responses: {
                    200: ProjectSchema,
                    404: ErrorSchema
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
                    404: ErrorSchema
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
                body: ContractorCreationSchema,
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
        contractor: {
            getSelf: {
                method: 'GET',
                path: '/contractor/self',
                query: z.object({
                    token: z.string()
                }),
                responses: {
                    200: ContractorSchema,
                    404: ErrorSchema
                }
            },
            updateSelf: {
                method: 'PATCH',
                path: '/contractor/self',
                query: z.object({
                    token: z.string()
                }),
                body: ContractorSchema.omit({ id: true, email: true }).partial(),
                responses: {
                    200: ContractorSchema,
                    404: ErrorSchema
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
        },
        user: {
            me: {
                method: 'GET',
                path: '/user/me',
                headers: BearerSchema,
                responses: {
                    200: UserSchema,
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
