import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    // baseURL: 'http://localhost:4100',
    withCredentials: true
})