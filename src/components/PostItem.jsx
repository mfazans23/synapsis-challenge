import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({ post }) => {
  return (
    <div
      key={post?.id}
      className='bg-white border border border-slate-200 rounded p-4 mb-4'
    >
      <h3 className='text-xl font-bold mb-2'>{post?.title}</h3>
      <p className='mb-2'>{post?.body.substr(0, 100)}...</p>
      <p className='text-gray-500'>Author: {post?.user_id}</p>
      <Link
        to={`/post/${post?.id}`}
        className='text-blue-500 hover:text-blue-700 font-bold'
      >
        See Details
      </Link>
    </div>
  )
}

export default PostItem
