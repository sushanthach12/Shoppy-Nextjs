
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiOutlineArrowSmRight } from 'react-icons/hi'
import HeadTitle from '../components/HeadTitle'

export default function Home({ user }) {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push('/')
    } else {
      router.push('/login')
    }
  }, [user])


  return (
    <div >
      <HeadTitle title={"One Platform for all your needs"}/>

      {/* New Arrivals */}
      <div className="relative mt-1 overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 ">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Life isn&apos;t perfect but your OUTFIT can be.</h1>
              <p className="mt-4 text-xl text-gray-500">Our collection will shelter you from the harsh elements of a world that doesnt care if you live or die.</p>
            </div>
            <div>
              <div className="mt-10 ">
                <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg" alt="s" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg" alt="" className="h-full w-full object-cover object-center" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
{/* 
                <a href="#" className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700">Shop Collection</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by category */}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row justify-between'>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop By Category</h2>

{/* 
            <span className="sm:ml-3 flex flex-row justify-center items-center text-indigo-600 font-semibold text-sm hover:cursor-pointer hover:text-indigo-400">

              Browse all categories

              <HiOutlineArrowSmRight size={20} />
            </span> */}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            <Link href={"/products/Shirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://static.wixstatic.com/media/524c26_3f687f67d7fa4b2ebfc8653e8308da8c~mv2.jpg/v1/fill/w_498,h_498,al_c,q_50,usm_0.66_1.00_0.01/524c26_3f687f67d7fa4b2ebfc8653e8308da8c~mv2.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/Tshirt"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzD8XyLFyosrxX6M4xGVcT9ISfTc4h87EEoNnpYk-39ct_r9wywfodntr00spFDowLE9L3HkFSzB-YByqU47pUqfe2XakfwhApoDM5onFzD4aKvDVx2AntCA&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">T-shirts</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/jeans"}>
              <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0M5S5e5v3gG4PSZOkw-ZIWVZ9R_yZrvPt6OGcdVXJB0KfcyLpcyrtFKh27dXxbat0V9Xlkp9QqgAwOx4pMUfDQX9zWqa7YUW8b3Am7oY&usqp=CAE" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-center items-center">

                  <p className="text-lg font-semibold text-gray-700 tracking-wider">Jeans</p>
                </div>
              </div>
            </Link>

            <Link href={"/products/Hoodies"}>
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



      {/* Shop by Collection */}


      <div className="mt-3 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">Arriving Soon...</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg" alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Desk and Office
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">Work from home accessories</p>
              </div>

              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg" alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant." className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Self-Improvement
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">Journals and note-taking</p>
              </div>

              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg" alt="Collection of four insulated travel bottles on wooden shelf." className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Travel
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">Daily commute essentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
