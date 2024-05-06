const status = (status: number) => (
    <Type>(data: Type): { body: Type, status } => ({ body: data, status })
)

export const ok = status(200)
export const created = status(201)
export const noContent = () => status(204)({})

export const notFound = status(404)
