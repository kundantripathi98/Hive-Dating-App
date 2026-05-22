"use client";
import { useState } from "react";
import {useForm, SubmitHandler} from "react-hook-form";


interface IFormInput {
    email: string;
    password: string;
    confirmPassword?: string;
}

export default function AuthPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
           <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Hive
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isSignUp ? "Create Your Account" : "Sign in to your account"}
          </p>

            <form onSubmit={handleSubmit((data) => console.log(data))} className="mt-8 space-y-6">
                <label>Email</label>

                <input type="email" {...register("email", { required: "Email is required" })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <label>Password</label>
                
                <input type="password" {...register("password", { required: "Password is required" })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
                    {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                </button>

            </form>
        
        </div>
        </div>
        </div>
    )
}