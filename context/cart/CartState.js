import { useState } from "react";
import CartContext from "./CartContext";
import { toast } from 'react-toastify';


const CartState = (props) => {

    const [cartItems, setCartItems] = useState({})
    const [subTotal, setSubTotal] = useState(0)


    const AddToCart = async (product,color, size, variants) => {
        const token = localStorage.getItem('authToken')
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/addToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                "title": product.title,
                "slug": variants[color][size].slug,
                "size": size,
                "image": product.image,
                "color": color,
                "quantity": product.quantity,
                "amount": product.price
            })

        })
        FetchCart()
    }
    const FetchCart = async () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/fetchCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': `${token}`
                }
            })
            const response = await res.json()
            setCartItems(response.Cart)
            setSubTotal(response.SubTotal)
        }
    }

    const RemoveFromCart = async (slug) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/removeItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
                'slug': `${slug}`
            }
        })
        const response = await res.json();
        if (response.Success) {
            FetchCart()
        }
    }

    const Clearcart = async() =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cart/clearcart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })
    }

    return (
        <CartContext.Provider value={{ cartItems,subTotal, AddToCart, FetchCart, RemoveFromCart, Clearcart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;