import React from 'react'

const profile = () => {
  return (
    <div className='grid-flow-col-dense grid-cols-2'>
        <div className='bg-gray-600 flex-nowrap max-w-96 rounded m-5 justify-items-center py-10'>
        <h1 className='text-3xl py-10 px-5 font-sans center' >Name</h1>
        <img src="avatar_image.jpg" alt="yo" />
        <p className='p-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque vitae nam odio culpa, natus animi vel est earum nisi quaerat consectetur autem porro suscipit quae!</p>
        </div>
        <ul>
            <li>
            <div className='bg-gray-600 flex-nowrap max-w-96 rounded m-5 justify-items-center py-10'>
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Lists</h1>
            </div>
            </li>

            <li>
            <div className='bg-gray-600 flex-nowrap max-w-96 rounded m-5 justify-items-center py-10'>
            
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Groups</h1>
            </div>
            </li>
            
            <li>
            <div className='bg-gray-600 flex-nowrap max-w-96 rounded m-5 justify-items-center py-10'>
            <h1 className='text-3xl py-10 px-5 font-sans center' >Your Ratings</h1>
            </div></li>
        </ul>
    </div>
  )
}

export default profile