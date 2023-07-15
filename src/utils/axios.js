import axios from 'axios'

const API_BASE_URL = 'https://gorest.co.in/public/v2/'
const ACCESS_TOKEN =
  'c558cf68659563e895654aee628087962a214e330ad1c6a461fbb6031370cb10'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
