import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let getConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            getConversation.messages.push(newMessage._id);
        }

        Promise.all([getConversation.save(), newMessage.save()]);

        //socket io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.log("sendMessage error", error);
        return res.status(500).json({ message: "sendMessage Error", error });
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        // console.log("receiverId", receiverId);
        // console.log("senderId", senderId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        // console.log("conversation", conversation.messages);
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log("get-messages error", error);
        return res.status(500).json({ message: "getMessages Error", error });
    }
}