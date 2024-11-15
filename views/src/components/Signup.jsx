import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUp() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: ""
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, 'Full Name must be at least 2 characters')
                .required('Full Name is required'),
            username: Yup.string()
                .min(2, 'Username must be at least 2 characters')
                .required('Username is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm Password is required'),
            gender: Yup.string()
                .oneOf(['male', 'female'], 'Please select a gender')
                .required('Gender is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post("http://localhost:8001/api/user/register", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
                // console.log("response", response.data);

                toast.success(response.data.message);
                navigate("/login");

            } catch (error) {
                toast.error("Signup failed. Please try again.");
                console.error("signup error", error);
            }
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded outline-none"
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            {...formik.getFieldProps('fullName')}
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                        ) : null}
                    </div>

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

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded outline-none"
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
                        <select
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded outline-none"
                            id="gender"
                            {...formik.getFieldProps('gender')}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                        ) : null}
                    </div>

                    <p className="text-center text-gray-600">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>

                    <div className="flex justify-center text-center mt-4">
                        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
