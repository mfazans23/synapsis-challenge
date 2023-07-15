import React from 'react'

const CommentItem = ({ comment }) => {
  return (
    <div className='w-full md:w-1/2 lg:w-1/4 rounded px-4 mb-4'>
      <p className='mb-2 font-medium'>{comment.name}</p>
      <p className='bg-slate-200 p-2 rounded'>"{comment.body}"</p>
    </div>
  )
}

export default CommentItem
