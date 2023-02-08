import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'

const AllUsers = () => {
    const [users, setUsers] = useState({})

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getUsers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem('authToken')
                    }
                })

                const response = await res.json()
                setUsers(response.Users)
            }
        )()
    }, [])
    console.log(users);

    return (
        <div className='min-h-screen'>
            <div className='border rounded-md p-8 h-auto'>
                <h3 className='text-2xl font-semibold text-center p-3'>View Products</h3>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Pincode
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    State
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Country
                                </th>
                                <th scope="col" class="px-6 py-3 text-base">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {Object.entries(users).map(([key, value]) => {
                                return (
                                    <tr key={key} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {value.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {value.email}
                                        </td>
                                        <td class="px-6 py-4 uppercase">
                                            {value.pincode}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.address}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.state}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.country}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 space-x-1">
                                                <BiEdit />
                                                Edit
                                            </button>

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
    )
}


export default AllUsers