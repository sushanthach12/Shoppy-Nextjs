import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import userContext from '../context/User/UserContext'
import cartContext from '../context/cart/CartContext'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { RiAccountCircleFill } from 'react-icons/ri'
import { signOut, useSession } from 'next-auth/react'

const Navbar = ({ user, setUser, setKey, showCart, setShowCart, progress, setProgress }) => {
    const { data: session } = useSession()
    const router = useRouter()

    const UserContext = useContext(userContext)
    const { getUser } = UserContext

    const CartContext = useContext(cartContext)
    const { cartItems, subTotal, FetchCart, RemoveFromCart } = CartContext

    const [dropacc, setDropacc] = useState(false)
    const [dropnoti, setDropnoti] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setuserEmail] = useState("")


    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/search/${search.toLowerCase()}`)
    }

    useEffect(() => {
        setProgress(30)
        setProgress(60)
        setProgress(100)
    }, [])

    useEffect(() => {
        FetchCart()
    }, [])

    useEffect(() => {
        (
            async () => {
                if (localStorage.getItem('authToken')) {
                    const res = await getUser()
                    setUserName(res.User.name)
                    setuserEmail(res.User.email)
                }
            }
        )()
    }, [])



    const Logout = async () => {
        setUser({ loggedIn: false, value: "", isAdmin: false })
        signOut()
    }

    const handleRemoveCart = (slug) => {
        RemoveFromCart(slug)
    }


    return (
        <div>
            <LoadingBar
                color='#f11946'
                height={3}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <nav className="relative bg-white shadow dark:bg-gray-500 ">

                <div className="container px-10 py-3 mx-auto">

                    <div className="flex flex-row justify-between md:flex-row md:justify-between md:items-center">


                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="text-3xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-orange-300 lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300 tracking-widest" >Shoppy.</Link>

                            </div>
                        </div>

                        {/* Search  */}
                        <div className=" flex w-2/5 mx-2 md:block">
                            <div className="relative w-full">
                                <form onSubmit={handleSubmit} method='POST'>
                                    <input id='search' name='search' type="text" className="w-full py-1.5 pl-7 pr-3 text-gray-700 bg-white border rounded-md dark:bg-white dark:text-gray-700 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 " placeholder="Search products" onChange={handleChange} value={search} />

                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>
                                </form>
                            </div>
                        </div>

                        <div className="absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">

                            <div className="flex flex-col md:flex-row md:mx-1 justify-center items-center px-3">
                                {!session && <Link href="/login"><button type="button" className="text-white border border-gray-400 bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mx-3 md:mr-0 dark:bg-gray-500 dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></Link>}

                                {!session && <Link href="/signup"><button type="button" className="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mx-3 md:mr-0 dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button></Link>}

                            </div>


                            {/* notificvation  */}

                            {/* {localStorage.getItem('authToken') && <div className="flex flex-col md:flex-row md:mx-1">
                                <div className="dropdown relative">
                                    <a className=" text-white hover:text-gray-400 focus:text-gray-400 mr-4 dropdown-toggle hidden-arrow flex items-center" href="#" id="dropdownMenuButton1" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { setDropnoti(!dropnoti) }}>
                                        <svg aria-hidden="true" focusable="false" dataprefix="fas" dataicon="bell"
                                            className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z">
                                            </path>
                                        </svg>
                                        <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-4 ml-2 py-0 px-1.5">1</span>
                                    </a>
                                    
                                </div>
                            </div>} */}
                            
                            {/* cart  */}

                            <div className="flex flex-col md:flex-row md:mx-1 py-1">
                                <a className="text-white hover:text-gray-400 focus:text-gray-400 px-3" href="#" onClick={() => { setShowCart(!showCart) }}>
                                    <svg aria-hidden="true" focusable="false" dataprefix="fas" dataicon="shopping-cart"
                                        className="w-4" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path fill="currentColor"
                                            d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
                                        </path>
                                    </svg>
                                </a>
                            </div>


                            {/* acc user  */}

                            {session && <div className="flex flex-col md:flex-row md:mx-1 px-1 z-0">
                                <button type="button" className="flex relative mr-3 text-sm bg-gray-50 rounded-full md:mr-0 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" onClick={() => { setDropacc(!dropacc) }}>
                                    <RiAccountCircleFill size={30} className="rounded-full" color='black'/>
                                </button>

                                <div className={`${(dropacc) ? "" : "hidden"} absolute z-50 mt-11 right-5 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown" onClickCapture={() => { setDropacc(!dropacc) }}>
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{session.user.name}</span>
                                        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{session.user.email}</span>
                                    </div>
                                    <ul className="py-1" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link href="/userAcount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account</Link>
                                        </li>
                                        <li>
                                            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Orders</Link>
                                        </li>
                                        <li>
                                            <Link href="/cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cart</Link>
                                        </li>
                                        <li>
                                            <span className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-red-500 hover:cursor-pointer" onClick={Logout}>Logout</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>}
                        </div>
                    </div>




                    <div className=" mt-4 overflow-y-auto whitespace-nowrap scroll-hidden text-center">
                        <Link className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline md:my-0 " href="/men">Men</Link>
                        <Link className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline md:my-0 " href="/women">Women</Link>
                        <Link className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline md:my-0 " href="/kids">Kids</Link>

                        <Link className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline md:my-0 " href="/support">Support</Link>

                    </div>
                </div >

                <div className={` ${showCart ? "" : "hidden"} relative z-50 `} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                                <div className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => { setShowCart(!showCart) }}>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {
                                                Object.keys(cartItems).length !== 0 ? Object.keys(cartItems).map((item) => {
                                                    return (
                                                        <div className="mt-8" key={cartItems[item]._id}>
                                                            <div className="flow-root">
                                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                    <li className="flex py-6">
                                                                        
                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <a href="#">{cartItems[item].title}</a>
                                                                                    </h3>
                                                                                    <p className="ml-4">₹{cartItems[item].amount}</p>
                                                                                </div>
                                                                                <div className='flex flex-row space-x-4'>
                                                                                    <p className="mt-1 text-sm text-gray-700">Color :<span className='text-gray-500'> {cartItems[item].color}</span></p>
                                                                                    <p className="mt-1 text-sm text-gray-700">Size : <span className='text-gray-500'> {cartItems[item].size}</span></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <p className="text-gray-500">Qty {cartItems[item].quantity}</p>

                                                                                <div className="flex">
                                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveCart(cartItems[item].slug)}>Remove</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                }) :



                                                    <div div className='flex flex-row justify-center items-center p-6'>
                                                        {
                                                            localStorage.getItem('authToken') ?
                                                                <div className='my-auto italic py-16' onClick={() => setShowCart(false)}>
                                                                    <p className=" text-indigo-400 hover:text-indigo-500">Please Add Items to Cart</p>
                                                                </div>
                                                                :
                                                                <div className='my-auto italic py-16' onClick={() => setShowCart(false)}>
                                                                    Please <Link href={"/login"} className="underline text-indigo-400 hover:text-indigo-500">Login</Link>
                                                                </div>
                                                        }

                                                    </div>
                                            }


                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                {localStorage.getItem('authToken') ? <p className='font-semibold'>₹{subTotal}</p> : <p className='font-semibold'>₹0</p>}
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <Link href="/checkout" className='w-full'><button className={` w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${!localStorage.getItem('authToken') ? "disabled:opacity-25" : ""}  disabled:hover:cursor-not-allowed`} onClick={() => setShowCart(false)} disabled={!localStorage.getItem('authToken')}>Checkout</button></Link>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav >

        </div >

    )
}


export default Navbar