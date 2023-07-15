import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navigation = () => {
  const navigate = useNavigate()
  const { myDetail, logout } = useContext(UserContext)
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`)
      setSearchKeyword('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className='bg-gray-800'>
      <div className='container mx-auto py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <NavLink
              to='/'
              exact
              activeClassName='text-white'
              className='text-gray-300 hover:text-white mr-4'
            >
              Home
            </NavLink>

            {myDetail && (
              <>
                <NavLink
                  to='/profile'
                  activeClassName='text-white'
                  className='text-gray-300 hover:text-white mr-4'
                >
                  Profile
                </NavLink>
                <NavLink
                  to='/create-post'
                  activeClassName='text-white'
                  className='text-gray-300 hover:text-white mr-4'
                >
                  Create Post
                </NavLink>
              </>
            )}
          </div>
          <div className='flex items-center'>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Search'
                className='bg-gray-700 text-white rounded p-2 mr-2'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Search
              </button>
            </form>
            {myDetail ? (
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4'
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/create-account')}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
