import React, { createContext, useState } from 'react'
import axiosInstance from '../utils/axios'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [postDetail, setPostDetail] = useState(null)
  const [myPosts, setMyPosts] = useState([])
  const [postsByUser, setPostsByUser] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPostsData = async () => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(`/posts`)
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  const getPostDetail = async (postId) => {
    try {
      setLoading(true)
      const { data: postData } = await axiosInstance.get(`/posts/${postId}`)
      const { data: commentData } = await axiosInstance.get(
        `/posts/${postId}/comments`
      )
      const postDetail = {
        ...postData,
        comments: commentData,
      }
      setPostDetail(postDetail)
      setLoading(false)
    } catch (error) {
      console.error(`Error fetching post detail for post ID ${postId}:`, error)
      throw error
    }
  }

  const resetPostDetail = () => {
    setPostDetail(null)
  }

  const getMyPosts = async (userId) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(`/posts?user_id=${userId}`)
      setMyPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching your post:', error)
      throw error
    }
  }

  const createNewPost = async (postData) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.post('/posts', postData)
      setMyPosts([...myPosts, data])
      setLoading(false)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  const createNewComment = async (postId, commentData) => {
    try {
      setLoading(true)
      await axiosInstance.post(`/posts/${postId}/comments`, commentData)
      await getPostDetail(postId)
      setLoading(false)
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  }

  const searchPosts = async (query) => {
    try {
      setLoading(true)
      const { data: resultsByTitle } = await axiosInstance.get(
        `https://gorest.co.in/public/v2/posts?title=${query}`
      )
      const { data: resultsByBody } = await axiosInstance.get(
        `https://gorest.co.in/public/v2/posts?body=${query}`
      )

      const mergedResults = [...resultsByTitle, ...resultsByBody]

      // Remove duplicates based on post ID
      const uniqueResults = mergedResults.reduce((acc, post) => {
        if (!acc.some((p) => p.id === post.id)) {
          acc.push(post)
        }
        return acc
      }, [])

      setSearchResults(uniqueResults)
      setLoading(false)
    } catch (error) {
      console.error('Error searching posts:', error)
      throw error
    }
  }

  const clearSearchResults = () => {
    setLoading(true)
    setSearchResults([])
  }

  const getPostsByUser = async (userId) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(`/users/${userId}/posts`)
      setPostsByUser(data)
      setLoading(false)
      return data
    } catch (error) {
      console.error(`Error fetching posts by user ID ${userId}:`, error)
      throw error
    }
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        myPosts,
        postsByUser,
        postDetail,
        searchResults,
        loading,
        getMyPosts,
        resetPostDetail,
        fetchPostsData,
        getPostDetail,
        createNewPost,
        createNewComment,
        searchPosts,
        clearSearchResults,
        getPostsByUser,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
