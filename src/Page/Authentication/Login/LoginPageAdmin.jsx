import React, { useState } from "react";
import {login} from "../../../Api/AuthenticationApi/LoginApi.jsx";

function LoginPageAdmin() {
    const token = localStorage.getItem('authToken');
    console.log("token user adlah", token)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.status) {
                console.log("Token:", response.token);
                // Save the token in localStorage
                localStorage.setItem('authToken', response.token);
                // Redirect to the dashboard or wherever you want
                window.location.href = '/user'; // Update this with your dashboard route
            } else {
                setError(response.message);
            }
        } catch (e) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Rus Consign Admin"
                    src="/logo.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login Ke Akun Admin Kamu
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#FF3D3D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FF3D3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/*<p className="mt-10 text-center text-sm text-gray-500">*/}
                {/*    Belum ada akun?{' '}*/}
                {/*    <a href="/register" className="font-semibold leading-6 text-[#FF3D3D] hover:text-[#FF3D3D]">*/}
                {/*        Register Sekarang!*/}
                {/*    </a>*/}
                {/*</p>*/}
            </div>
        </div>
    );
}

export default LoginPageAdmin;
