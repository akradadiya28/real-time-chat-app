import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

function HomePage() {
    return (
        <div className='flex'>
            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default HomePage