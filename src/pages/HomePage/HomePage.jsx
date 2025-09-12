import React, { useEffect, useState } from 'react'
import './homepage.css'
import imgg from '../../assets/img/IMG_20230912_133100.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiStickyNoteAddFill } from "react-icons/ri";
const apiUrl = import.meta.env.VITE_API_URL;
const HomePage = () => {
    const navigate = useNavigate()
    const [datas, setData] = useState([])
    const User = useSelector((state) => state.user?.user.User)
    // console.log(User);
    const [wait, setWait] = useState(true)
    useEffect(() => {
        const viewItem = async () => {
            try {
                const item = await axios.get(`${apiUrl}`)
                console.log(item);
                setData(item.data.getItem)
                setWait(false)
            } catch (error) {
                console.log(error);

            }
        }
        viewItem()
    }, [])
    return (
        <div className='Homepage'>
            <div className='adminAdd'>
                {User &&
                    <RiStickyNoteAddFill className='addIcon'
                        onClick={() => navigate('/addItem')}
                    />
                }

            </div>
            {
                wait ?
                    <p className='wait'>Please wait....</p>
                    :
                    <div className="cardConatiner">
                        {datas.length > 0 ?

                            (
                                datas.map((data, index) => (
                                    <div className="card" key={index} onClick={() => navigate(`/view/${data.Item}`)}>
                                        <img src={data.pic} alt="sss" />
                                        <p>{data.Item}</p>
                                    </div>
                                ))

                            )
                            : " no data"}

                    </div>

            }

        </div>
    )
}

export default HomePage