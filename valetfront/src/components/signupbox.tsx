'use client'

import { login , register , setEmail , setPassword , setConfirmPassword , setFirstName , setLastName } from '@/redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import { checkAuthAPI , registerAPI } from '@/functions/auth';
import { useState , useEffect } from 'react';

export default function SignupBox() {

    const dispatch = useDispatch<AppDispatch>();
    const auth = useAppSelector((state) => state.authReducer.value);

    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setEmail(e.target.value.toString()));
    }

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setPassword(e.target.value.toString()));
    }

    const handleConfirmPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setConfirmPassword(e.target.value.toString()));
    }

    const handleFirstNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setFirstName(e.target.value.toString()));
    }

    const handleLastNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setLastName(e.target.value.toString()));
    }

    // useEffect(() => {
    //     checkAuthAPI().then((res) => {
    //         if (res) {
    //             dispatch(login());
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     if (auth.isLogged) {
    //         window.location.href = '/?auth=1';
    //     }
    // }, [auth.isLogged]);

    useEffect(() => {
        if (auth.isRegistered) {
            window.location.href = '/login';
        }
    }, [auth.isRegistered]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (auth.password !== auth.confirmpassword) {
            alert("Passwords don't match");
            return;
        }
        registerAPI(auth.email, auth.password, auth.firstName, auth.lastName).then((res) => {
            if (res) {
                dispatch(register());
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <p className="flex items-center mb-6 text-2xl font-bold text-black">
                ValetNote
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" onChange={handleFirstNameChange} required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" onChange={handleLastNameChange} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleEmailChange} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePasswordChange} required />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleConfirmPasswordChange} required />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit} >Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}