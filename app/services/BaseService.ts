import axios from 'axios'
import { appConfig } from '../configs/app.config'

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials: true,
    },
})

BaseService.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

BaseService.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const { response } = error

        if (response) {
            if (response.status === 500) {
                return Promise.reject({
                    ...error,
                    message: 'Đã có lỗi xảy ra phía server!',
                    response: {
                        ...response,
                        message: 'Đã có lỗi xảy ra phía server!',
                    },
                })
            } else {
                return Promise.reject(response?.data)
            }
        }

        return Promise.reject(error)
    },
)

export default BaseService
