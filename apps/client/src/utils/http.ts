export const httpHandler = <Type extends { status: number }>(response: Type, handlers: { [status: number]: (response: Type) => void, "default": (response: Type) => void }) => {
    const handler = handlers[response.status] || handlers.default
    handler(response)
}
