import React, { useState } from 'react';
import Inputz from '../../components/input/Inputz';
import BButton from '../../components/Button/BButton';
import './addItem.css';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const ItemAdd = () => {
    const [selectedImage, setImage] = useState(null); // single image
    const [formdata, setFormData] = useState({});

    const fileOnChange = (e) => {
        setImage(e.target.files[0]); // only one file
    };

    const handleOnChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const ItemSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('item', formdata.item);         // text field
        data.append('file', selectedImage);         // file field must match backend!

        try {
            const response = await axios.post(`${apiUrl}/admin`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Success:', response.data);
        } catch (error) {
            console.log('Upload failed:', error);
        }
    };

    return (
        <div className='addItem'>
            <form onSubmit={ItemSubmit}>
                <h1>Add Item</h1>
                <div className='additemDiv'>
                    <Inputz
                        label={'Item Name'}
                        value={formdata.item || ''}
                        type='text'
                        name='item'
                        required={true}
                        onchange={handleOnChange}
                    />
                </div>

                <div className='additemDiv'>
                    <label>Select Image</label>
                    <input type="file" accept="image/*" onChange={fileOnChange} />
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

                <div className='additemDiv'>
                    <BButton name={'Add'} type={'submit'} />
                </div>
            </form>
        </div>
    );
};

export default ItemAdd;
