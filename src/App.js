import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import CreateAccountPage from './pages/CreateAccountPage'
import PostDetailsPage from './pages/PostDetailsPage'
import ProfilePage from './pages/ProfilePage'
import CreatePostPage from './pages/CreatePostPage'
import SearchResultPage from './pages/SearchPage'
import UserDetailPage from './pages/UserDetailPage'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <UserProvider>
        <PostProvider>
          <div className='flex flex-col min-h-screen'>
            <Navigation />
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/create-account' element={<CreateAccountPage />} />
              <Route path='/post/:postId' element={<PostDetailsPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/create-post' element={<CreatePostPage />} />
              <Route path='/search/:keyword' element={<SearchResultPage />} />
              <Route path='/users/:userId' element={<UserDetailPage />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </PostProvider>
      </UserProvider>
    </Router>
  )
}

export default App
