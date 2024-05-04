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

export const contractorData = (projectId: string) : Partial<Contractor> => {
    const date = new Date()
    return {
        name: 'Test Gewerk',
        start: date,
        end: date,
        projectId
    }
}