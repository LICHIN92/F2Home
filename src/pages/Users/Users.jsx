import React, { useEffect, useState } from 'react'
import './user.css'
import axios from 'axios'
import { set, useForm } from 'react-hook-form'
import AdminConfirmation from '../../components/AdminCofirmation/AdminConfirmation'
const Users = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [Users, setUsers] = useState([])
    const [view, setView] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const [user, setuser] = useState(null)
    const [deleting, setDelete] = useState(false)
    const token=localStorage.getItem('user')
    useEffect(() => {

        const user = async () => {
            try {
                const useres = await axios.get(`${apiUrl}/admin/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers(useres.data)
            } catch (error) {
                console.log(error);
                alert(error.response.data)
            }
        }
        user()
    }, [token])

    const finduser = async (data) => {
        setuser(null)
        // alert(data.mobile)
        if (!data.mobile) {
            alert('Enter user Mobile')
            return
        }
        try {
            const res = await axios.get(`${apiUrl}/admin/findUser`, {
                params: { mobile: data.mobile },
                 headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(res);
            setuser(res.data)
        } catch (error) {
            console.log(error);

            alert(error.response.data)

        }
    }

    const deleteuser = async (id) => {
        // alert(id)
        try {
            const res = await axios.delete(`${apiUrl}/admin/deleteUser`, {
                params: { id: id },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDelete(false)
            alert(res.data)
            setuser(null)
            reset()
        } catch (error) {
            console.log(error);
            setDelete(false)
            alert(error.response.data)
            // setuser(null)
            reset()
        }
    }
    return (
        <div className='users'>
            {deleting &&
                <AdminConfirmation
                    heading={'Delete Confirmation'}
                    quotes={'Are you sure?'}
                    fun1={deleteuser}
                    cancel={setDelete}
                    id={user[0]._id}
                />
            }
            <h1>Users</h1>
            <p>No.of Users : {Users.length}</p>


            {
                Users &&
                <div>
                    <button className='showButton' onClick={() => setView(prev => !prev)}>Users List</button>
                    {view &&
                        <div className='Usertable'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            No
                                        </th>
                                        <th>
                                            Account Holder
                                        </th>
                                        <th>
                                            Mobile
                                        </th>
                                        {/* <th>
                                            Actions
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Users.map((data, index) => (
                                            <tr>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {data.FirstName}  {data.LastName} <br />
                                                    <div className='userAddress'>
                                                        {data.HouseName} <br />
                                                        {data.Place} <br />
                                                        {data.Post} <br />
                                                    </div>
                                                </td>
                                                <td>
                                                    {data.Mobile}
                                                </td>
                                                {/* <td>
                                                    <span>Delete</span>
                                                </td> */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>}
                </div>

            }

            <div className='userSearch'>
                <h2>Search User</h2>

                <div className='searchUser'>
                    <form onSubmit={handleSubmit(finduser)} className='searchUserForm'>
                        <input type="number" {...register('mobile')} placeholder=' Enter User Mobile' />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                {
                    user && (
                        <table className='deleteUserTable'>
                            <thead>
                                <tr>
                                    <th className='account'>Account</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        {user[0].FirstName} {user[0].LastName}  <br />
                                        {user[0].Mobile} <br />
                                        {user[0].Place} <br />
                                        {user[0].Post}

                                    </td>
                                    <td> <button onClick={() => { setDelete(true) }}>action</button></td>

                                </tr>

                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>

    )
}

export default Users