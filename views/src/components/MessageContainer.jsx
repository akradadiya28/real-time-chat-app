import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, clearAuthUser } from '../redux/userSlice';

const MessageContainer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id)


    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8001/api/user/logout');
            localStorage.clear();
            dispatch(clearAuthUser());
            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            console.log("logout error", error);
        }
    };

    return (
        <>
            {selectedUser !== null ? (
                <div className="w-3/4 h-screen flex flex-col">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-4 border-b border-gray-300">
                        {/* Left: Profile Photo and User Info */}
                        <div className="flex items-center">
                            <div className="avatar mr-4 p-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={selectedUser?.profilePhoto}
                                        alt={selectedUser?.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">{selectedUser?.fullName}</h3>
                                <p className="text-sm text-gray-400">
                                    {isOnline ? "Online" : ""}
                                </p>
                            </div>
                        </div>

                        {/* Right: Logout Button */}
                        <button onClick={logoutHandler} className="text-white bg-red-500 mr-3 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
                            Logout
                        </button>
                    </div>

                    <Messages message={selectedUser?.message} />

                    <SendInput />

                </div>
            ) : (
                <div className="w-3/4 h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-300 mb-4">Hii {authUser?.fullName},
                        <br />Select a user to start messaging</h1>
                </div>
            )
            }
        </>

    );
};

export default MessageContainer;
