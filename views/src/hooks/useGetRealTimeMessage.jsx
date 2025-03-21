import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"
import { playNotificationSound } from "../utils/audio"

const useGetRealTimeMessage = () => {

    const { socket } = useSelector(store => store.socket)
    const { messages } = useSelector(store => store.message)
    const { authUser } = useSelector(store => store.user)
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            if (newMessage.senderId !== authUser?._id) {
                playNotificationSound();
            }
            dispatch(setMessages([...messages, newMessage]))
        })

        return () => {
            socket?.off('newMessage');
        }
    }, [socket, setMessages, messages, authUser])
}

export default useGetRealTimeMessage