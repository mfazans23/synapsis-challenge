import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { PostContext } from '../context/PostContext'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProfilePage = () => {
  const navigate = useNavigate()

  const { myDetail, updateMyProfile, deleteUserAccount } =
    useContext(UserContext)
  const { myPosts, getMyPosts, loading } = useContext(PostContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await updateMyProfile(myDetail.id, { name, email, gender })
    toast.success('Your profile updated succesfully')
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure to delete your account?')) {
      await deleteUserAccount(myDetail.id)
      toast.success('Your profile deleted succesfully')
      navigate('/')
    }
  }

  useEffect(() => {
    if (!myDetail || !myDetail.id) {
      navigate('/create-account')
    } else {
      setName(myDetail.name)
      setEmail(myDetail.email)
      setGender(myDetail.gender)
    }
  }, [myDetail, navigate])

  useEffect(() => {
    getMyPosts(myDetail?.id)
  }, [myDetail])

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Profile</h2>

      <div className='md:flex flex-row'>
        <div className='bg-white rounded mb-4'>
          <h3 className='text-xl font-bold mb-2'>Update Account</h3>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block font-medium'>
                Name
              </label>
              <input
                type='text'
                id='name'
                className='border border-gray-300 rounded p-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='email' className='block font-medium'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='border border-gray-300 rounded p-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='gender' className='block font-medium'>
                Gender
              </label>
              <select
                id='gender'
                className='border border-gray-300 rounded p-2'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>

            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Update Account
            </button>
          </form>
          <button
            onClick={handleDeleteAccount}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded'
          >
            Delete Account
          </button>
        </div>
        <div className='md:w-2/3 md:ms-auto'>
          <div>
            <h3 className='text-xl font-bold mb-4'>My Posts</h3>
            <div className='my-4'>
              <button
                onClick={() => navigate('/create-post')}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Create New Post
              </button>
            </div>
            {loading ? (
              <Spinner />
            ) : myPosts?.length > 0 ? (
              myPosts.map((post) => <PostItem key={post?.id} post={post} />)
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
