import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateAccountPage = () => {
  const navigate = useNavigate()
  const { createAccount, myDetail } = useContext(UserContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [errors, setErrors] = useState({})

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Perform form validation
    const validationErrors = {}
    if (!name.trim()) {
      validationErrors.name = 'Name is required'
    }
    if (!email.trim()) {
      validationErrors.email = 'Email is required'
    }
    if (!gender.trim()) {
      validationErrors.gender = 'Gender is required'
    }

    // If there are validation errors, set them in state and stop form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Call the createAccount function
    createAccount({ name, email, gender, status: 'active' })
      .then(() => {
        // Display success toast and redirect to home page
        toast.success('User successfully created!', {
          onClose: () => navigate('/'),
        })
      })
      .catch((error) => {
        // Handle error, display error toast if necessary
        console.error('Error creating account:', error)
        toast.error('The user with the same email already exist.')
      })
  }

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Create Account</h2>

      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className='mb-4'>
          <label htmlFor='name' className='block font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            className={`border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded p-2`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block font-medium'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className={`border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded p-2`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='gender' className='block font-medium'>
            Gender
          </label>
          <select
            id='gender'
            className={`border ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            } rounded p-2`}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.gender && (
            <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CreateAccountPage
