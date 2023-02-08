import { useRouter } from 'next/router'
import React from 'react'

import Order from '../../models/Order'
import mongoose from 'mongoose'
import Link from 'next/link'
import User from '../../models/User'

const Slug = ({ order, query, User }) => {
  const products = [
    {
      id: 1,
      name: 'Distant Mountains Artwork Tee',
      price: '$36.00',
      description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
      address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
      email: 'f•••@example.com',
      phone: '1•••••••••40',
      href: '#',
      status: 'Processing',
      step: 1,
      date: 'March 24, 2021',
      datetime: '2021-03-24',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
      imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
    },
    // More products...
  ]


  return (
    // <div className='min-h-screen'>
    //   <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    //     <div className="flex justify-start item-start space-y-2 flex-col ">
    //       <h1 className="text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9  text-gray-800">Order <span className='text-gray-400'>#{query}</span></h1>
    //       <p className="text-base font-medium leading-6 text-gray-600">{new Date(order.createdAt).toLocaleString('en-GB', {timeZone: 'UTC', hour12: true})}</p>
    //     </div>

    //     <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    //       <div className="flex flex-col justify-between items-baseline w-full space-y-4 md:space-y-6 xl:space-y-8">
    //           <p className="text-xl md:text-2xl font-semibold leading-6 xl:leading-5 text-gray-800 text-start">Customer’s Cart</p>
    //         <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full h-96 overflow-y-scroll overflow-x-hidden">

    //           {Object.keys(order.Product).map((item) => {
    //             return (

    //               <div key={order.Product[item].slug} className="mt-4 md:mt-6 flex flex-row justify-between items-center md:space-x-6 w-full gap-2">
    //                 <div className="pb-4 md:pb-8 w-full md:w-40">
    //                   <img src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
    //                 </div>
    //                 <div className="border-b border-gray-200 flex flex-row justify-between items-baseline w-full  pb-8 space-y-4 md:space-y-0">

    //                   <div className="w-full flex flex-col justify-start items-start space-y-8">
    //                     <Link href={`/product/${order.Product[item].slug}`} className="m-0 p-0">
    //                       <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{order.Product[item].title}</h3>
    //                     </Link>
    //                     <div className="flex justify-start items-start flex-col space-y-2">
    //                       <p className="text-sm leading-none  text-gray-400">
    //                         <span className="text-gray-800">OrderId : </span> #{query}
    //                       </p>
    //                       <p className="text-sm leading-none text-gray-400">
    //                         <span className="text-gray-800">Size : </span> {order.Product[item].size}
    //                       </p>
    //                       <p className="text-sm leading-none text-gray-400">
    //                         <span className="text-gray-800">Color : </span> {order.Product[item].color}
    //                       </p>
    //                     </div>
    //                   </div>

    //                   <div className="flex justify-evenly space-x-8 items-center w-full">
    //                     <p className="text-base xl:text-lg leading-6 text-gray-800">{order.Product[item].quantity}</p>
    //                     <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹{order.Product[item].amount}</p>
    //                   </div>
    //                 </div>
    //               </div>

    //             )
    //           })}





    //         </div>



    //         <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
    //           <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
    //             <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
    //             <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
    //               <div className="flex justify-between  w-full">
    //                 <p className="text-base leading-4 text-gray-800">Subtotal</p>
    //                 <p className="text-base leading-4 text-gray-600">₹{order.paymentInfo.payload}</p>
    //               </div>
    //               <div className="flex justify-between items-center w-full">
    //                 <p className="text-base leading-4 text-gray-800">
    //                   Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
    //                 </p>
    //                 <p className="text-base leading-4 text-gray-600">-₹28.00 (50%)</p>
    //               </div>
    //               <div className="flex justify-between items-center w-full">
    //                 <p className="text-base leading-4 text-gray-800">Shipping</p>
    //                 <p className="text-base leading-4 text-gray-600">₹8.00</p>
    //               </div>
    //             </div>
    //             <div className="flex justify-between items-center w-full">
    //               <p className="text-lg font-semibold leading-4 text-gray-800">Total</p>
    //               <p className="text-lg font-semibold leading-4 text-gray-600">₹{order.paymentInfo.payload}</p>
    //             </div>
    //           </div>

    //           <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
    //             <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
    //             <div className="flex justify-between items-start w-full">
    //               <div className="flex justify-center items-center space-x-4">
    //                 <div className="w-8 h-8">
    //                   <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
    //                 </div>
    //                 <div className="flex flex-col justify-start items-center">
    //                   <p className="text-lg leading-6 font-semibold text-gray-800">
    //                     Ekart Delivery
    //                     <br />
    //                     <span className="font-normal">Delivery with 24 Hours</span>
    //                   </p>
    //                 </div>
    //               </div>
    //               <p className="text-lg font-semibold leading-6 text-gray-800">₹8.00</p>
    //             </div>
    //             <div className="w-full flex justify-center items-center">
    //               <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>


    //       <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-10 flex-col ">
    //         <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
    //         <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
    //           <div className="flex flex-col justify-start items-start flex-shrink-0">
    //             <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
    //               <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
    //               <div className=" flex justify-start items-start flex-col space-y-2">
    //                 <p className="text-base font-semibold leading-4 text-left text-gray-800">{User.name}</p>
    //                 <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
    //               </div>
    //             </div>

    //             <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
    //               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
    //                 <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
    //               </svg>
    //               <p className="cursor-pointer text-sm leading-5 text-gray-800">{User.email}</p>
    //             </div>
    //           </div>
    //           <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
    //             <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
    //               <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
    //                 <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
    //                 <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
    //               </div>
    //               <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
    //                 <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
    //                 <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
    //               </div>
    //             </div>

    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //   </div>

    // </div>
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

        <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
          <dl className="flex">
            <dt className="text-gray-500">Order number&nbsp;</dt>
            <dd className="font-medium text-gray-900">W086438695</dd>
            <dt>
              <span className="sr-only">Date</span>
              <span className="text-gray-400 mx-2" aria-hidden="true">
                &middot;
              </span>
            </dt>
            <dd className="font-medium text-gray-900">
              <time dateTime="2021-03-22">March 22, 2021</time>
            </dd>
          </dl>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              View invoice<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-24">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
              >
                <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                    <img src={product.imageSrc} alt={product.imageAlt} className="object-center object-cover" />
                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="font-medium text-gray-900 mt-1">{product.price}</p>
                  <p className="text-gray-500 mt-3">{product.description}</p>
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                    <div>
                      <dt className="font-medium text-gray-900">Delivery address</dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">{product.address[0]}</span>
                        <span className="block">{product.address[1]}</span>
                        <span className="block">{product.address[2]}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Shipping updates</dt>
                      <dd className="mt-3 text-gray-500 space-y-3">
                        <p>{product.email}</p>
                        <p>{product.phone}</p>
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Edit
                        </button>
                      </dd>
                    </div>
                  </dl>
                  <p className="font-medium text-gray-900 mt-6 md:mt-10">
                    {product.status} on <time dateTime={product.datetime}>{product.date}</time>
                  </p>
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
                      />
                    </div>
                    <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                      <div className="text-indigo-600">Order placed</div>
                      <div className={(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                        Processing
                      </div>
                      <div className={(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                        Shipped
                      </div>
                      <div className={(product.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                        Delivered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing */}
        <div className="mt-24">
          <h2 className="sr-only">Billing Summary</h2>

          <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">Floyd Miles</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Payment information</dt>
                <dd className="mt-3 flex">
                  <div>
                    <svg
                      aria-hidden="true"
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-auto"
                    >
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p className="text-gray-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
              <div className="pb-4 flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$72</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">$5</dd>
              </div>
              <div className="py-4 flex items-center justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$6.16</dd>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI)
//   }

//   const { slug } = context.query

//   const order = await Order.findOne({ OrderId: slug })
//   const user = await User.findOne(order.userId).select('-password')

//   return {
//     props: {
//       order: JSON.parse(JSON.stringify(order)),
//       query: slug,
//       User: JSON.parse(JSON.stringify(user))
//     }, // will be passed to the page component as props
//   }
// }


export default Slug