import { Contractor } from 'api'

const mail = 'testo@e.com'
const pass = '12345678'

export const userInfo = {
  firstName: 'Testo',
  lastName: 'E',
  email: mail,
  password: pass,
  match: pass
}

export const userCredentials = {
    username: mail,
    password: pass
}

export const randomUserInfo = () => {
    const pass = randomText(8)
    return {
        firstName: randomText(8),
        lastName: randomText(8),
        email: randomMail(8),
        password: pass,
        match: pass
    }
}

export const contractorData = (projectId: string, email:string = 'test@mail.com') : Partial<Contractor> => {
    const date = new Date()
    const data: Partial<Contractor> = {
        name: 'Test Gewerk',
        start: date,
        end: date,
        projectId
    }
    if (email) data.email = email
    return data
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const randomText = (length: number) => {
    if (length < 0) return randomText(0)

    let text = ""
    for(let i=0; i<length; i++) {
        const r = Math.floor(ALPHABET.length * Math.random())
        text += ALPHABET.charAt(r)
    }

    return text;
}

const randomMail = (length: number) => {
    return `${randomText(length)}@mail.com`
}
