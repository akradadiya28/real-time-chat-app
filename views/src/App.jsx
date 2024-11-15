import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./components/SignUp"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import io from "socket.io-client"
import { setOnlineUsers } from "./redux/userSlice"
import { setSocket } from "./redux/socketSlice"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {

  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8001", {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      })
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser])

  return (
    <RouterProvider router={router} />
  )
}

export default App
