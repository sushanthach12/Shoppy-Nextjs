import Link from 'next/link'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../context/cart/CartContext'
import userContext from '../context/User/UserContext'
import orderContext from '../context/order/OrderContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

import getStripe from './stripe/getStripe'

const Checkout = () => {

  const router = useRouter()

  const CartContext = useContext(cartContext)
  const { cartItems, subTotal, FetchCart, Clearcart } = CartContext

  const UserContext = useContext(userContext)
  const { getUser } = UserContext

  const OrderContext = useContext(orderContext)
  const { createOrder } = OrderContext

  const [user, setUser] = useState({})

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    phoneNo: "",
    pincode: "",
    state: "",
    country: ""
  })


  useEffect(() => {
    FetchCart()
  }, [])

  useEffect(() => {
    (
      async () => {
        const token = localStorage.getItem('authToken')
        if (token) {
          const res = await getUser()
          setUser(res.User)
          if(user.address){
            setShippingDetails({
              address: res.User.address,
              pincode: res.User.pincode,
              state: res.User.state,
              country: res.User.country
            })
          }
        }
      }
    )()

  },[getUser, FetchCart])

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      router.push('/login')
    }
  }, [])

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {

    const stripe = await getStripe()

    const response = await fetch(`/api/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem('authToken')
      },
      body: JSON.stringify(cartItems)
    })

    const data = await response.json()
    if (response.status === 200) {

      const res = await createOrder(cartItems, shippingDetails, subTotal, response)

      if (res.Success) {
        stripe.redirectToCheckout({ sessionId: data.id })
        Clearcart()
        FetchCart()
      } else {
        alert('Order Failed, Please Try again')
      }

    }
    else {
      alert('Error Payment')
    }
  }



  const handleSub = (e) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen mb-2'>
      <Head>
        <title>Shoppy - Checkout</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /> */}
        {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
      </Head>

      {/* <Script type="application/javascript" src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"></Script> */}

      <ToastContainer
        position="bottom-left"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-2 gap-2">

        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And proceed accordingly.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {
              Object.keys(cartItems).map((item) => {
                return (
                  <div key={cartItems[item]._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${cartItems[item].image}`} alt="" />
                    <div className="flex w-full flex-col px-4 py-4">
                      <Link href={`/product/${cartItems[item].slug}`}><span className="font-semibold">{cartItems[item].title}</span></Link>
                      <span className="float-right text-gray-400">QTY - {cartItems[item].quantity} <span className='text-gray-400 px-4'> {cartItems[item].size}</span></span>
                      <p className="text-lg font-bold">₹{cartItems[item].amount}</p>
                    </div>
                  </div>
                )
              })
            }

          </div>

          <div className="mt-8 flex flex-col rounded-lg bg-white border px-1 py-2">
            <div className="flex w-full flex-row px-4 py-2 justify-between items-center">
              <span className="font-semibold text-lg">Subtotal</span>
              <span className="font-semibold text-lg">₹{subTotal}</span>

            </div>
            <div className="flex w-full flex-row px-4 justify-between items-center">
              <span className="font-semibold text-gray-400 tracking-wider">*Including all taxes</span>
              {/* <span className="font-semibold text-lg">9999</span> */}
            </div>
            <div className="flex w-full flex-row px-4 py-3 justify-between items-center">
              <Link href="/cart" className="mt-4 mb-8 w-full rounded-md text-center bg-orange-500 px-6 py-3 font-medium text-white tracking-wider">Edit Cart</Link>
            </div>
          </div>
        </div>


        <div className="mt-10 bg-gray-50 px-6 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Checkout Details</p>
          <p className="text-gray-400">Complete your order by providing your delivery details.</p>
          <form onSubmit={handleSub}>
            <div className="">

              <label for="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
              <div className="relative">
                <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 hover:cursor-not-allowed uppercase" placeholder={user.name} readOnly />
              </div>

              <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                <input type="email" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 hover:cursor-not-allowed" placeholder={user.email} readOnly />
              </div>

              <label for="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
              <div className="relative">
                <input type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 hover:cursor-not-allowed" placeholder={user.phoneNo} readOnly />
              </div>


              <label for="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
              <div className="relative">
                <input type="text" id="address" name="address" className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={shippingDetails.address?shippingDetails.address : "Your address"} value={shippingDetails.address} onChange={handleChange} required />
              </div>


              <div className='flex flew-row justify-between items-center gap-3'>
                {/* <div className='w-1/2'>
                  <label for="city" className="mt-4 mb-2 block text-sm font-medium">City</label>
                  <div className="flex">
                    <div className="relative w-full flex-shrink-0">
                      <input type="text" id="city" name="city" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={user.city? user.city: "City"} value={shippingDetails.city} onChange={handleChange} required/>
                    </div>
                  </div>
                </div> */}

                <div className='w-1/2'>
                  <label for="pincode" className="mt-4 mb-2 block text-sm font-medium">Pincode</label>
                  <div className="flex">
                    <div className="relative w-full flex-shrink-0">
                      <input type="text" id="pincode" name="pincode" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Pincode" value={shippingDetails.pincode} onChange={handleChange} required />

                    </div>
                  </div>
                </div>
                <div className='w-1/2'>
                  <label for="state" className="mt-4 mb-2 block text-sm font-medium">State</label>
                  <div className="flex">
                    <div className="relative w-full flex-shrink-0">
                      <input type="text" id="state" name="state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="State" value={shippingDetails.state} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

              </div>

              <div className='flex flew-row justify-between items-center gap-3'>
                

                <div className='w-1/2'>
                  <label for="country" className="mt-4 mb-2 block text-sm font-medium">Country</label>
                  <div className="flex">
                    <div className="relative w-full flex-shrink-0">
                      <input type="text" id="country" name="country" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Country" value={shippingDetails.country} onChange={handleChange} required />

                    </div>
                  </div>
                </div>

              </div>


              {/* 
            <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
                </div>
              </div>
              <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                <option value="State">State</option>
              </select>
              <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
            </div> */}



              <div className="mt-6 flex items-center justify-between border-t py-2">
                <p className="text-lg font-semibold text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">₹{subTotal}</p>
              </div>
            </div>

            <button type='submit' className="mt-4 mb-8 w-full rounded-md bg-orange-500 px-6 py-3 font-medium text-white" onClick={handleCheckout}>Proceed To Pay</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Checkout