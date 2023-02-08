import React, { useContext, useEffect, useState } from 'react'
import Order from "../../models/Order"
import mongoose from 'mongoose'
import Link from 'next/link';
import Head from 'next/head';
import orderContext from '../../context/order/OrderContext';
import { useRouter } from 'next/router';
import ReturnModal from '../../components/Modal/ReturnModal';


const Slug = ({ Order, success }) => {
  const router = useRouter()

  const OrderContext = useContext(orderContext)
  const { cancelOrder, updateOrder } = OrderContext

  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)

  // useEffect(() => {
  //   (
  //     async() => {
  //       if(success){
  //         await updateOrder(Order.OrderId)
  //       }
  //     }
  //   )()
  // }, [success, updateOrder])

  const handleCancel = async () => {
    const res = await cancelOrder(Order.OrderId)
    if (res.Success) {
      setShowCancelModal(false)
      router.push(`/cancel/${Order.OrderId}`)
    }
  }

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Shoppy - Orders</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
      </Head>
      <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-32">
        <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">

          <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
            <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">Order Summary - <span className='text-gray-500 italic'>{Order.status}</span></h3>
            <p className="text-base leading-none mt-4 text-gray-500">
              Check the status of recent orders, manage returns, and download invoices.
            </p>
            <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">

              {
                Object.keys(Order.Product).map((item) => {
                  return (
                    <div key={Order.Product[item]._id} className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
                      <div className="w-40 md:w-32">
                        <img className="p-2" src={`${Order.Product[item].image}`} alt="girl-in-red-dress" />
                      </div>
                      <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                        <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                          <Link href={`/product/${Order.Product[item].slug}`}><h3 className="text-lg md:text-xl w-full font-semibold leading-6 md:leading-5  text-gray-800">{Order.Product[item].title}</h3></Link>
                          <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                            <p className="text-sm font-semibold leading-none text-gray-700">
                              Size  : <span className="text-gray-500 font-normal"> {Order.Product[item].size}</span>
                            </p>
                            <p className="text-sm font-semibold leading-none text-gray-700">
                              Quantity  : <span className="text-gray-500 font-normal"> {Order.Product[item].quantity}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                          <p className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">₹{Order.Product[item].amount}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>


            <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
              <div className="flex justify-between items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
                <div className="flex w-1/4 jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">Billing Address</p>
                  <div className="text-sm leading-5 text-gray-600">{Order.shippingAddress.address}, {Order.shippingAddress.city}, {Order.shippingAddress.state}, {Order.shippingAddress.country} - {Order.shippingAddress.pincode}</div>
                </div>
                <div className="flex w-1/4 jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">Shipping Address</p>
                  <p className="text-sm leading-5 text-gray-600">{Order.shippingAddress.address}, {Order.shippingAddress.city}, {Order.shippingAddress.state}, {Order.shippingAddress.country} - {Order.shippingAddress.pincode}</p>
                </div>
                <div className="flex w-1/4 jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">Delivery Status</p>
                  {!Order.isDelivered && <p className="text-sm leading-5 text-green-600">In-transit</p>}
                  {Order.isDelivered && <p className="text-sm leading-5 text-green-600">Delivered</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base leading-4 text-gray-600">₹{Order.paymentInfo.payload}</p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">-₹28.00 (50%)</p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                    <p className="text-base leading-4 text-gray-600">₹8.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base font-semibold leading-4 text-gray-600">₹{Order.paymentInfo.payload}</p>
                </div>
                {!Order.isDelivered ? <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                  <button className="py-5 border border-red-500 rounded-md  w-full text-base font-medium leading-4 text-red-600 hover:bg-gray-50 " onClick={() => { setShowCancelModal(true) }}>Cancel Order</button>
                </div>
                  :
                  <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                    <button className="py-5 border border-red-500 rounded-md  w-full text-base font-medium leading-4 text-red-600 hover:bg-gray-50 " onClick={() => { setShowReturnModal(true) }}>return order</button>
                  </div>
                }
              </div>
            </div>

            {showReturnModal && <ReturnModal setShowReturnModal={setShowReturnModal} oid={Order.OrderId}/>}


            {showCancelModal && <div id="popup-modal" tabindex="-1" class={`fixed top-0 right-[50%] left-[50%] z-50 flex justify-center items-center overflow-x-hidden overflow-y-hidden md:inset-0 h-modal md:h-full bg-opacity-50 bg-gray-50 `}>
              <div class="relative w-full h-full max-w-md md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal" onClick={() => { setShowCancelModal(false) }}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                      </path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-6 text-center">
                    <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to cancel order?</h3>
                    <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleCancel}>
                      Yes, I&apos;m sure
                    </button>
                    <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => { setShowCancelModal(false) }}>No, cancel</button>
                  </div>
                </div>
              </div>
            </div>}


          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let success = false
  let order = await Order.findOne({ OrderId: slug })
  if (order) {
    const date1 = new Date();
    const date2 = new Date(order.expectedDeliveryDate);
    let diff
    if (date1.getMonth() < date2.getMonth()) {
      diff = date2.getTime() - date1.getTime();
    } else {
      diff = date1.getTime() - date2.getTime();
    }

    let daydiff = diff / (1000 * 60 * 60 * 24);

    if (daydiff >= 3) {
      await Order.updateOne({ '_id': order._id }, { '$set': { isDelivered: true } })
      success = true
    }
  }
  order = await Order.findOne({ OrderId: slug })

  return {
    props: {
      Order: JSON.parse(JSON.stringify(order)),
      success: success
    }, // will be passed to the page component as props
  }
}


export default Slug