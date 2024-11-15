import { createSlice } from "@reduxjs/toolkit";

const initialAuthUser = JSON.parse(localStorage.getItem("authUser"));

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: initialAuthUser || null,
        otherUsers: null,
        selectedUser: null,
        onlineUsers: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            localStorage.setItem("authUser", JSON.stringify(action.payload));
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearAuthUser: (state) => {
            state.authUser = null;
            localStorage.removeItem("authUser");
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, clearAuthUser, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;
