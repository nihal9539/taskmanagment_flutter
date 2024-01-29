
import { createUserWithEmailAndPassword, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';


export default function Signup() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        
        password: "",
        email: "",
    })

    const handledata = () => {
        console.log("hii");
    }


    // const first = () => {
    //     sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //         .then(() => {
    //             // The link was successfully sent. Inform the user.
    //             // Save the email locally so you don't need to ask the user for it again
    //             // if they open the link on the same device.
    //             window.localStorage.setItem('emailForSignIn', email);
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // ...
    //         });

    // }

    // const second = ()=>{
    //     if (isSignInWithEmailLink(auth, window.location.href)) {
    //         // Additional state parameters can also be passed via URL.
    //         // This can be used to continue the user's intended action before triggering
    //         // the sign-in operation.
    //         // Get the email if available. This should be available if the user completes
    //         // the flow on the same device where they started it.
    //         let email = window.localStorage.getItem('emailForSignIn');
    //         if (!email) {
    //           // User opened the link on a different device. To prevent session fixation
    //           // attacks, ask the user to provide the associated email again. For example:
    //           email = window.prompt('Please provide your email for confirmation');
    //         }
    //         // The client SDK will parse the code from the link for you.
    //         signInWithEmailLink(auth, email, window.location.href)
    //           .then((result) => {
    //             // Clear email from storage.
    //             window.localStorage.removeItem('emailForSignIn');
    //             // You can access the new user via result.user
    //             // Additional user info profile not available via:
    //             // result.additionalUserInfo.profile == null
    //             // You can check if the user is new or existing:
    //             // result.additionalUserInfo.isNewUser
    //           })
    //           .catch((error) => {
    //             // Some error occurred, you can inspect the code: error.code
    //             // Common errors could be invalid email and invalid or expired OTPs.
    //           });
    //       }
    // }
    const onSubmit = async (e) => {
        e.preventDefault()
       
        await createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user.uid);
              localStorage.setItem('user',user.uid)
              navigate("/")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
   
     
      }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center  uppercase">
                    Sign up
                </h1>
                <form className="mt-6" onSubmit={onSubmit}>
                    {/* <div className="mb-2">
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
                    </div> */}
                    <div className="mb-2">
                        <label

                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
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



                <div onClick={() => navigate('/')} className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}