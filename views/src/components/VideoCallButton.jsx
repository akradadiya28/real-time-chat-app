import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const VideoCallButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        console.log("selectedUser", user);

        if (user?._id) {
            // Update the Redux store with the selected user ID
            dispatch(setSelectedUser(user._id));
            // Navigate to the video call page
            navigate(`/video-call/${user._id}`);
        } else {
            console.error("User ID not found");
        }
    };

    return (
        <button
            onClick={submitHandler}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
                <path d="M17 10.5V6.75A2.75 2.75 0 0 0 14.25 4H5.75A2.75 2.75 0 0 0 3 6.75v10.5A2.75 2.75 0 0 0 5.75 20h8.5A2.75 2.75 0 0 0 17 17.25V13.5l4 3v-9l-4 3z" />
            </svg>
            <span>Video Call</span>
        </button>
    );
};

export default VideoCallButton;
