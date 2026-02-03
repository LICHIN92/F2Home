import React, { useState } from 'react'
import Inputz from '../../components/input/Inputz'
import BButton from '../../components/Button/BButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './product.css'
const apiUrl = import.meta.env.VITE_API_URL;
const token=localStorage.getItem('user')
const Product = () => {
    const [formdata, setFormdata] = useState({})
    const [selectedImage, setImage] = useState(null)
    const [upload, setUpload] = useState(false)
    const { item } = useParams()
    const navigate = useNavigate()
    const handleChange = (e) => {
        console.log(e.target.value);

        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const filechange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0])


    }
    const formSubmit = async (e) => {
        e.preventDefault();
        setUpload(true);
        formdata.Item = item
        const data = new FormData();
        data.append('file', selectedImage);
        data.append('Item', item);
        data.append('Name', formdata.Name);
        data.append('Price', formdata.Price);
        data.append('Stock', formdata.Stock)
        data.append('Minimum', formdata.Minimum)
        if (Number(formdata.Minimum) >Number( formdata.Stock)) {
            alert('minimun'+formdata.Minimum +' '+'max'+ formdata.Stock)
            alert(formdata.Minimum>formdata.Stock)
            return alert('Minimum must be less than Stoke')
        }
        try {
            const res = await axios.post(`${apiUrl}/admin/addProduct`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(res);
            alert(res.data.message)
            navigate(`/view/${item}`)
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        } finally {
            setUpload(false);
        }
    };

    return (
        <div className='addproduct'>
            <h1>Add {item}</h1>
            <form onSubmit={formSubmit}>


                <div className="formsdiv">
                    <div>
                        <Inputz name={'Item'} label={'Item'} value={item} />
                    </div>
                    <div>
                        <Inputz name={'Name'} label={'Name'} type={'text'} required={true}
                            value={formdata.Name} onchange={handleChange} />
                    </div>
                    <div>
                        <Inputz name="Price"
                            type="number"
                            label="Price/Kg "
                            value={formdata.Price}
                            onchange={handleChange}
                            required={true} />

                    </div>
                    <div>
                        <Inputz name={'Stock'} label={'Stock (Kg)'} type={'number'} required={true}
                            value={formdata.Stock} onchange={handleChange} />
                    </div>
                    <div>
                        <Inputz name={'Minimum'} label={'Minimum'} type={'number'}
                            value={formdata.Minimum} onchange={handleChange} />
                    </div>
                    <div className='imageshowdiv'>
                        <label htmlFor="">Select Image</label><br />
                        <input type="file" accept='image/*' onChange={filechange} required />
                        {selectedImage && (
                            <div className='imageprev'>
                                <img
                                    className='veiwingImage'
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="preview"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className='addSubmit'>
                    <BButton type={'submit'} name={upload ? 'Uploading...' : "Upload"} />

                </div>
            </form>
        </div>
    )
}

export default Product