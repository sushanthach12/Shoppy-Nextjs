import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import HeadTitle from '../components/HeadTitle';
import sendSupportMail from '../lib/supportMail';

const Support = () => {

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const [isLoading, setisLoading] = useState(false)

    const handleChange = (e) => setContactForm({ ...contactForm, [e.target.name]: [e.target.value] })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setisLoading(true)
        const res = await sendSupportMail(contactForm)

        if (res.Success) {
            setContactForm({
                name: "",
                email: "",
                subject: "",
                message: ""
            })
            setisLoading(false)
            toast('Message Sent', {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {

            toast.error('Email invalid!', {
                position: "bottom-left",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    return (
        <div className='min-h-screen'>
            <HeadTitle title={"Support"} />
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
            <div className="container py-8 px-16 mx-auto">

                <section className="mb-32 text-gray-800">
                    <div className="flex justify-center">
                        <div className="text-center lg:max-w-3xl md:max-w-xl">
                            <h2 className="text-3xl font-bold mb-12 px-6">Contact us</h2>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center px-10">
                        <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12 pt-2">
                            <div className="flex flex-wrap">
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headset" className="w-5 text-white"
                                                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor"
                                                        d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">Technical support</p>
                                            <p className="text-gray-500">supportshoppy@gmail.com</p>
                                            {/* <p className="text-gray-500">+1 234-567-89</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dollar-sign"
                                                    className="w-3 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512">
                                                    <path fill="currentColor"
                                                        d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">Email Us for General Queries</p>
                                            <p className="text-gray-500">helloshoppy@gmail.com</p>
                                            {/* <p className="text-gray-500">+1 234-567-89</p> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="grow-0 shrink-0 bg-gray-100 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 py-10 lg:px-6 rounded-md border border-gray-300">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-6">
                                    <input type="text" name='name' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7" placeholder="Name" value={contactForm.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="email" name='email' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8" placeholder="Email address" value={contactForm.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="text" name='subject' className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8" placeholder="Subject" value={contactForm.subject} onChange={handleChange} required />
                                </div>
                                <div className="form-group mb-6">
                                    <textarea name='message' className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea13" rows="3" placeholder="Message" value={contactForm.message} onChange={handleChange} required></textarea>
                                </div>

                                {!isLoading && <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Send</button>}

                                {isLoading && <button disabled type="button" class="text-white w-full ite bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center opacity-80 disabled:hover:cursor-progress">
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Sending...
                                </button>}
                            </form>
                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}

export default Support