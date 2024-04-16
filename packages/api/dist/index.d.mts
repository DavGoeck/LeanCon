import { z } from 'zod';

declare const ProjectSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
}, {
    id: string;
    title: string;
}>;
declare const ContractorSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    projectId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    projectId: string;
}, {
    id: string;
    name: string;
    projectId: string;
}>;
type Project = z.infer<typeof ProjectSchema>;
type Contractors = z.infer<typeof ContractorSchema>;
declare const apiContract: {
    projects: {
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodString;
                title: z.ZodString;
            }, "id">, "strip", z.ZodTypeAny, {
                title: string;
            }, {
                title: string;
            }>;
            path: "/api/projects";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodString;
                    title: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    title: string;
                }, {
                    id: string;
                    title: string;
                }>;
            };
            strictStatusCodes: true;
        };
        getAll: {
            query: z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title?: string | undefined;
            }, {
                title?: string | undefined;
            }>;
            method: "GET";
            path: "/api/projects";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    title: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    title: string;
                }, {
                    id: string;
                    title: string;
                }>, "many">;
            };
            strictStatusCodes: true;
        };
        getOne: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "GET";
            path: "/api/projects/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodString;
                    title: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    title: string;
                }, {
                    id: string;
                    title: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "PATCH";
            body: z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title?: string | undefined;
            }, {
                title?: string | undefined;
            }>;
            path: "/api/projects/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodString;
                    title: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    title: string;
                }, {
                    id: string;
                    title: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        remove: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "DELETE";
            body: z.ZodAny;
            path: "/api/projects/:id";
            responses: {
                204: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
    };
    contractors: {
        getAll: {
            query: z.ZodObject<{
                projectId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                projectId: string;
            }, {
                projectId: string;
            }>;
            method: "GET";
            path: "/api/contractors";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    projectId: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    projectId: string;
                }, {
                    id: string;
                    name: string;
                    projectId: string;
                }>, "many">;
            };
            strictStatusCodes: true;
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodString;
                name: z.ZodString;
                projectId: z.ZodString;
            }, "id">, "strip", z.ZodTypeAny, {
                name: string;
                projectId: string;
            }, {
                name: string;
                projectId: string;
            }>;
            path: "/api/contractors";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    projectId: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    projectId: string;
                }, {
                    id: string;
                    name: string;
                    projectId: string;
                }>;
            };
            strictStatusCodes: true;
        };
        remove: {
            method: "DELETE";
            body: z.ZodAny;
            path: "/api/contractors/:id";
            responses: {
                204: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                404: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
            };
            strictStatusCodes: true;
        };
    };
};

export { ContractorSchema, type Contractors, type Project, ProjectSchema, apiContract };
