'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'


// export default function ProfilePage({ params }: { params: { userId: string } }) {
//   const { userId } = params;

//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`/api/profile/${userId}`);
//         if (!res.ok) throw new Error('Failed to fetch profile');
//         const data = await res.json();
//         setProfile(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userId]);

//   if (loading) return <p>Loading profile...</p>;
//   if (!profile) return <p>User not found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Welcome, {profile.name}!</h1>
//       <p className="text-gray-600">@{profile.username}</p>
//       <p className="mt-4">{profile.bio || 'No bio available.'}</p>
//     </div>
//   );
// }


// This one is the default 100$

// export default function Profile({
//     params,
// }: {
//     params : {
//         userId : string;
//         userName : string;
//     };
// }) {

//     useEffect(() => {
//         const fetchUserName = async () => {
//             const userName = await fetch(`/api/profile/${params.userId}`);
//             const name = await userName.json();
//         };
//     })

//     return (
//         <h1>
//             Welcome, {params.userId} 
//         </h1>
//     )
// }

export default function Profile(){
    const userName = "jose"
    // const [userName, setUserName] = useState('');

    // useEffect(() => {
    //     const fetchUserName = async () => {
    //         const res = await fetch(`/api/profile/${userName}`);
    //         const data = await res.json();
    //         setUserName(data.name)
    //     };

    //     fetchUserName();
    // }, [params.userId]);

    return (
        <h1>
            Welcome, {userName ? userName : 'Loading . . .'} 
        </h1>
    )
}