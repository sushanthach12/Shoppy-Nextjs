import React from 'react'
import Head from 'next/head'

import Product from "../models/Product"
import mongoose from 'mongoose'
import Link from 'next/link'

const Men = () => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Shoppy - Products</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
      </Head>

      <div class="w-full">
        <div className='mx-auto max-w-2xl px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='py-2 pb-5'>
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">CATEGORY - MEN</h2>
            <h2 class="text-sm tracking-tight text-gray-400">Price and other details may vary based on product size and colour.</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            <Link href={"/products/menshirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://static.wixstatic.com/media/524c26_3f687f67d7fa4b2ebfc8653e8308da8c~mv2.jpg/v1/fill/w_498,h_498,al_c,q_50,usm_0.66_1.00_0.01/524c26_3f687f67d7fa4b2ebfc8653e8308da8c~mv2.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/mentshirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzD8XyLFyosrxX6M4xGVcT9ISfTc4h87EEoNnpYk-39ct_r9wywfodntr00spFDowLE9L3HkFSzB-YByqU47pUqfe2XakfwhApoDM5onFzD4aKvDVx2AntCA&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">T-shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/menjeans"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0M5S5e5v3gG4PSZOkw-ZIWVZ9R_yZrvPt6OGcdVXJB0KfcyLpcyrtFKh27dXxbat0V9Xlkp9QqgAwOx4pMUfDQX9zWqa7YUW8b3Am7oY&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Jeans</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/menhoodies"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSnwgdQco0m-ESg-IvZU07TnXHq_uCsk4YjWPYvvVsEmviLPhVQqbDHixAF5kx0ftZ566hNTN2NV9p0-aWwCy4xJEqM6CF786JTrXE4TJ47H5dj9Z_TCIQjYg&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full " />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Hoodies</p>
                </div>
              </div>
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Men