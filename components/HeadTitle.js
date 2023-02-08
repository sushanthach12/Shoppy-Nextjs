import Head from 'next/head'
import React from 'react'

const HeadTitle = ({title}) => {
    return (
        <Head>
            <title>Shoppy - {title}</title>
            <meta name="description" content="Shoppy is a ecommerce platform for all your needs and you will love it" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            {/* <script src="//code.tidio.co/dhhgkpwkn72wjf4i9afuk8xrgmnq9lpo.js" async></script> */}
        </Head>
    )
}

export default HeadTitle