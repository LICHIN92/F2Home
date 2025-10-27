import React, { useEffect, useState } from 'react'
import './orders.css'
import axios from 'axios'
const Orders = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [order, setOrders] = useState([])
    const [Item, SetItem] = useState(null)
    const [selected, SetSelected] = useState(false)
    const [ItemOrderes, SetItemOrders] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${apiUrl}/booking/orders`)
                setOrders(res.data)
            } catch (error) {
                console.log(error);
                alert(error.response.data)
            }
        }
        fetch()
    }, [apiUrl])
    const nameAndGet = async (item) => {
        SetSelected(true)
        SetItem(item)
        SetItemOrders([])

        try {

            const res = await axios.get(`${apiUrl}/booking/itemBooked/${Item}`)
            SetItemOrders(res.data)


        } catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    }
    return (
        <div className='orders'>
            <h1>Orders</h1>
            {order.length > 0 ? (
                <div className="order-list">

                    {order.map((item, index) => (
                        <div key={index} className={selected ? "dd" : 'itemOrder'} onClick={() => { nameAndGet(item._id) }} >
                            <span>{item._id}</span>
                            <span>{item.total}</span>

                        </div>
                    ))}

                </div>
            )
                :
                ""}
            <div className="tbables">
                <h2>{Item}</h2>
                {
                    ItemOrderes &&
                    <table>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th> Item</th>
                                <th>Quandity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {ItemOrderes.map((orderItem, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{orderItem.Name}</td>
                                <td>
                                    {orderItem.Quantity}
                                    {orderItem.Quantity > 1000 ? " Kg" : 'g'}
                                </td>
                                <td>₹ {orderItem.Price}</td>
                            </tr>
                        ))}
                    </table>
                }
            </div>

        </div>
    )
}

export default Orders