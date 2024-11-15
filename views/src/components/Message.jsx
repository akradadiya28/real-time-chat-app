import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Message({ message }) {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div>
            {/* Message History - Scrollable Area */}
            <div ref={scroll} className="flex-grow overflow-y-auto max-h-[calc(100vh-180px)] mb-4">
                <div className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"} p-3`}>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message?.senderId === authUser?._id ? "You" : selectedUser?.username}
                    </div>
                    <div className="chat-bubble">{message?.message}</div>
                </div>
            </div>
        </div>
    );
}

export default Message;
