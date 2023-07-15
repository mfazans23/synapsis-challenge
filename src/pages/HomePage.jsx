import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../context/PostContext'
import PostItem from '../components/PostItem'
import { css } from '@emotion/react'
import { RingLoader } from 'react-spinners'

const HomePage = () => {
  const { posts, loading, fetchPostsData, createPost } = useContext(PostContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6) // Number of posts to display per page

  // CSS for the spinner
  const spinnerCss = css`
    display: block;
    margin: 0 auto;
  `

  useEffect(() => {
    fetchPostsData(currentPage) // Fetch the posts when the component mounts or currentPage changes
  }, [currentPage])

  // Calculate pagination values
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div className='container mx-auto mt-8'>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <RingLoader color='#4F46E5' size={80} css={spinnerCss} />
          </div>
        ) : (
          <>
            {currentPosts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {currentPosts.map((post) => (
                    <PostItem key={post?.id} post={post} />
                  ))}
                </div>

                <div className='flex justify-center my-4'>
                  {/* Generate pagination buttons */}
                  {Array.from({
                    length: Math.ceil(posts.length / postsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index + 1}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 ${
                        index + 1 === currentPage ? 'bg-blue-700' : ''
                      }`}
                      onClick={() => handlePagination(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
