import { useRouter } from 'next/router'
import React from 'react'

import Order from '../../models/Order'
import mongoose from 'mongoose'
import Link from 'next/link'
import User from '../../models/User'

const Slug = ({ order, query, User }) => {
  console.log(order);

  return (
    <div className='min-h-screen'>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9  text-gray-800">Order <span className='text-gray-400'>#{query}</span></h1>
          <p className="text-base font-medium leading-6 text-gray-600">{new Date(order.createdAt).toLocaleString('en-GB', {timeZone: 'UTC', hour12: true})}</p>
        </div>

        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-between items-baseline w-full space-y-4 md:space-y-6 xl:space-y-8">
              <p className="text-xl md:text-2xl font-semibold leading-6 xl:leading-5 text-gray-800 text-start">Customer’s Cart</p>
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full h-96 overflow-y-scroll overflow-x-hidden">

              {Object.keys(order.Product).map((item) => {
                return (

                  <div key={order.Product[item].slug} className="mt-4 md:mt-6 flex flex-row justify-between items-center md:space-x-6 w-full gap-2">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img src={`${order.Product[item].image}`} alt="dress" />
                    </div>
                    <div className="border-b border-gray-200 flex flex-row justify-between items-baseline w-full  pb-8 space-y-4 md:space-y-0">

                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <Link href={`/product/${order.Product[item].slug}`} className="m-0 p-0">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{order.Product[item].title}</h3>
                        </Link>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none  text-gray-400">
                            <span className="text-gray-800">OrderId : </span> #{query}
                          </p>
                          <p className="text-sm leading-none text-gray-400">
                            <span className="text-gray-800">Size : </span> {order.Product[item].size}
                          </p>
                          <p className="text-sm leading-none text-gray-400">
                            <span className="text-gray-800">Color : </span> {order.Product[item].color}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-evenly space-x-8 items-center w-full">
                        <p className="text-base xl:text-lg leading-6 text-gray-800">{order.Product[item].quantity}</p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹{order.Product[item].amount}</p>
                      </div>
                    </div>
                  </div>

                )
              })}





            </div>



            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base leading-4 text-gray-600">₹{order.paymentInfo.payload}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">-₹28.00 (50%)</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                    <p className="text-base leading-4 text-gray-600">₹8.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-lg font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">₹{order.paymentInfo.payload}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        Ekart Delivery
                        <br />
                        <span className="font-normal">Delivery with 24 Hours</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">₹8.00</p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-10 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{User.name}</p>
                    <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">{User.email}</p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Payment Status</p>
                    <p className={`w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 uppercase ${order.status==='Paid' ? 'text-green-400' : 'text-gray-800'}`}>{order.status}</p>
                  </div>
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
                  </div>
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  const { slug } = context.query 

  const order = await Order.findOne({ OrderId: slug })
  const user = await User.findById(order?.userId).select('-password')

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      query: slug,
      User: JSON.parse(JSON.stringify(user))
    }, // will be passed to the page component as props
  }
}


export default Slug