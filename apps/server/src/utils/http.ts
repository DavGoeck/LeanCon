

const withStatus = (status: number) => (
    <Type>(data: Type): { body: Type, status } => ({ body: data, status })
)

export const ok = withStatus(200)
export const created = withStatus(201)
export const noContent = () => withStatus(204)({})

export const notFound = withStatus(404)
