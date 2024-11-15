import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

function OtherUsers() {

    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) return;

    return (
        <div className="flex flex-col space-y-2 flex-grow overflow-y-auto">
            {otherUsers?.map((user) => {
                return (
                    <OtherUser key={user._id} user={user} />
                )
            })}
        </div>
    )
}

export default OtherUsers