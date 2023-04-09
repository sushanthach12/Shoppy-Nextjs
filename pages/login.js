import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import userContext from '../context/User/UserContext';

import { useSession, signIn, signOut, getSession } from 'next-auth/react'

const Login = ({ setKey, setUser, user }) => {

  const { data: session } = useSession()

  const UserContext = useContext(userContext)
  const { handleLogin } = UserContext

  // const dispatch = useDispatch()
  // const { user, status, isAuthenticated } = useSelector(state => state.users)

  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const HANDLELOGIN = async () => {
    const res = await signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_HOST}` })
    console.log("Success");
  }

  const HANDLEAUTHLOGIN = async (e) => {
    e.preventDefault()

    signIn("credentials-login", { ...credentials, callbackUrl: `${process.env.NEXT_PUBLIC_HOST}`, redirect: false })
      .then(response => {
        console.log(session)
      })
      .catch(error => {
        console.log("error");
      })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await handleLogin(credentials, setCredentials, setKey, setUser)

    if (response.Success) {
      if (response.isAdmin) {
        localStorage.setItem('authToken', response.AuthToken)
        setCredentials({ email: "", password: "" })
        setUser({ loggedIn: true, value: response.AuthToken, isAdmin: response.isAdmin })
        router.replace('/dashboard/admin')
      } else {
        localStorage.setItem('authToken', response.AuthToken)
        setCredentials({ email: "", password: "" })
        setUser({ loggedIn: true, value: response.AuthToken })
        setKey(Math.random)
        setKey(Math.random)
        toast('Loggedin successfully!', {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          router.push("/")
        }, 1000);
      }
    } else {
      toast.error('Invalid credentials!', {
        position: "bottom-left",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  if (!session) {
    return (
      <div className='min-h-screen'>
        <Head>
          <title>Shoppy - Login</title>
          <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
        </Head>


        <section className="bg-white py-10">
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
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-50 py-6 px-10 text-center sm:px-12 md:px-[60px]">
                  <div className="mb-6 text-center md:mb-16">

                    <a className="text-4xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-orange-300 lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300 tracking-widest" href="#">Shoppy.</a>
                  </div>

                  <form onSubmit={HANDLEAUTHLOGIN}>
                    <div className="mb-6">
                      <input
                        id='email'
                        name='email'
                        type="text"
                        placeholder="Email"
                        className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                        value={credentials.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        id='password'
                        name='password'
                        type="password"
                        placeholder="Password"
                        className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                        value={credentials.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-10">
                      <button
                        className="bordder-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition hover:bg-opacity-90 bg-indigo-500 tracking-wider font-semibold"
                      >Login</button>
                    </div>
                  </form>
                  <p className="mb-6 text-base text-indigo-400 font-semibold">or Signup with</p>
                  <ul className="-mx-2 mb-12 flex justify-between">
                    <li className="w-full px-2">
                      <a
                        href="javascript:void(0)"
                        className="flex h-11 items-center justify-center rounded-md bg-[#4064AC] hover:bg-opacity-90"
                      >
                        <svg
                          width="10"
                          height="20"
                          viewBox="0 0 10 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="w-full px-2">
                      <a
                        href="javascript:void(0)"
                        className="flex h-11 items-center justify-center rounded-md bg-[#1C9CEA] hover:bg-opacity-90"
                      >
                        <svg
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5516 2.75538L20.9 1.25245C21.2903 0.845401 21.3968 0.53229 21.4323 0.375734C20.3677 0.939335 19.3742 1.1272 18.7355 1.1272H18.4871L18.3452 1.00196C17.4935 0.344423 16.429 0 15.2935 0C12.8097 0 10.8581 1.81605 10.8581 3.91389C10.8581 4.03914 10.8581 4.22701 10.8935 4.35225L11 4.97847L10.2548 4.94716C5.7129 4.82192 1.9871 1.37769 1.38387 0.782779C0.390323 2.34834 0.958064 3.85127 1.56129 4.79061L2.76774 6.54403L0.851613 5.6047C0.887097 6.91977 1.45484 7.95303 2.55484 8.7045L3.5129 9.33072L2.55484 9.67515C3.15806 11.272 4.50645 11.9296 5.5 12.18L6.8129 12.4932L5.57097 13.2446C3.58387 14.4971 1.1 14.4031 0 14.3092C2.23548 15.6869 4.89677 16 6.74194 16C8.12581 16 9.15484 15.8748 9.40322 15.7808C19.3387 13.7143 19.8 5.8865 19.8 4.32094V4.10176L20.0129 3.97652C21.2194 2.97456 21.7161 2.44227 22 2.12916C21.8935 2.16047 21.7516 2.22309 21.6097 2.2544L19.5516 2.75538Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="w-full px-2">
                      <button
                        className=" ml-2 px-10 border-2 border-opacity-100 flex h-11 items-center justify-center rounded-md bg-slate-50 hover:bg-opacity-90"
                        onClick={HANDLELOGIN}
                      >
                        <Image src={"/google.svg"} width={19} height={19} alt="google"></Image>
                      </button>
                    </li>
                  </ul>
                  <a
                    href="javascript:void(0)"
                    className="mb-2 inline-block text-base text-indigo-400 hover:text-primary hover:underline font-semibold"
                  >
                    Forget Password?
                  </a>

                  <div>
                    <span className="absolute top-1 right-1">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="1.39737"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 1.39737 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 1.39737 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 13.6943 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 13.6943 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 25.9911 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 25.9911 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.288"
                          cy="38.6026"
                          r="1.39737"
                          transform="rotate(-90 38.288 38.6026)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.288"
                          cy="1.99122"
                          r="1.39737"
                          transform="rotate(-90 38.288 1.99122)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 1.39737 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 13.6943 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 25.9911 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.288"
                          cy="26.3057"
                          r="1.39737"
                          transform="rotate(-90 38.288 26.3057)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="1.39737"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 1.39737 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="13.6943"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 13.6943 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="25.9911"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 25.9911 14.0086)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="38.288"
                          cy="14.0086"
                          r="1.39737"
                          transform="rotate(-90 38.288 14.0086)"
                          fill="#3056D3"
                        />
                      </svg>
                    </span>
                    <span className="absolute left-1 bottom-1">
                      <svg
                        width="29"
                        height="40"
                        viewBox="0 0 29 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2.288"
                          cy="25.9912"
                          r="1.39737"
                          transform="rotate(-90 2.288 25.9912)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="25.9911"
                          r="1.39737"
                          transform="rotate(-90 14.5849 25.9911)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="25.9911"
                          r="1.39737"
                          transform="rotate(-90 26.7216 25.9911)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="13.6944"
                          r="1.39737"
                          transform="rotate(-90 2.288 13.6944)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="13.6943"
                          r="1.39737"
                          transform="rotate(-90 14.5849 13.6943)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="13.6943"
                          r="1.39737"
                          transform="rotate(-90 26.7216 13.6943)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="38.0087"
                          r="1.39737"
                          transform="rotate(-90 2.288 38.0087)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="2.288"
                          cy="1.39739"
                          r="1.39737"
                          transform="rotate(-90 2.288 1.39739)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="38.0089"
                          r="1.39737"
                          transform="rotate(-90 14.5849 38.0089)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="38.0089"
                          r="1.39737"
                          transform="rotate(-90 26.7216 38.0089)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="14.5849"
                          cy="1.39761"
                          r="1.39737"
                          transform="rotate(-90 14.5849 1.39761)"
                          fill="#3056D3"
                        />
                        <circle
                          cx="26.7216"
                          cy="1.39761"
                          r="1.39737"
                          transform="rotate(-90 26.7216 1.39761)"
                          fill="#3056D3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }


}

export default Login


export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  return {
    props: {
      session: null
    }
  }
}