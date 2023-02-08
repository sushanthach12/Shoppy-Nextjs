import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Head from 'next/head'

import Product from "../../models/Product"
import mongoose from 'mongoose'
import { useState } from 'react'
import cartContext from '../../context/cart/CartContext'


const Slug = ({ product, variants, showCart, setShowCart, progress, setProgress }) => {

    const context = useContext(cartContext)
    const { AddToCart, FetchCart } = context

    const router = useRouter()
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', '6-7Y', '10-12Y','12-14Y', '5-6Y','7-8Y'];
    const [color, setColor] = useState(product.color)
    const [size, setSize] = useState(product.size)


    const handleClickColor = async (c) => {
        setColor(c)
        console.log(color);
    }
    const handleClickSize = async (s) => {
        setSize(s)
    }
    const refreshVariant = async (newColor, newSize) => {
        let url = `/product/${variants[newColor][newSize].slug}`
        router.push(url)
        setProgress(30)
        setProgress(60)
        setProgress(100)
    }

    const handleAddToCart = async (product, Color, Size, variants) => {
        setShowCart(true)
        AddToCart(product, Color, Size, variants)
        setTimeout(() => {
            setShowCart(false)
        }, 3000);
    }

    useEffect(() => {
        setColor(product.color)
        setSize(product.size)
        FetchCart()
        setProgress(30)
        setProgress(60)
        setProgress(100)
    }, [window.reload])


    return (
        <>
            <Head>
                <title>Shoppy - Products</title>
                <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
            </Head>
            <div className='min-h-screen'>

                <div className="bg-white pb-6">
                    <div className="pt-6">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <li>
                                    <div className="flex items-center">
                                        <a href="#" className="mr-2 text-sm font-medium text-gray-900">{product.gender}</a>
                                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>

                                <li>
                                    <div className="flex items-center">
                                        <a href="#" className="mr-2 text-sm font-medium text-gray-900">Clothing</a>
                                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>

                                <li className="text-sm">
                                    <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.title}</a>
                                </li>
                            </ol>
                        </nav>


                        <div className='flex flex-row px-24'>

                            <div className="mx-auto mt-6 max-w-[50%] h-1/2">
                                <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                                    <img src={`${product.image}`} alt="Two each of gray, white, and black shirts laying flat." className=" w-full object-cover object-center h-full" />
                                </div>
                            </div>


                            <div className="mx-auto w-[50%] px-4 pt-10 pb-16 sm:px-6 flex flex-col">
                                <div className="lg:col-span-2 lg:pr-8">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                                </div>


                                <div className="mt-4 lg:row-span-3">
                                    <p className="text-3xl tracking-tight text-gray-900">₹{product.price}</p>


                                    <div className="mt-4">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">

                                                <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>


                                                <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>


                                                <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>


                                                <svg className="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>


                                                <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="sr-only">4 out of 5 stars</p>
                                            <span href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</span>
                                        </div>
                                    </div>

                                    <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pb-16 lg:pr-8">

                                        <div>
                                            <h3 className="sr-only">Description</h3>

                                            <div className="space-y-6">
                                                <p className="text-base text-gray-900">{product.desc}</p>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                            <div className="mt-4">
                                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                    <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>

                                                    <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>

                                                    <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>

                                                    <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <form className="mt-0">

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                            <fieldset className="mt-4">
                                                <legend className="sr-only">Choose a color</legend>
                                                <div className="flex items-center space-x-3">
                                                    <select aria-selected={product.color} className="border-2 rounded-md px-2 py-1 bg-white border-opacity-10">
                                                        {Object.keys(variants).map((c) => {
                                                            return (
                                                                <option className='border-2 rounded-md px-3 py-2 bg-white' key={c} value={c} onClick={() => handleClickColor(c)}>{c}</option>
                                                            )
                                                        })}
                                                    </select>


                                                </div>
                                            </fieldset>
                                        </div>

                                        <div className="mt-10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                                            </div>

                                            <fieldset className="mt-4">
                                                <legend className="sr-only">Choose a size</legend>
                                                <div className="grid gap-24 grid-cols-8">

                                                    {sizes.map((s) => {
                                                        return (
                                                            Object.keys(variants).includes(color) && Object.keys(variants[color]).includes(s) &&
                                                            <div className="w-20 relative border rounded-md py-5 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 bg-white hover:cursor-pointer" onClick={() => refreshVariant(color, s)}>
                                                                <span key={s} id="size" name="size" value={s} onClick={() => handleClickSize(s)}>{s}</span>
                                                            </div>

                                                        )
                                                    })}

                                                </div>
                                            </fieldset>
                                        </div>

                                        <button type="button" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => handleAddToCart(product, color, size, variants)}>Add to Cart</button>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    const product = await Product.aggregate([
        {
            '$match': {
                'slug': slug
            }
        }
    ]);
    const products = await Product.find({ 'title': product[0].title });

    let variants = {};

    for (let item of products) {
        if (Object.keys(variants).includes(item.color)) {
            variants[item.color][item.size] = {
                "slug": item.slug
            }
        } else {
            variants[item.color] = {};
            variants[item.color][item.size] = {
                "slug": item.slug,
            }
        }
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(products[0])),
            variants: variants
        }, // will be passed to the page component as props
    }
}

export default Slug