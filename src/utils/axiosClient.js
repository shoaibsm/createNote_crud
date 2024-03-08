import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: "http://localhost:4100",
    withCredentials: true
})