import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(2, 'Username must be at least 2 characters')
                .required('Username is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post("http://localhost:8001/api/user/login", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
                console.log("response", response.data);

                toast.success("Login successful");
                navigate("/");
                dispatch(setAuthUser(response.data));
                resetForm();
            } catch (error) {
                toast.error("Login failed. Please try again.");
                console.error("login error", error);
            }
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded outline-none"
                            type="text"
                            id="username"
                            placeholder="Username"
                            {...formik.getFieldProps('username')}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded outline-none"
                            type="password"
                            id="password"
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <p className="text-center text-gray-600">Don't have an account?
                        <Link className="text-blue-600" to="/signup">Signup</Link>
                    </p>

                    <div className="flex justify-center text-center mt-4">
                        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" type="submit">Login</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;
