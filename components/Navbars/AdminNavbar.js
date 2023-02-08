import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const AdminNavbar = () => {

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const router = useRouter()

  useEffect(() => {
    (
      async () => {
        const token = localStorage.getItem('authToken')
        if (token) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authToken': token
            }
          })
          const response = await res.json()
          setUserName(response.User.name)
          setUserEmail(response.User.email)
        }
      }
    )()
  }, [])
  
  const handleSignout = () => {
    localStorage.removeItem('authToken');
    router.replace(`${process.env.NEXT_PUBLIC_HOST}/login`)
  }


  return (
    <>
      <nav class="fixed z-50 w-full px-2 py-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="container flex flex-wrap items-center justify-between mx-3">
          <a href="#" class="flex space-x-2 items-center">
            <img className="w-8 h-8 rounded-full" src="https://mdbootstrap.com/img/new/avatars/2.jpg" alt="admin_photo" />
            <div className="flex flex-col justify-start items-start pl-2">
            <span class=" text-xl font-semibold whitespace-nowrap text-white">{userName}</span>
            <span class=" text-sm font-semibold whitespace-nowrap text-gray-400">{userEmail}</span>
            </div>
          </a>

          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
              </li>
              
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li> */}
              {/* <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
              </li> */}
              <li>
                <button onClick={handleSignout} class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Signout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}

export default AdminNavbar