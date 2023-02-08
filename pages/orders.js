import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import orderContext from '../context/order/OrderContext'
import Link from 'next/link'


const Orders = ({ user }) => {

  const OrderContext = useContext(orderContext)
  const { getOrders, orders } = OrderContext

  useEffect(() => {
    (
      async () => {
        await getOrders()
      }
    )()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      router.push('/login')
    }
  }, [])


  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Shoppy - Orders</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
      </Head>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:pb-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download invoices.
          </p>
        </div>

        <div className="mt-16">

          {
            Object.keys(orders).length !== 0 ? <div className="space-y-20">
              {Object.keys(orders).map((item) => (
                <div key={orders[item].OrderId}>
                  <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="sm:mt-1">
                          <span >{new Date(orders[item].createdAt).toLocaleString('en-GB', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="sm:mt-1">{orders[item].OrderId.substring(0, 20)}...</dd>
                      </div>
                      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                        <dt>Total amount</dt>
                        <dd className="sm:mt-1">₹{orders[item].paymentInfo.payload}</dd>
                      </div>
                    </dl>
                    <Link
                      href={`/invoice/${orders[item].OrderId}`}
                      className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                    >
                      View Invoice
                    </Link>
                  </div>



                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                      <tr>
                        <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                          Product
                        </th>
                        <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                          Price
                        </th>
                        <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                          Status
                        </th>
                        
                        <th scope="col" className="w-0 py-3 font-normal text-right">
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                      {Object.keys(orders[item].Product).map((product) => (
                        <tr key={orders[item].Product[product]._id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={orders[item].Product[product].image}
                                alt={"product.imageAlt"}
                                className="w-16 h-16 object-center object-cover rounded mr-6"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{orders[item].Product[product].title}</div>
                                <div className="mt-1 sm:hidden">{orders[item].Product[product].amount}</div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">{orders[item].Product[product].amount}</td>
                          <td className="hidden py-6 pr-8 sm:table-cell">{orders[item].status}</td>
                          
                          <td className="py-6 font-medium text-right whitespace-nowrap">
                            <Link href={`/order/${orders[item].OrderId}`} className="text-indigo-600">
                              View<span className="hidden lg:inline"> Order</span>

                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
              :
              <div className='w-full h-[50%]'>
                <div className='w-full flex flex-col justify-center items-center pt-16'>
                  <p className='italic text-2xl text-gray-500'>No orders to show</p>
                  <Link href={"/"} className='italic text-sm underline text-blue-500'>Continue Shopping</Link>
                </div>
              </div>
          }

        </div>
      </div>
    </div>
  )
}


export default Orders