import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { PostContext } from '../context/PostContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreatePostPage = () => {
  const { myPosts, createNewPost, fetchPostsData } = useContext(PostContext)
  const { myDetail } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const postData = {
      title,
      body,
      user_id: myDetail.id,
    }

    await createNewPost(postData)
    toast.success('Your post created succesfully')

    // Clear the input fields after creating the post
    setTitle('')
    setBody('')
  }

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Create Post</h2>

      <form onSubmit={handleFormSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium'>
            Title
          </label>
          <input
            type='text'
            id='title'
            className='border border-gray-300 rounded p-2 outline-none'
            placeholder='Write the title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='body' className='block font-medium'>
            Body
          </label>
          <textarea
            id='body'
            className='w-96 h-30 border border-gray-300 rounded p-2 resize-none outline-none'
            rows='4'
            placeholder='Write the body...'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePostPage
