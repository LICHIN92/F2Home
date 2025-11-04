import React, { useEffect, useState } from 'react'
import './orders.css'
import axios from 'axios'

const Orders = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [orders, setOrders] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemOrders, setItemOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState([])
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [product, setproduct] = useState(null)

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
        setDetails([])
        setLoadingDetails(false)
        // 🟢 If user clicks the same item again → unselect
        if (selectedItem === itemId) {
            setSelectedItem(null);
            setItemOrders([]);
            setLoadingDetails(false)
            return; // stop here, don’t fetch again
        }
        setDetails([])
        setLoadingDetails(false)
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

    const OrderDetails = async (name) => {
        setDetails([])
        setproduct(name)
        try {
            setLoadingDetails(true)
            const res = await axios.get(`${apiUrl}/booking/details/${name}`)
            setDetails(res.data)
            console.log(res.data);

        } catch (error) {
            console.log(error);
            alert(error.response?.data || "Error fetching details")
        } finally {
            setLoadingDetails(false)

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
                    <p>Loading    {selectedItem} details...</p>
                ) : (
                    itemOrders.length > 0 && (
                        <div className='tableDiv'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Item</th>
                                        <th>No.of Orders</th>
                                        {/* <th>Price</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemOrders.map((orderItem, index) => (
                                        <tr key={index} className='prodects' onClick={() => OrderDetails(orderItem._id)}>
                                            <td>{index + 1}</td>
                                            <td>{orderItem._id}</td>
                                            <td>
                                                {orderItem.total}
                                                {/* {orderItem.Quantity > 1000 ? ' Kg' : ' g'} */}
                                            </td>
                                            {/* <td>₹ {orderItem.Price}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )
                )}
                {
                    loadingDetails ? 'Loading order details' :
                        (
                            details.length > 0 ?
                                <div className='tableDive'>
                                    <h2>{product} Orders</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sl.No</th>
                                                <th>Customer</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.map((data, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <p className='CustomerName'>
                                                            {data.User.FirstName + ' ' + data.User.LastName}
                                                        </p>

                                                        <p>
                                                            {data.User.HouseName} <br />
                                                            {data.User.Place} <br />
                                                            {data.User.Post} <br />
                                                            {data.User.Mobile}
                                                        </p>
                                                    </td>
                                                    <td>{data.Price}</td>
                                                    <td>{data.Quantity >= 1000 ? data.Quantity / 1000 : data.Quantity}
                                                        {data.Quantity >= 1000 ? " Kg" : " g "}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>
                                    </table>
                                    {/* ) */}
                                </div> :
                                null
                        )
                }
            </div>
        </div>
    )
}

export default Orders
