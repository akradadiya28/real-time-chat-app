import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8001/api/message/${selectedUser?._id}`);
                console.log(res.data);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log("getMessages error", error);
            }
        }
        fetchMessages();
    }, [selectedUser])
}

export default useGetMessages 