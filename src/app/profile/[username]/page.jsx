'use client';
import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import connectToDatabase from '../../../lib/db'
import Comment from '../../../lib/modals/Comment'

export default function Profile({params}){
    const userName = params.username

    // call an api endpoint to get a list of comments related to this user

    // display each comment (loop through)
    
    return (
        <>
        <h1>

            Welcome, {userName ? userName : 'Loading . . .'}
        </h1>

        <h2> PREVIOUS REVIEWS BY {userName}</h2>

        </>
    )
}