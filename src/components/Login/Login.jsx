
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = ('')
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-white  rounded-md shadow-xl shadow-gray-300 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center  uppercase">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={onLogin}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="mb-2">
                        <label

                            className="block text-sm font-semibold text-gray-800"
                        >
                            username
                        </label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label


                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md ">
                            Login
                        </button>
                    </div>
                </form>



                <NavLink to={'/signup'}>

                    <div to={'/signup'} className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Sign Up
                        </a>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}