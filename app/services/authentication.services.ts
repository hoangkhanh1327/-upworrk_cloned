import { appConfig } from '@/app/configs/app.config'
import ApiService from './ApiService'

interface ILoginParams {
    username: string,
    password: string
}

export const login  = async (params: ILoginParams) => {
    return ApiService.post(`${appConfig.apiUrl}/login`, {
        email: params.username,
        passwprd: params.password
    })
}