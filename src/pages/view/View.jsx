import React, { useEffect, useState } from 'react'
import imhh from '../../assets/img/IMG_20230912_133100.jpg'
import './view.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useSelector } from 'react-redux'

const View = () => {
    const User = useSelector((state) => state.user?.user.User)
    console.log(User);

    const navigate = useNavigate()
    const { item } = useParams()
    const [data, setData] = useState([])
    const [wait, setWait] = useState(true)
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(`${apiUrl}/view/${item}`)
                setWait(false)

                console.log(res.data);
                setData(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        getItem()
    }, [])
    return (
        <div className='veiw'>
            <h1>{item}</h1>
            <div className='subitemAdd'>
                {User &&
                    (<MdOutlineProductionQuantityLimits onClick={() => { navigate(`/addproduct/${item}`) }} />
                    )
                }
            </div>
            {
                wait ? 'please wait...... '
                    :
                    <div className="viewcardContainer">
                        {data.length > 0 ?
                            (data.map((file, index) => (
                                <div className='view_card' onClick={() => navigate(`/Book/${file._id}`)}>
                                    <img src={file.Pic} alt="ccc" />
                                    <div className="item_Name">
                                        <h6>{file.Name}</h6>
                                        <h6>
                                            <LiaRupeeSignSolid />

                                            {file.Price} /-Kg
                                        </h6>
                                    </div>
                                </div>
                            )))
                            : ` No ${item} is not added`}


                    </div>
            }

        </div>
    )
}

export default View