import React, { useEffect, useState } from "react";

import CardStats from '../Cards/CardStats'

export default function HeaderStats() {

  const [totalOrders, setTotalOrders] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPro, setTotalPro] = useState(0)

  useEffect(() => {
    (
      async () => {
        const resO = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/getOrdersAD`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('authToken')
          }
        })
        const resU = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getUsers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('authToken')
          }
        })
        const resP = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/getProductsAD`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('authToken')
          }
        })
        // const resR = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/getProductsAD`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'authToken': localStorage.getItem('authToken')
        //   }
        // })

        const responseO = await resO.json()
        const responseU = await resU.json()
        const responseP = await resP.json()

        setTotalOrders(Object.keys(responseO.Orders).length)
        setTotalUsers(Object.keys(responseU.Users).length)
        setTotalPro(Object.keys(responseP.Products).length)
      }
    )()
  }, [])

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total User"
                  statTitle={totalUsers}
                  routeLink="allusers"
                  routeLinkName={"view users"}
                />
              </div>
              
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Products"
                  statTitle={totalPro}
                  routeLink="viewproducts"
                  routeLinkName={"view products"}
                />
              </div>
              
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Orders"
                  statTitle={totalOrders}
                  routeLink="allorders"
                  routeLinkName={"view orders"}
                />
              </div>
              
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Return Request"
                  statTitle={totalUsers}
                  routeLink="allusers"
                  routeLinkName={"view users"}
                />
              </div> */}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
