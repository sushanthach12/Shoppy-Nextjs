import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ReturnModal = ({ setShowReturnModal, oid }) => {

    const router = useRouter()

    const [query, setQuery] = useState("")

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async () => {
        const res = await fetch('/api/return/returnOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'oid': oid,
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify(query)
        })

        const response = await res.json()
        if (response.Success) {
            toast('Request Success!', {
                position: "bottom-left",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                setShowReturnModal(false)
                setQuery("")
                router.push("/orders")
            }, 1200);
        }
    }

    return (
        <div>
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
            <div class="flex justify-center items-center fixed mt-10 sm:mt-0 z-50 top-0 right-[50%] left-[50%] overflow-x-hidden overflow-y-hidden md:inset-0 h-full bg-opacity-50 bg-gray-700 ">
                <div class="p-4 w-1/2">
                    <div class="mt-5 md:mt-0 ">
                        <div className=' bg-white p-10 rounded-md w-full'>
                            <h3 className='text-xl font-medium text-center'>Reason for returning the order</h3>
                            <div class="relative z-0 w-full mb-6 group">
                                <label for="name" className="mt-4 mb-2 block text-sm font-medium">Query</label>
                                <div className="relative">
                                    <input type="text" id="name" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 " placeholder={"query"} value={query} onChange={handleChange} required />
                                </div>
                            </div>

                            <div class="grid md:grid-cols-2 md:gap-6">

                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:hover:bg-blue-300" onClick={handleSubmit} disabled={!query}>Return</button>
                                <button type="submit" class="text-red-500 border border-red-500  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={() => { setShowReturnModal(false) }}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnModal