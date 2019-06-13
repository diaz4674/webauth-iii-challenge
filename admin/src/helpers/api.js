import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

instance.interceptors.request.use(
    (config) => {
        config.headers.authorization = localStorage.getItem('token')
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance