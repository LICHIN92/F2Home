import React, { useState } from 'react'
import './Editproduct.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import BButton from '../../components/Button/BButton'
import { useNavigate } from 'react-router-dom'
import AdminConfirmation from '../../components/AdminCofirmation/AdminConfirmation'
const EditProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const apiUrl = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState([])
  const [selectedProduct, setselectedproduct] = useState(null)
  const [selected, setSelected] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('user')
  const [modalOpen, setModalOpen] = useState(false)
  const search = async (data) => {
    if (!data.product) {
      alert('enter Product Name')
      return
    }
    try {
      const res = await axios.post(`${apiUrl}/admin/SearchProduct`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // console.log(res.data);

      setProduct(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  const selectfun = (item) => {
    setselectedproduct(null)
    setSelected(false)
    if (selectedProduct && selectedProduct._id === item._id) {
      setselectedproduct(null); // Deselect if clicked again
      item == null
    } else {
      setSelected(true)

      setselectedproduct(item); // Select new
    }
  };


  const submit = async (data) => {
    data._id = selectedProduct._id
    setselectedproduct(null)

    try {
      setselectedproduct(null)
      const res = await axios.put(`${apiUrl}/admin/editProduct`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert(res.data)
      navigate('/admin')
    } catch (error) {
      console.log(error);

    }
  }
  const DeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/admin/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert(res.data)
      // navigate(0)
      setselectedproduct(null)
      setSelected(false)
      setProduct([])
      setModalOpen(false)
      reset()
    } catch (error) {
      console.log(error);
      alert(error.data)

    }
  }
  return (
    <div className='editProduct'>
      {modalOpen &&
        <AdminConfirmation cancel={setModalOpen}
          heading={`Do you want to delete ${selectedProduct.Name}`}
          quotes={'Are you sure ?'}
          fun1={DeleteProduct}
          id={selectedProduct._id}
        />
      }
      <h1>Edit Product</h1>
      <div className='searchProductDiv'>
        <form onSubmit={handleSubmit(search)} className='searchProductForm'>
          <input type="text" {...register('product')} placeholder='Enter The Product Name' />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='productList'>

        {product.length > 0 ? (
          product.map((data, index) => (
            <div key={index} className={`productItem ${selectedProduct == data ? 'selected' : ""}`} onClick={() => { selectfun(data) }}>
              <img src={data.Pic} alt={data.Name} />
              <p>{data.Name}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      {
        selectedProduct && selected &&
        <div className='editFormDiv'>
          <h1>{selectedProduct.Name}</h1>

          <form onSubmit={handleSubmit(submit)}>
            <div className='editformLabelInputDiv'>
              <label htmlFor="" className='editLabel'>
              </label>
              Name
              <input type="text" {...register('Name')} Value={selectedProduct?.Name || null} />

            </div>
            <div className='editformDiv'>
              <label htmlFor="" className='editLabel'>
                Price
              </label>
              <input type="number" {...register('Price')} Value={selectedProduct.Price} />
            </div>
            <div className='editformDiv'>
              <label htmlFor="" className='editLabel'>
                Availability
              </label>
              <input
                type="checkbox"
                {...register('Availability')}
                checked={selectedProduct.Availability}
                onChange={(e) =>
                  setselectedproduct({
                    ...selectedProduct,
                    Availability: e.target.checked,
                  })
                }
              />
            </div>
            <div className='editformDiv'>
              <label htmlFor="" className='editLabel'>
                Stock
              </label>
              <input type="number" {...register('Stock')} Value={selectedProduct.Stock} />
            </div>
            <div className='editformDiv'>
              <label htmlFor="" className='editLabel'>
                Minimum
              </label>
              <input type="number" {...register('Minimum')} Value={selectedProduct.Minimum} />
            </div>
            <div>
              <BButton type='submit' Bcolor={'#8A2BE2'} color={'white'} name={'Submit'} bdrColor={'darkgreen'} />
            </div>
          </form>
          <div className='delbutt'>
            <BButton
              name={`Delete ${selectedProduct.Name}`}
              onClick={() => setModalOpen(true)}

              Bcolor="gray"
              color="white"
              bdrColor="red"
              type="button"
            />
          </div>

        </div>
      }
    </div>
  )
}

export default EditProduct