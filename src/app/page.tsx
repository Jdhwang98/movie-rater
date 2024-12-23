import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full bg-gradient-to-b from-black via-black to-gray-800 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center max-w-md mx-auto px-4 py-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Welcome To Movie Rater!</h2>
        <p className="text-gray-400 mb-8">Sign in to your account and start exploring.</p>

        <Link href={`/login`}>
          <button className="bg-yellow-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300 w-full text-center mb-4">
            LOGIN
          </button>
        </Link>

        <Link href={`/register`}>
          <button className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300 w-full text-center mb-4">
            REGISTER
          </button>
        </Link>

        <Link href={`/home`}>
          <button className="bg-gray-700 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300 w-full text-center">
            Continue Without Registering
          </button>
        </Link>
      </div>
    </div>
  );
}
