import Footer from '../components/footer'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import UserState from '../context/User/UserState'
import CartState from '../context/cart/CartState'
import OrderState from '../context/order/OrderState'
import Sidebar from '../components/Sidebar/Sidebar'
import AdminNavbar from '../components/Navbars/AdminNavbar'

import { wrapper,store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps, router }) {

  const [user, setUser] = useState({ loggedIn: false, value: null, isAdmin: false })
  const [key, setKey] = useState(Math.random)

  const [showCart, setShowCart] = useState(false)

  const [progress, setProgress] = useState(0)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {!router.pathname.includes('/dashboard') ?
          <div className='bg-white'>
            <UserState>
              <CartState>
                <OrderState>
                  {key && <Navbar setUser={setUser} key={key} setKey={setKey} user={user} showCart={showCart} setShowCart={setShowCart} progress={progress} setProgress={setProgress} />}
                  <div className='mt-1 mb-1'>
                    <Component setUser={setUser} user={user} setKey={setKey} {...pageProps} showCart={showCart} setShowCart={setShowCart} progress={progress} setProgress={setProgress} />
                  </div>
                  <Footer />
                </OrderState>
              </CartState>
            </UserState>
          </div>
          :
          <div className='min-h-screen flex flex-row'>
            <div className='w-1/4'>
              <Sidebar />
            </div>
            <div className='w-3/4 overflow-y-scroll'>
              <AdminNavbar />
              <div className='mt-16'>
                <Component {...pageProps} />
              </div>
            </div>
          </div>}

      </PersistGate>
            
    </Provider>
  )
}

export default MyApp
