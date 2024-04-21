import { createContext } from 'react'

type TokenUpdater = {
    token: string | null,
    setToken: (token: string | null) => void
}

const defaultValue = { token: null, setToken: () => {} }
const TokenContext = createContext<TokenUpdater>(defaultValue)

export default TokenContext
