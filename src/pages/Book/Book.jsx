import React, { useEffect, useState } from 'react'
import './book.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { FaMinus, FaPlus } from 'react-icons/fa'
import ConfirmBooking from '../ConfirmBooking/ConfirmBooking'
import { useSelector } from 'react-redux'
import AddAddress from '../address/AddAddress'
import Tooltips from '../../components/tooltips/Tooltips'
import UserLogin from '../userLogin/UserLogin'
import { PiShareFat } from 'react-icons/pi'

const Book = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { _id } = useParams()
    const [data, setData] = useState({})
    const [wait, setWait] = useState(false)
    const [quantity, setQuantity] = useState(null) // in grams
    const [maxQuan, setMax] = useState(null)
    const [book, setBook] = useState(false)
    const [image, setImage] = useState(null)
    const [minQuan, SetMin] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const isAddress = useSelector((state) => state.user.user.IsAddress)
    // console.log(isAddress);
    const isIceCream = data?.Item === 'Ice Cream'
    // console.log(isIceCream);

    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            console.log('yes');

        } else {
            console.log('no token');

        }
        const fetchData = async () => {
            try {

                const res = await axios.get(`${apiUrl}/viewItem/${_id}`)
                setWait(true)
                setData(res.data)
                setQuantity(res.data.Minimum)
                setMax(res.data.Stock)
                setImage(res.data.Pic)
                SetMin(res.data.Minimum)
                // console.log(res.data);

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [_id])

    const increaseFun = () => {
        if (quantity < maxQuan) {
            setQuantity(prev => prev + minQuan)
        }
        if (quantity >= maxQuan) {
            alert(`Available Quantity is ${maxQuan / 1000} Kg`)
        }
        console.log(quantity);

    }

    const decreaseFun = () => {
        if (quantity > minQuan) {
            setQuantity(prev => prev - minQuan)
        } else {
            alert(`Minimun quantity is ${minQuan} ${(minQuan >= 1000) ? "Kg" : "g"}`)

        }
        console.log(quantity);

    }
    // Calculate price based on quantity
    const calculatePrice = () => {
        const basePricePerKg = Number(data.Price) || 0
        return Math.floor((quantity / 1000) * basePricePerKg)
    }
    const shareToWhatsApp = () => {
        const productUrl = `${window.location.origin}/Book/${_id}`;
        const message = `Check out this product: ${data.Name} for ₹${data.Price} per Kg.\n${productUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className='Book'>

            {book && (user ?
                (isAddress ?
                    <ConfirmBooking selectedQuantity={quantity} Price={calculatePrice()}
                        cancel={setBook} image={image} Id={_id} refresh={setRefresh} />
                    : <AddAddress cancel={setBook} />)
                :
                navigate('/login', { replace: true }))
            }

            {
                wait ?
                    <div className='book_item'>
                        <div className="share">
                            <PiShareFat onClick={shareToWhatsApp} />

                        </div>
                        <div className='itemDetail'>
                            <img src={data.Pic} alt={data.Name} />
                            <p className='itemPrice'>{data.Name}</p>
                            <p className='itemPrice'>
                                <LiaRupeeSignSolid />
                                {data.Price} / {data.Item == 'Ice Cream' ? "L" : "Kg"}
                            </p>
                        </div>
                        <div className='priceValueBox'>
                            <div className='priceValueBox'>

                                <span>{quantity >= 1000 ? quantity / 1000 : quantity}
                                    {quantity >= 1000 ?
                                        (isIceCream?" L":' Kg')
                                        :
                                       (isIceCream?" ml":' g')
                                        }
                                </span>
                                <span className='pricevalue'>
                                    <LiaRupeeSignSolid /> {calculatePrice()}
                                </span>

                            </div>



                        </div>
                        {
                            !data.Availability ?
                                <>
                                    <p className='outOfStock'>
                                        <span>Not Available</span>
                                    </p>
                                </>
                                :

                                (minQuan < maxQuan ?

                                    <>
                                        <div className='plusMinus'>
                                            <Tooltips text={'Decrease Quantity'}><FaMinus onClick={decreaseFun} /></Tooltips>
                                            {/* <FaMinus onClick={decreaseFun} /> */}
                                            <Tooltips text={'Increase Quantity'}><FaPlus onClick={increaseFun} /></Tooltips>

                                        </div>
                                        <div className='bookButtonDiv'>
                                            <button onClick={() => setBook(true)}>Book Now</button>
                                        </div>
                                    </>
                                    :
                                    <p className='outOfStock'>
                                        <span>Out of Stock</span>
                                    </p>
                                )
                        }


                    </div> :
                    <p>please wait...</p>
            }

        </div>
    )
}

export default Book