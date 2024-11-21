
import React from 'react'
import { userAgent } from '../../../node_modules/next/server'
import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';


const res = await fetch('http://localhost:3000/user.json');
const data = await res.json();




const profile = (  ) => {
  return (
    <div className='grid lg:grid-cols-2  '>
      <ul>
        <li>

        <div className='bg-gray-600  rounded m-5 justify-items-center p-5  '>
        <h1 className='text-3xl py-10 px-5 font-sans center' >{data.Name}</h1>
        <img src="avatar_image.jpg" className = 'max-h-50'alt="yo" />
        <p className='p-5'>{data.Description}</p>
        </div>
        <div className='bg-gray-600 flex-nowrap  rounded m-5 justify-items-center py-10'>
          <h1 className='text-3xl py-10 px-5 font-sans center'>Friends</h1>
          <div  className='bg-gray-600'>
          <ul>
            <li>
              <a href="#">Mordecai</a>
            </li>
            <li>
              <a href="#">Rigby</a>
            </li>
          </ul>
          </div>
        </div>

            <div className='bg-gray-600 flex-nowrap  rounded m-5 justify-items-center py-10'>
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Ratings</h1>

            {data.Ratings.map((rating,index) => (
            <div key = {index} className='bg-gray-800 rounded m-10 p-20 max-w-80'>
              <h1><strong>{rating.name}</strong></h1>
              <h2>Personal Rating: {rating.rating}/10</h2>
              <h2>Overall Rating: {rating.overall_rating}%</h2>
            </div>

            ))}
            </div></li>
      </ul>        

        <div>

            <div className='bg-gray-600 flex-nowrap  rounded m-5 justify-items-center py-10'>
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Lists</h1>

            {data.Lists.map((list, index) => (
            <div key={index} className ="bg-red-600 rounded m-10 p-20 justify-items-center">
              <h3 className='text-xl'><strong>{list.name}</strong></h3>
              {/* <ul>

              {list.Movie_ids.map(movie,index) => (
                <li key={index}> {movie}</li>
              ))}
              </ul> */}

              <p>[
                {list.Movie_ids.join(", ")}
              ]
                </p>
              <br></br>
            </div>
      ))}
            </div>

            <div className='bg-gray-600 flex-nowrap  rounded m-5 justify-items-center py-10'>
          
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Groups</h1>

            {data.Groups.map((group,index) => (
              <div key={index} className = "bg-blue-600 rounded m-10 p-20 max-w-80">
                {/* <h3>Group ID: {group.id}</h3> */}
                <img src= {group.img_address} alt="default pic" />
                {/* <img src="https://i.redd.it/r31x3xs49jhb1.jpg" alt="" /> */}
                <h1><strong>{group.group_name}</strong></h1>
                <h2>Members: {group.num_members}</h2>
              </div>
            ))}
            </div>

        </div>

    </div>
  )
}

export default profile