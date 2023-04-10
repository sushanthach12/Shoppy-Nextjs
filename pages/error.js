import React from 'react'
import Error from 'next/error'

const error = ({ statusCode }) => {
    return (
        <p className='text-center'>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    )
}

export default error

error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}