import React, { useState, useEffect } from 'react'

const AllOrders = () => {
    const [orders, setOrders] = useState({})

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getOrdersAD`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem('authToken')
                    }
                })

                const response = await res.json()
                console.log(response);
                setOrders(response.Orders)
            }
        )()
    }, [])

    console.log(orders);

    return (
        <div>
            <div className='min-h-screen'>
                <div className='border rounded-md p-8 h-auto'>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        OrderID
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        paymentID
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        Ordered Date
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        No of Producs
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        Amount
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-base">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    Object.entries(orders).map(([key, value]) => {
                                        return (
                                            <tr key={key} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {value.OrderId.substring(0,20)}...
                                                </th>
                                                <td class="px-6 py-4">
                                                    {value.paymentInfo.id.substring(0,20)}...
                                                </td>
                                                <td class="px-6 py-4">
                                                    {new Date(orders[key].createdAt).toLocaleString('en-GB', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {Object.keys(value.Product).length}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {value.status}
                                                </td>
                                                <td class="px-6 py-4">
                                                    ₹{value.paymentInfo.payload}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllOrders