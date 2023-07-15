import React, { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PostContext } from '../context/PostContext'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'

const SearchResultPage = () => {
  const { keyword } = useParams()
  const {
    searchPosts,
    searchResults: postResults,
    clearSearchResults: clearPostResults,
    loading: postLoading,
  } = useContext(PostContext)
  const {
    searchUsers,
    searchResults: userResults,
    clearSearchResults: clearUserResults,
    loading: userLoading,
  } = useContext(UserContext)

  useEffect(() => {
    // Make API calls to fetch post and user search results
    searchPosts(keyword)
    searchUsers(keyword)

    return () => {
      clearPostResults()
      clearUserResults()
    }
  }, [keyword])

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>
        Search Results For '{keyword}'
      </h2>

      <div className='grid grid-cols-2 gap-4'>
        {/* Display post search results */}
        <div>
          <h3 className='text-xl font-bold mb-2'>Posts</h3>
          {postLoading ? (
            <Spinner />
          ) : postResults?.length > 0 ? (
            postResults.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <p>No post results found</p>
          )}
        </div>

        {/* Display user search results */}
        <div>
          <h3 className='text-xl font-bold mb-2'>Users</h3>
          {userLoading ? (
            <Spinner />
          ) : userResults?.length > 0 ? (
            userResults.map((user) => (
              <div key={user.id} className='border border-gray-300 p-4 mb-4'>
                <h4 className='font-bold text-lg'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </h4>
                <p className='text-gray-500 mb-2'>{user.email}</p>
                <p className='mb-2'>
                  Gender:{' '}
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </p>
                <p className='mb-2'>Status: {user.status}</p>
                <Link
                  to={`/users/${user.id}`}
                  className='text-blue-500 hover:text-blue-700 font-bold'
                >
                  See Details
                </Link>
              </div>
            ))
          ) : (
            <p>No user results found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResultPage
