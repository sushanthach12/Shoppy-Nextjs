import React, { useContext, useState } from 'react'
import userContext from '../../context/User/UserContext'

const Layout = ({ type, user, setShowModal, success, setSuccess }) => {

    const UserContext = useContext(userContext)
    const { updateUser } = UserContext

    const [userName, setUserName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState({
        address: user.address,
        pincode: user.pincode,
        state: user.state,
        country: user.country
    })


    const handleChange = async (e) => {
        switch (type) {
            case 'userName':
                setUserName(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'shippingAddress':
                setAddress({ ...address, [e.target.name]: [e.target.value] })
                break;
        }
    }

    const handleSubmit = async (e) => {
        let res;
        switch (type) {
            case 'userName':
                res = await updateUser(type, userName)
                if (res.Success) {
                    setSuccess(true)
                    setTimeout(() => {
                        setShowModal(false)
                        setSuccess(false)
                    }, 1000)
                }
                break;
            case 'email':
                res = await updateUser(type, email)
                if (res.Success) {
                    setSuccess(true)
                    setTimeout(() => {
                        setShowModal(false)
                        setSuccess(false)
                    }, 1000)
                }
                break;
            case 'shippingAddress':
                res = await updateUser(type, address)
                if (res.Success) {
                    setSuccess(true)
                    setTimeout(() => {
                        setShowModal(false)
                        setSuccess(false)
                    }, 1000)
                }
                break;
        }
    }


    switch (type) {
        case 'userName':
            return (
                <div className='flex justify-center items-center fixed mt-10 sm:mt-0 z-50 top-0 right-[50%] left-[50%] overflow-x-hidden overflow-y-hidden md:inset-0 h-full bg-opacity-50 bg-gray-700 '>
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="bg-white py-6 px-4 sm:p-6">
                            <p className={`${success ? "" : "hidden"} text-green-400 text-center`}>UserName Updated!</p>
                            <div>
                                <h2 id="payment-details-heading" class="text-lg leading-6 font-medium text-gray-900">User Name</h2>
                                <p class="mt-1 text-sm text-gray-500">Update your username. Please note updating your username may affect your orders.</p>
                            </div>

                            <div class="mt-6 grid grid-cols-2 gap-6">
                                <div class="col-span-4 sm:col-span-2">
                                    <label for="userName" class="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" name="userName" id="userName" autocomplete="cc-given-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" value={userName} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row justify-between items-center">
                            <button type="button" class=" border border-red-500 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-red-500  focus:outline-none" onClick={() => setShowModal({ ...{ show: false } })}>Close</button>
                            <button type="button" name='userName' class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none " onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div >
            )

        case 'email':
            return (
                <div className='flex justify-center items-center fixed mt-10 sm:mt-0 z-50 top-0 right-[50%] left-[50%] overflow-x-hidden overflow-y-hidden md:inset-0 h-full bg-opacity-50 bg-gray-700 '>
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="bg-white py-6 px-4 sm:p-6">
                            <p className={`${success ? "" : "hidden"} text-green-400 text-center`}>Email Updated!</p>
                            <div>
                                <h2 id="payment-details-heading" class="text-lg leading-6 font-medium text-gray-900">Email</h2>
                                <p class="mt-1 text-sm text-gray-500">Update your email information. Please note updating your email may affect your orders.</p>
                            </div>

                            <div class="mt-6 grid grid-cols-2 gap-6">

                                <div class="col-span-4 sm:col-span-2">
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                    <input type="text" name="email" id="email" autocomplete="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder='example@email.com' value={email} onChange={handleChange} />
                                </div>


                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row justify-between items-center">
                            <button type="button" class=" border border-red-500 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-red-500  focus:outline-none" onClick={() => setShowModal({ ...{ show: false } })}>Close</button>
                            <button type="submit" class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none " onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div >
            )

        case 'shippingAddress':
            return (
                <div className='flex justify-center items-center fixed mt-10 sm:mt-0 z-50 top-0 right-[50%] left-[50%] overflow-x-hidden overflow-y-hidden md:inset-0 h-full bg-opacity-50 bg-gray-700 '>
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="bg-white py-6 px-4 sm:p-6">
                            <p className={`${success ? "" : "hidden"} text-green-400 text-center`}>Address Updated!</p>
                            <div>
                                <h2 id="payment-details-heading" class="text-lg leading-6 font-medium text-gray-900">Shipping Address</h2>
                                <p class="mt-1 text-sm text-gray-500">Update your address information. Please note updating your address may affect your orders.</p>
                            </div>

                            <div class="mt-6 grid grid-cols-2 gap-6">

                                <div class="col-span-4 sm:col-span-2">
                                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                                    <input type="text" name="address" id="address" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder='address' value={address.address} onChange={handleChange} />
                                </div>
                                <div class="col-span-4 sm:col-span-2">
                                    <label for="pincode" class="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input type="number" name="pincode" id="pincode" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder='pincode' value={address.pincode} onChange={handleChange} />
                                </div>
                                <div class="col-span-4 sm:col-span-2">
                                    <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                                    <input type="text" name="state" id="state" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder='state' value={address.state} onChange={handleChange} />
                                </div>
                                <div class="col-span-4 sm:col-span-2">
                                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                    <input type="text" name="country" id="country" autocomplete="address" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" placeholder='country' value={address.country} onChange={handleChange} />
                                </div>

                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-row justify-between items-center">
                            <button type="button" class=" border border-red-500 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-red-500  focus:outline-none" onClick={() => setShowModal({ ...{ show: false } })}>Close</button>
                            <button type="submit" class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none " onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div >
            )
    }
}

export default Layout