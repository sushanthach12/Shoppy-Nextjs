import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Women = () => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Shoppy - Products</title>
        <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
      </Head>

      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='py-2 pb-5'>
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">CATEGORY - WOMEN</h2>
            <h2 class="text-sm tracking-tight text-gray-400">Price and other details may vary based on product size and colour.</h2>
          </div>


          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            <Link href={"/products/womenshirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://m.media-amazon.com/images/I/41by3laAEuL._SX342_SY445_QL70_FMwebp_.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/womentshirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://m.media-amazon.com/images/I/31dlHT85U3L._SY445_SX342_.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">T-shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/womenjeans"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTVXhgXZ7S-QopVTISsi4qycqWQO96JMj5AjQL_or9-w0mMoGmD6XbVZF-iORtZsa5GZK0MEmVK5yElsd7BiQmQksPxMKaMt29EQy3RwkN1P-QecCHrhKcEyA&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Jeans</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/womenhoodies"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://m.media-amazon.com/images/I/51QAkMyz+hL._UX569_.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full " />
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

export async function getServerSideProps(context) {
  
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Women