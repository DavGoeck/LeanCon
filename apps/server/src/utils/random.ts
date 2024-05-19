const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export const generateToken = (n: number): string => {
    let token = ''
    while (n > 0) {
        const index = Math.floor(ALPHABET.length * Math.random())
        token += ALPHABET.charAt(index)
        n--
    }
    return token
}
