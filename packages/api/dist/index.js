"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ContractorSchema: () => ContractorSchema,
  ProjectSchema: () => ProjectSchema,
  apiContract: () => apiContract
});
module.exports = __toCommonJS(src_exports);
var import_core = require("@ts-rest/core");
var import_zod = require("zod");
var c = (0, import_core.initContract)();
var ProjectSchema = import_zod.z.object({
  id: import_zod.z.string(),
  title: import_zod.z.string()
});
var ContractorSchema = import_zod.z.object({
  id: import_zod.z.string(),
  name: import_zod.z.string(),
  projectId: import_zod.z.string()
});
var apiContract = c.router(
  {
    projects: {
      create: {
        method: "POST",
        path: "/projects",
        body: ProjectSchema.omit({ id: true }),
        responses: {
          201: ProjectSchema
        }
      },
      getAll: {
        method: "GET",
        path: "/projects",
        query: import_zod.z.object({
          title: import_zod.z.string().optional()
        }),
        responses: {
          200: ProjectSchema.array()
        }
      },
      getOne: {
        method: "GET",
        path: "/projects/:id",
        pathParams: import_zod.z.object({
          id: import_zod.z.coerce.string()
        }),
        responses: {
          200: ProjectSchema,
          404: import_zod.z.object({
            message: import_zod.z.string()
          })
        }
      },
      update: {
        method: "PATCH",
        path: "/projects/:id",
        pathParams: import_zod.z.object({
          id: import_zod.z.string()
        }),
        body: ProjectSchema.omit({ id: true }).partial(),
        responses: {
          200: ProjectSchema,
          404: import_zod.z.object({
            message: import_zod.z.string()
          })
        }
      },
      remove: {
        method: "DELETE",
        path: "/projects/:id",
        pathParams: import_zod.z.object({
          id: import_zod.z.string()
        }),
        body: import_zod.z.any(),
        responses: {
          204: import_zod.z.object({}),
          404: import_zod.z.object({
            message: import_zod.z.string()
          })
        }
      }
    },
    contractors: {
      getAll: {
        method: "GET",
        path: "/contractors",
        query: import_zod.z.object({
          projectId: import_zod.z.string()
        }),
        responses: {
          200: ContractorSchema.array()
        }
      },
      create: {
        method: "POST",
        path: "/contractors",
        body: ContractorSchema.omit({ id: true }),
        responses: {
          201: ContractorSchema
        }
      },
      remove: {
        method: "DELETE",
        path: "/contractors/:id",
        body: import_zod.z.any(),
        responses: {
          204: import_zod.z.object({}),
          404: import_zod.z.object({})
        }
      }
    }
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContractorSchema,
  ProjectSchema,
  apiContract
});
