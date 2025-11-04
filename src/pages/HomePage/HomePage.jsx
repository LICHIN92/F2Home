import React, { useEffect, useState } from 'react'
import './homepage.css'
import imgg from '../../assets/img/IMG_20230912_133100.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiStickyNoteAddFill } from "react-icons/ri";
import { IoSearch } from 'react-icons/io5'
import searchItems from '../../components/searchComponents/search'
import { useForm } from 'react-hook-form'
const apiUrl = import.meta.env.VITE_API_URL;
const HomePage = () => {
    const navigate = useNavigate()
    const [datas, setData] = useState([])
    const User = useSelector((state) => state.user?.user.User)
    // console.log(User);
    const [wait, setWait] = useState(true)
    const [searching, SetSearching] = useState(false)
    const [searchData, setsearchData] = useState([])
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const [fade, setFade] = useState(false)

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

    // 🔄 Change placeholder every 2 seconds with fade effect
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true) // start fading out
            setTimeout(() => {
                setPlaceholderIndex((prev) => (prev + 1) % searchItems.length)
                setFade(false) // fade back in
            }, 2000) // fade duration
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    const { register, handleSubmit } = useForm()
    const handleSearch = async (data) => {
        SetSearching(true)
        try {
            const res = await axios.post(`${apiUrl}/search`, data)
            setsearchData(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='Homepage'>
            <div className='adminAdd'>
                {User &&
                    <RiStickyNoteAddFill className='addIcon'
                        onClick={() => navigate('/addItem')}
                    />
                }
 {/* search Option */}
                {!wait && 
                <div className="search">
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <input type="text" {...register('search')} placeholder={searchItems[placeholderIndex]} />

                        <div className='searchIcon' type='submit' >
                            <button className='searchButton' >
                                <IoSearch />

                            </button>

                        </div>
                    </form>

                </div>
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


            {/* {
                wait && searching ?
                    <p className='wait'>searching....</p>

                    :
                     <div className="cardConatiner">
                        {searchData.length >= 0 ?

                            (
                                searchData.map((data, index) => (
                                    <div className="card" key={index} onClick={() => navigate(`/view/${data.Item}`)}>
                                        <img src={data.pic} alt="sss" />
                                        <p>{data.Item}</p>
                                    </div>
                                ))

                            )
                            : " no data"}

                    </div>
            } */}

        </div>
    )
}

export default HomePage