import React, { createContext, useState } from 'react'
import axiosInstance from '../utils/axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const myDetailLocalStorage = localStorage.getItem('myDetail')
    ? JSON.parse(localStorage.getItem('myDetail'))
    : null

  const [searchResults, setSearchResults] = useState([])
  const [myDetail, setMyDetail] = useState(myDetailLocalStorage)
  const [userDetail, setUserDetail] = useState(null)
  const [loading, setLoading] = useState(false)

  const logout = () => {
    localStorage.removeItem('userId')
    setMyDetail(null)
  }

  const createAccount = async (userData) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.post('/users', userData)
      setMyDetail(data)
      setLoading(false)
      if (data) localStorage.setItem('myDetail', JSON.stringify(data))
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updateMyProfile = async (userId, userData) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.put(`/users/${userId}`, userData)
      setMyDetail(data)
      setLoading(false)
      localStorage.setItem('myDetail', JSON.stringify(data))
    } catch (error) {
      console.error(`Error updating user ID ${userId}:`, error)
      throw error
    }
  }

  const deleteUserAccount = async (userId) => {
    try {
      setLoading(true)
      await axiosInstance.delete(`/users/${userId}`)
      setMyDetail(null)
      setLoading(false)
      localStorage.removeItem('myDetail')
    } catch (error) {
      console.error(`Error deleting user ID ${userId}:`, error)
      throw error
    }
  }

  const searchUsers = async (query) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(`/users?name=${query}`)
      setSearchResults(data)
      setLoading(false)
    } catch (error) {
      console.error('Error searching users:', error)
      throw error
    }
  }

  const clearSearchResults = () => {
    setLoading(true)
    setSearchResults([])
  }

  const getUserById = async (userId) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(`/users/${userId}`)
      setUserDetail(data)
      setLoading(false)
    } catch (error) {
      console.error(`Error fetching user ID ${userId}:`, error)
      throw error
    }
  }

  return (
    <UserContext.Provider
      value={{
        searchResults,
        myDetail,
        userDetail,
        loading,
        createAccount,
        updateMyProfile,
        deleteUserAccount,
        searchUsers,
        clearSearchResults,
        logout,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
