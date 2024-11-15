import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {

    const dispatch = useDispatch();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8001/api/user/');
                // console.log(res);

                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log("getOtherUser error", error);
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers