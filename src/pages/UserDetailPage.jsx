import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { PostContext } from '../context/PostContext'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'

const UserDetailPage = () => {
  const { userId } = useParams()
  const {
    getUserById,
    userDetail,
    loading: userLoading,
  } = useContext(UserContext)
  const {
    getPostsByUser,
    postsByUser,
    loading: postsLoading,
  } = useContext(PostContext)

  useEffect(() => {
    getUserById(userId)
    getPostsByUser(userId)
  }, [userId])

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>User Details</h2>

      {userLoading ? (
        <Spinner />
      ) : (
        <div>
          <h3 className='text-xl font-bold mb-2'>{userDetail?.name}</h3>
          <p>Email: {userDetail?.email}</p>
          <p>Gender: {userDetail?.gender}</p>
          <p>Status: {userDetail?.status}</p>
        </div>
      )}

      <h3 className='text-xl font-bold mt-8 mb-4'>
        Posts by {userDetail?.name}
      </h3>

      {postsLoading ? (
        <Spinner />
      ) : (
        <div>
          {postsByUser?.length > 0 ? (
            postsByUser.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDetailPage
