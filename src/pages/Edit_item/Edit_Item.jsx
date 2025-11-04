import { useForm } from 'react-hook-form'
import './Edit_item.css'
import React, { useState } from 'react'
import axios from 'axios'

const Edit_Item = () => {
  const [data, setdata] = useState([])
  const [wait, setWait] = useState(false)
  const { register, handleSubmit } = useForm()
  const apiUrl = import.meta.env.VITE_API_URL;

  const search = async (data) => {
    if (!data.item) {
      alert('Enter the Item ')
      return
    }
    setWait(true)
    try {
      const find = await axios.post(`${apiUrl}/admin/searchItem`, data)
      setdata(find.data)
    } catch (error) {
      console.log(error);

    }
  }

  const editSubmit = async (formData) => {
    console.log(formData);

    try {
      const payload={
        id:data[0]._id,
        newName:formData.NewName
      }
      const res = await axios.put(`${apiUrl}/admin/EditItem`, payload)
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className='Edit_Item'>
      <h1>Edit Item</h1>
      <div className='searchITEM'>
        <form onSubmit={handleSubmit(search)} >
          <input type="text"{...register('item')} placeholder='search...' />
          <button type='submit' >Search</button>
        </form>
      </div>
      {
        wait &&
        (
          data.length > 0 ?

            <div>
              <h3>Edit {data[0].Item}</h3>
              <form onSubmit={handleSubmit(editSubmit)} className='editform'>
                <img src={data[0].pic} alt="" />
                <label htmlFor="">Item Name</label>
                <input type="text" {...register('NewName')} defaultValue={data[0].Item} />
                <button >Change</button>
              </form>
            </div>

            : "no item"
        )
      }

    </div>
  )
}

export default Edit_Item