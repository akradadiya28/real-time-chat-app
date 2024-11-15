import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

function SendInput() {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8001/api/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log("send message error", error);
        }
        setMessage('');
    }

    return (
        <form action="" onSubmit={onSubmitHandler}>
            {/* Message Input */}
            <div className="flex items-center p-4 border-t border-gray-300">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message"
                    className="input input-bordered flex-grow mr-3 rounded-md focus:outline-none p-3"
                />
                <button type='submit' className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput