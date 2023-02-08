import React, { useEffect } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeadTitle from '../../components/HeadTitle'

const OrderSuccess = () => {

    const router = useRouter()
    const { oid } = router.query

    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])

    return (
        <div className='min-h-screen'>
            <HeadTitle title={"Order Success"}/>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex flex-col items-center justify-center">

                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-fullsm:mx-0 sm:h-10 sm:w-10 mb-2">
                                        <BsPatchCheckFill size={30} color={"Green"} />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <h3 className="text-xl font-medium leading-6 text-gray-900" id="modal-title">Thank you for your purchase !</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">You will receive an order confirmation email with <br></br>details of your order.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 flex justify-center items-center sm:px-6 w-full">
                                <Link href={`/`} className="w-full">
                                    <button type="button" className="w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm">Continue Shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderSuccess