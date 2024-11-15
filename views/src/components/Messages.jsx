import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetMessages from '../hooks/useGetMessages'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'

function Messages() {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    if (!messages) return;
    return (
        <div className='flex-grow overflow-y-auto p-4'>
            {
                messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }
        </div>
    )
}

export default Messages