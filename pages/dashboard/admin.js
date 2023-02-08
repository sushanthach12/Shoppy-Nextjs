import React from 'react'

import HeaderStats from '../../components/Headers/HeaderStats';
import AdminNavbar from '../../components/Navbars/AdminNavbar';

const Admin = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-row'>
            <div className="w-full relative bg-blue-100">
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                </div>
            </div>
        </div>
    )
}

export default Admin



