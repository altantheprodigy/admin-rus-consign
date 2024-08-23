import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register} from "../../../Api/AuthenticationApi/RegisterApi.jsx";

function RegisterAdminPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To display any errors
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await register(email, password);
            if (response.status) {
                // Registration successful, navigate to the login page
                navigate("/");
            } else {
                // Handle the error message if registration fails
                setError(response.message || "Registration failed");
            }
        } catch (e) {
            setError("An error occurred during registration. Please try again.");
            console.error("Error during registration:", e);
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
                    Register Admin
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleRegister} className="space-y-6">
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

                    {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error if any */}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#FF3D3D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FF3D3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Sudah punya akun?{' '}
                    <a href="/" className="font-semibold leading-6 text-[#FF3D3D] hover:text-[#FF3D3D]">
                        Login Sekarang!
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterAdminPage;
