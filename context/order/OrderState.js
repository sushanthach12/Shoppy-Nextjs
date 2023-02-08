import { useState } from "react";
import OrderContext from "./OrderContext";
import { toast } from 'react-toastify';

const OrderState = (props) => {

    const [orders, setOrders] = useState({})
    const [orderItem, setOrderItem] = useState({})

    const createOrder = async (cart, shippingAddress, subTotal, paymentRes) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                Product: cart,
                shippingAddress: shippingAddress,
                subTotal: subTotal,
                status: paymentRes.status === 200 && "Paid"
            })
        })

        const response = await res.json();
        return await response
    }

    const getOrders = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getOrders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })

        const response = await res.json();

        // for (let items of response.Orders) {
        //     const date1 = new Date();
        //     const date2 = new Date(items.expectedDeliveryDate);
        //     let diff
        //     if (date1.getMonth() < date2.getMonth()) {
        //         diff = date2.getTime() - date1.getTime();
        //     } else {
        //         diff = date1.getTime() - date2.getTime();
        //     }

        //     let daydiff = diff / (1000 * 60 * 60 * 24);

        //     if (daydiff >= 3) {
        //         await updateOrder(items.OrderId)
        //     }
        // }

        setOrders(response.Orders);
    }


    const cancelOrder = async (oid) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/cancelOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
                'oid': `${oid}`
            }
        })

        const response = await res.json();
        return response
    }

    const updateOrder = async (oid) => {
        console.log(oid);
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/updateOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
                'oid': `${oid}`
            }
        })
        console.log('Order');
    }

    return (
        <OrderContext.Provider value={{ orders, orderItem, getOrders, createOrder, cancelOrder, updateOrder }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;