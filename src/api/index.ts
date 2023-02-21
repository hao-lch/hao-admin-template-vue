import axios from 'axios'
import {getToken} from "../utils/cookie"

const axiosObj = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

axiosObj.interceptors.request.use((config) => {
    let token = getToken()
    if(token) {
        config.headers[""] = token
    }
    return config
}, (err) => { 
    return err
})

axiosObj.interceptors.response.use((config) => {
    return config
}, (err) => {
    return err
})

export default axiosObj