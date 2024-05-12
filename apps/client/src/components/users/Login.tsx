import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useUser from '../../hooks/useUser.ts'
import { Link } from 'react-router-dom'
import useNav from '../../hooks/useNav'

const Login = () => {

    return <>
        <h1>Login</h1>
        <LoginForm/>
        <p>Noch kein Konto angelegt? <Link to={'/nutzer/registrierung'}>Jetzt registrieren!</Link></p>
    </>
}

const LoginForm = () => {
    const { login } = useUser()
    const { navigate } = useNav()

    const [ params ] = useSearchParams()
    const from = params.get('from') || '/'

    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ error, setError ] = useState<string | null>(null)

    const onSubmit = async () => {
        const { status, body } = await login({ username, password })
        if(status === 200) {
            navigate(from)
        } else {
            setError(body.message)
        }
    }

    const submitForm: React.FormEventHandler<HTMLFormElement> = 
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit()
        }

    const handleChange = (setter: (value: string) => void) => {
        return (e: React.FormEvent<HTMLInputElement>) => setter(e.currentTarget.value)
    }
    const handleUsernameChange = handleChange(setUsername)
    const handlePasswordChange = handleChange(setPassword)

    return <>
        { error && <p>{error}</p> }
        <form onSubmit={submitForm}>
            <input placeholder='Email' value={username} onChange={handleUsernameChange}/><br/>
            <input placeholder='Passwort' type='password' value={password} onChange={handlePasswordChange}/><br/>
            <input type='submit' value='Anmelden' />
        </form>
    </>
}

export default Login