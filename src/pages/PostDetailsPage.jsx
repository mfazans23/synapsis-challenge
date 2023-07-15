import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContext } from '../context/PostContext'
import CommentItem from '../components/CommentItem'
import Spinner from '../components/Spinner'
import { UserContext } from '../context/UserContext'

const PostDetailsPage = () => {
  const navigate = useNavigate()

  const { postId } = useParams()
  const { myDetail } = useContext(UserContext)
  const {
    postDetail,
    loading,
    resetPostDetail,
    getPostDetail,
    createNewComment,
  } = useContext(PostContext)

  const [comment, setComment] = useState('')
  const [isCommented, setIsCommented] = useState(false)

  const handleFormSubmit = async (e) => {
    if (myDetail) {
      e.preventDefault()
      await createNewComment(postId, {
        name: myDetail.name,
        email: myDetail.email,
        body: comment,
      })
      setComment('')
      setIsCommented(true)
    } else {
      navigate('/create-account')
    }
  }

  useEffect(() => {
    getPostDetail(postId) // Fetch the post details when the component mounts

    return resetPostDetail
  }, [postId])

  useEffect(() => {
    if (postDetail && postDetail.comments.length > 0) {
      const hasCommented = postDetail.comments.some(
        (comment) => comment.name === myDetail?.name
      )
      setIsCommented(hasCommented)
    }
  }, [postDetail])

  return (
    <div className='container mx-auto mt-8 p-4 md:p-0'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {postDetail ? (
            <div className='bg-white rounded mb-12'>
              <h3 className='text-3xl font-bold mb-2'>{postDetail.title}</h3>
              <p className='text-gray-500 my-4'>Author: {postDetail.user_id}</p>
              <p className='md:w-2/3 text-xl text-justify'>{postDetail.body}</p>
            </div>
          ) : (
            <p>Post not found</p>
          )}
          <h3 className='text-xl font-bold mb-2'>Comments</h3>
          <form
            onSubmit={handleFormSubmit}
            className={isCommented ? 'disabled-form' : ''}
          >
            <div className='flex flex-col items-start my-6'>
              <textarea
                className={`w-96 h-20 p-2 border ${
                  isCommented
                    ? 'border-gray-300 bg-gray-200'
                    : 'border-gray-300'
                } rounded resize-none focus:outline-none`}
                placeholder='Write your comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isCommented}
              ></textarea>
              <button
                type='submit'
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
                  isCommented ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isCommented}
              >
                Add Comment
              </button>
            </div>
          </form>
          {postDetail && postDetail.comments.length > 0 ? (
            postDetail.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <p>No comments available</p>
          )}
        </>
      )}
    </div>
  )
}

export default PostDetailsPage
