import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Product from "../../models/Product"
import mongoose from 'mongoose'

const Slug = ({ products, query }) => {
    console.log(products);
    return (
        <div className='min-h-screen'>
            <Head>
                <title>Shoppy - Results</title>
                <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
            </Head>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className='py-2 pb-5'>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-700">RESULTS - {query}</h2>
                        <h2 className="text-sm tracking-tight text-gray-400">Price and other details may vary based on product size and colour.</h2>
                    </div>


                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                        {Object.keys(products).map(item => {
                            return (
                                <Link href={`/product/${products[item].slug}`} key={item._id}>
                                    <div className="group">
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                            <img src={`${products[item].image}`} alt="Product img" className="h-96 w-full object-cover object-center group-hover:opacity-75" />
                                        </div>
                                        <h3 className="mt-4 mb-1 font-semibold text-base text-gray-700">{products[item].title}</h3>
                                        <p className="mt-1 mb-1 text-sm text-gray-500">{products[item].desc.substring(0, 80)}</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">₹{products[item].price}</p>
                                    </div>
                                </Link>
                            )
                        })}

                    </div>
                </div>
            </div>


        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    const { slug } = context.query
    let products = {}
    const gender = ['men', 'Men', 'MEN', 'women', 'Women', 'WOMEN', 'boys', 'Boys', 'BOYS']
    const categories = ['shirts','shirt', 'tshirts', 'tshirt', 'hoodie', 'hoodies', 'pants', 'sweatshirt', 'jeans', 'Jeans', 'jean', 'kids', 'Kids', 'KIDS']

    const keywords = ['men shirts','men shirt', 'men tshirts', 'men tshirt', 'men hoodie', 'men hoodies', 'men pants', 'men sweatshirt', 'men jeans', 'men Jeans', 'men jean', 'Men shirts','Men shirt', 'Men tshirts', 'Men tshirt', 'Men hoodie', 'Men hoodies', 'Men pants', 'Men sweatshirt', 'Men jeans', 'Men Jeans', 'Men jean','women shirts','women shirt', 'women tshirts', 'women tshirt', 'women hoodie', 'women hoodies', 'women pants', 'women sweatshirt', 'women jeans', 'women Jeans', 'women jean', 'Women shirts','Women shirt', 'Women tshirts', 'Women tshirt', 'Women hoodie', 'Women hoodies', 'Women pants', 'Women sweatshirt', 'Women jeans', 'Women Jeans', 'Women jean']

    if (gender.includes(slug)) {
        products = await Product.find({ 'gender': slug })
    }
    if (categories.includes(slug)) {
        products = await Product.find({ 'category': slug })
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            query: slug
        }, // will be passed to the page component as props
    }
}

export default Slug