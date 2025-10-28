import React, { useEffect, useState } from 'react'
import './orders.css'
import axios from 'axios'

const Orders = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [orders, setOrders] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemOrders, setItemOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${apiUrl}/booking/orders`)
                setOrders(res.data)
            } catch (error) {
                console.log(error)
                alert(error.response?.data || 'Error fetching orders')
            }
        }
        fetchOrders()
    }, [apiUrl])

    const handleItemClick = async (itemId) => {

        // 🟢 If user clicks the same item again → unselect
        if (selectedItem === itemId) {
            setSelectedItem(null);
            setItemOrders([]);
            return; // stop here, don’t fetch again
        }
        setSelectedItem(itemId)
        setLoading(true)
        setItemOrders([])

        try {
            const res = await axios.get(`${apiUrl}/booking/itemBooked/${itemId}`)
            setItemOrders(res.data)
        } catch (error) {
            console.log(error)
            alert(error.response?.data || 'Error fetching item details')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='orders'>
            <h1>Orders</h1>

            {orders.length > 0 ? (
                <div className='order-list'>
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className={`itemOrder ${selectedItem === order._id ? 'selected' : ''}`}
                            onClick={() => handleItemClick(order._id)}
                        >
                            <span>{order._id}</span>
                            <span>{order.total}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}

            <div className='tbables'>
                {selectedItem && <h2>{selectedItem}</h2>}

                {loading ? (
                    <p>Loading item details...</p>
                ) : (
                    itemOrders.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemOrders.map((orderItem, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{orderItem.Name}</td>
                                        <td>
                                            {orderItem.Quantity}
                                            {orderItem.Quantity > 1000 ? ' Kg' : ' g'}
                                        </td>
                                        <td>₹ {orderItem.Price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    )
}

export default Orders
