import { Outlet } from 'react-router-dom'

import './UserForm.css'

const UserForm = () => {
    return <div className='user-form-container'>
        <div className='user-form'>
            <Outlet />
        </div>
    </div>
}

export default UserForm