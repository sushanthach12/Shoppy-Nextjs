import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import cartContext from '../context/cart/CartContext'
import Link from 'next/link'
import {MdDelete} from 'react-icons/md'

const Cart = () => {

  const CartContext = useContext(cartContext)
  const { cartItems, subTotal, FetchCart, RemoveFromCart } = CartContext

  useEffect(() => {
    FetchCart()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
        router.push('/login')
    }
}, [])


  const handleRemove = (slug) => {
    RemoveFromCart(slug)
  }


  return (
    <div className='bg-white min-h-screen'>
      <Head>
        <title>Shoppy - Cart</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

      </Head>


      <div className="container mx-3 ">
        <div className=' w-full flex flex-row justify-between items-start'>

          <div className="flex flex-col w-2/3  space-y-4 sm:p-10  ">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
            <ul className="flex flex-col divide-y divide-gray-400">

              {
                Object.keys(cartItems).length !== 0 && Object.keys(cartItems).map((item) => {
                  return (
                    <div key={cartItems[item].slug} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img className="flex-shrink-0 p-2 object-contain w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 " src={`${cartItems[item].image}`} alt="Polaroid camera" />
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <Link href={`/product/${cartItems[item].slug}`}><h3 className="text-lg font-semibold leading-snug sm:pr-8">{cartItems[item].title}</h3></Link>
                              <div className='flex flex-row space-x-6 py-5 justify-start items-start'>

                                <p className="text-sm dark:text-gray-700">Size : <span className='text-gray-500'>{cartItems[item].size}</span></p>
                                <p className="text-sm dark:text-gray-700">Color : <span className='text-gray-500'>{cartItems[item].color}</span></p>
                                <p className="text-sm dark:text-gray-700">Quantity : <span className='text-gray-500'>{cartItems[item].quantity}</span></p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">₹{cartItems[item].amount}</p>
                            </div>
                          </div>
                          <div className="flex text-sm divide-x">
                            <button type="button" className="flex flex-row justify-center items-center px-2 py-1 pl-0 space-x-1" onClick={()=> handleRemove(cartItems[item].slug)}>
                              <MdDelete color='red' size={19}/>
                              <span className='text-red-600'>Remove</span>
                            </button>
                            {/* <button type="button" className="flex items-center px-2 py-1 space-x-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                              </svg>
                              <span>Add to favorites</span>
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {Object.keys(cartItems).length === 0 && <p className='text-xl text-red-400 text-center mt-10 italic'>Please add items to cart</p>}
            </ul>

          </div>

          <div className='w-1/3 mt-20'>
            <div className="flex flex-col space-y-4 sm:w-96 sm:p-10 bg-gray-50 rounded-md">
              <h2 className="text-2xl font-semibold">Order summary</h2>

              <div className="pt-4 space-y-2">
                <div className='border-b-2 border-gray-200 pb-3'>
                  <div className="flex justify-between">
                    <span className='text-sm text-gray-500'>Subtotal</span>
                    <span className='text-sm text-gray-500'>₹{subTotal}</span>
                  </div>
                </div>
                <div className='border-b-2 border-gray-200 pb-3'>
                  <div className="flex justify-between">
                    <span className='text-sm text-gray-500'>Shipping estimate</span>
                    <span className='text-sm text-gray-500'>₹21.50</span>
                  </div>
                </div>
                <div className='border-b-2 border-gray-200 pb-3'>
                  <div className="flex justify-between">
                    <span className='text-sm text-gray-500'>Tax estimate</span>
                    <span className='text-sm text-gray-500'>₹21.50</span>
                  </div>
                </div>
                <div className=' pt-4'>
                  <div className="flex justify-between pb-4">
                    <span className='text-base font-semibold text-gray-900'>Order Total</span>
                    <span>₹{subTotal}</span>
                  </div>
                  <Link href={"/checkout"}><button type="button" className="w-full py-2 font-semibold border rounded bg-orange-500 text-white">Checkout</button></Link>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Cart