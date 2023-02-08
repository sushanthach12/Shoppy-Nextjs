import React from 'react'


import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats'
import AdminNavbar from '../../components/Navbars/AdminNavbar';

const AdminLayout = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-row'>
            <div className='p-0 w-1/4'>
                <Sidebar />
            </div>
            <div className="w-3/4 relative md:ml-64 bg-blue-100">
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout



