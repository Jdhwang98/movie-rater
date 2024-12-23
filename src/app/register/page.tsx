'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/register', { name, email, password })
        router.push('/login')
    }


    return (
        <div className="w-full bg-gradient-to-b from-black via-black to-gray-800 min-h-screen flex flex-col justify-center items-center">
            <div className="text-center max-w-md mx-auto px-4 py-8 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold mb-6">Register</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setName(e.target.value)} //take value from input field and assign it to the name variable
                        className="w-full p-2 mb-4 rounded text-black" />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} //take value from input field and assign it to the name variable
                        className="w-full p-2 mb-4 rounded text-black" />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} //take value from input field and assign it to the name variable
                        className="w-full p-2 mb-4 rounded text-black" />
                    <button
                        className="w-full bg-yellow-400 text-black p-2 rounded font-bold hover:bg-yellow-500 mb-2">
                        Register
                    </button>
                </form>
                <Link href="/login">
                    <button className=" gap-y-6 w-full bg-gray-600 text-white p-2 rounded font-bold hover:bg-gray-700">
                        Go Back to Login
                    </button>
                </Link>
            </div>
        </div>
    );
}
