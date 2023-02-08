import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/User/UserContext'
import Layout from '../components/User/Layout'
import { RiAccountCircleFill } from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeadTitle from '../components/HeadTitle'

const Account = () => {
    const router = useRouter()

    const UserContext = useContext(userContext)
    const { getUser } = UserContext

    const [user, setUser] = useState({})

    const [showModal, setShowModal] = useState({
        show: false,
        type: ""
    })
        
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        (
            async () => {
                const res = await getUser()
                setUser({ ...res.User })
            }
        )()
    }, [window.onload, success])

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            router.push('/login')
        }
    }, [])

    const handleShowModal = async (e) => {
        setShowModal({ show: true, type: e.target.name })
    }

    return (
        <div className='min-h-screen p-6 pb-6'>
            <HeadTitle title={"User Account"}/>
            <h2 className="text-3xl text-center font-bold tracking-tight text-gray-700">Account</h2>

            <div className=' px-28 py-4'>

                <div class="mt-10 divide-y divide-gray-200">
                    <div class="space-y-1">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                        <p class="max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>
                    <div class="mt-6">
                        <dl class="divide-y divide-gray-200">
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt class="text-sm font-medium text-gray-500">Name</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">{user.name}</span>
                                    <span class="ml-4 flex-shrink-0">
                                        <button type="button" name="userName" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none " onClick={handleShowModal}>Update</button>
                                    </span>
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt class="text-sm font-medium text-gray-500">Photo</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">
                                        <RiAccountCircleFill size={30} />
                                    </span>
                                    <span class="ml-4 flex-shrink-0 flex items-start space-x-4">
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none ">Update</button>
                                        <span class="text-gray-300" aria-hidden="true">|</span>
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none ">Remove</button>
                                    </span>
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt class="text-sm font-medium text-gray-500">Email</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">{user.email}</span>
                                    <span class="ml-4 flex-shrink-0">
                                        <button type="button" name='email' class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none " onClick={handleShowModal}>Update</button>
                                    </span>
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">+91 {user.phoneNo}</span>
                                    <span class="ml-4 flex-shrink-0">
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none " onClick={handleShowModal}>Update</button>
                                    </span>
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>


                <div class="mt-10 divide-y divide-gray-200">
                    <div class="space-y-1">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Address</h3>
                        <p class="max-w-2xl text-sm text-gray-500">Manage your delievry and shipping adresses.</p>
                    </div>
                    <div class="mt-6">
                        <dl class="divide-y divide-gray-200">
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt class="text-sm font-medium text-gray-500">Shipping Address</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">{user.address ? `${user.address}, ${user.state}, ${user.country}- ${user.pincode}` : "No Address Found"}</span>
                                    <span class="ml-4 flex-shrink-0">
                                        <button type="button" name='shippingAddress' class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none " onClick={handleShowModal}>Update</button>
                                    </span>
                                </dd>
                            </div>
                            {/* <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt class="text-sm font-medium text-gray-500">Shipping Address 2</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow">{user.address ? user.address: "No Address Found"}</span>
                                    <span class="ml-4 flex-shrink-0">
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none ">Update</button>
                                    </span>
                                </dd>
                            </div> */}
                        </dl>
                    </div>
                </div>

                <div class="mt-10 divide-y divide-gray-200">
                    <div class="space-y-1">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">View</h3>
                        <p class="max-w-2xl text-sm text-gray-500">Manage your orders and cart.</p>
                    </div>
                    <div class="mt-6">
                        <dl class="divide-y divide-gray-200">
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt class="text-sm font-medium text-gray-500">Orders</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow"></span>
                                    <Link href={"/orders"} class="ml-4 flex-shrink-0">
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none ">view</button>
                                    </Link>
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt class="text-sm font-medium text-gray-500">Cart</dt>
                                <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="flex-grow"></span>
                                    <Link href={"/cart"} class="ml-4 flex-shrink-0">
                                        <button type="button" class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none ">view</button>
                                    </Link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {showModal.show && <Layout type={showModal.type} user={user} success={success} setSuccess={setSuccess} setShowModal={setShowModal} />}


        </div >
    )
}

export default Account