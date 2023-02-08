import React from 'react'
import Head from 'next/head'

const Kids = () => {
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
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">CATEGORY - KIDS</h2>
            <h2 class="text-sm tracking-tight text-gray-400">Price and other details may vary based on product size and colour.</h2>
          </div>


          <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div class="group">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 h-72">
                <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTFSG6-fRwfdBhQ3TzGqDCgK_Aa6wi-3KO3luaauA5Krl_aa9BvvuHVzr4xlzGv5ziurNW69s3JVI5V9bp0VyAbQqaYxyryzCLXI83iKya5ivcV90eE6uW6&usqp=CAE" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 class="mt-4 text-sm text-gray-700 font-bold text-center">Clothing</h3>
              {/* <p class="mt-1 text-sm text-gray-500">this is the description of the product</p>
              <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
            </div>

            <div class="group">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 h-72">
                <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fc5ac303-61d7-4b85-843a-316cd68d1eae/nikecourt-legacy-and-shoe-3MMGC9.png" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 class="mt-4 text-sm text-gray-700 font-bold text-center">Footwear</h3>
              {/* <p class="mt-1 text-sm text-gray-500">this is the description of the product</p>
              <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
            </div>

            <div class="group">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 h-72">
                <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJRtbVBR0Y_AUIL8KXerBrTWB-iYA6j9twDjXHAY5BDVgwFB0PN1oMA-imY2QIevLOHrE8M19XZi7T2j4sqz6_DbfW7qWZ2rtgKGFWO1rd&usqp=CAE" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 class="mt-4 text-sm text-gray-700 font-bold text-center">Essentials</h3>
              {/* <p class="mt-1 text-sm text-gray-500">this is the description of the product</p>
              <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
            </div>
            <div class="group">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 h-72">
                <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRd3zGQtRuqdjhcasAqqgdj6oEyJEHJvLvDsbUAJodMjXywcAM9C5Tho-gyE9v4-8eNoql3LKKeoIV2ien6syaTUJ-7lnI16d8TriRM5risKmmPlPEtRvlBsQ&usqp=CAE" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 class="mt-4 text-sm text-gray-700 font-bold text-center">Sportswear</h3>
              {/* <p class="mt-1 text-sm text-gray-500">this is the description of the product</p>
              <p class="mt-1 text-lg font-medium text-gray-900">$48</p> */}
            </div>

            

            


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

export default Kids