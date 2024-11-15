import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import OtherUsers from './OtherUsers';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const { otherUsers } = useSelector(store => store.user);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]))
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className="w-1/3 p-4 h-screen flex flex-col border-r">

            <form action="" onSubmit={searchSubmitHandler}>
                <div className="mb-4 relative">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search chats"
                        className="input input-bordered w-full rounded-md pl-10"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <IoSearch />
                    </span>
                    <button type='submit' className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 bg-gray-100 rounded-md w-8 h-8 flex justify-center items-center'><IoSearch /></button>
                </div>
            </form>

            <OtherUsers />

        </div>
    );
};

export default Sidebar;
