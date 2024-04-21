import { Outlet } from 'react-router-dom'

import './UserForm.css'

const UserForm = () => <div className='userform-container'>
    <div className='userform'>
        <Outlet/>
    </div>
</div>

export default UserForm