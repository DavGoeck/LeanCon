import { useState } from 'react'
import API from '../../api-client.ts'
import useNav from '../../hooks/useNav'

const Registration = () => {
    const { navigate } = useNav()

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ match, setMatch ] = useState('')

    const handleChange = (setter: (event: string) => void) => (
        (e: React.FormEvent<HTMLInputElement>) => { setter(e.currentTarget.value) }
    )
    const handleFirstNameChange = handleChange(setFirstName)
    const handleLastNameChange = handleChange(setLastName)
    const handleEmailChange = handleChange(setEmail)
    const handlePasswordChange = handleChange(setPassword)
    const handleMatchChange = handleChange(setMatch)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const user = { firstName, lastName, email, password, match }
        API.auth.signUp.mutation({ body: user })

        navigate('/nutzer/login')
    }

    return <>
        <h1>Registrierung</h1>
        <form onSubmit={onSubmit}>
            <input placeholder='Vorname' value={firstName} onChange={handleFirstNameChange}/><br/>
            <input placeholder='Nachname' value={lastName} onChange={handleLastNameChange}/><br/>
            <input placeholder='Email' value={email} onChange={handleEmailChange}/><br/>
            <input placeholder='Passwort' type='password' value={password} onChange={handlePasswordChange}/><br/>
            <input placeholder='Passwort wiederholen' type='password' value={match} onChange={handleMatchChange}/><br/>
            <input type='submit' value='Registrieren'/>
        </form>
    </>
}

export default Registration