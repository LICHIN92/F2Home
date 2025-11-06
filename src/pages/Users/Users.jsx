import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios'
const Users = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [Users, setUsers] = useState(null)
    useEffect(() => {

        const user = async () => {
            try {
                const useres = await axios.get(`${apiUrl}/admin/user`)
                setUsers(useres.data)
            } catch (error) {
                console.log(error);
                alert(error.response.data)
            }
        }
        user()
    }, [])
    return (
        <div className='users'>
            <h1>Users</h1>
            <p>No.of Users {Users}</p>
        </div>
    )
}

export default Users