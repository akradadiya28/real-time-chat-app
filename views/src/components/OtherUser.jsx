import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id)

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-600 ${selectedUser?._id === user?._id ? 'bg-gray-200 text-gray-600' : ''
                    }`}
            >
                <div className="avatar placeholder w-10 h-10 mr-3 relative">
                    <div className="rounded-full w-full h-full flex justify-center items-center overflow-hidden">
                        <img
                            src={user?.profilePhoto}
                            alt={user?.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Conditionally Render Online Status Indicator */}
                    {isOnline ? (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    ) : ''}
                </div>
                <div>
                    <h4 className="text-lg font-semibold">{user?.fullName}</h4>
                    <p className="text-sm">Last message...</p>
                </div>
            </div>
        </>
    )
}

export default OtherUser