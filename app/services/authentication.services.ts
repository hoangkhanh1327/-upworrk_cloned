import { appConfig } from '@/app/configs/app.config';
import ApiService from './ApiService';
import { User, ClientInfo } from '../types/authentication.types';
import { CommonResponse } from '../types/common.types';

interface ILoginParams {
    email: string;
    password: string;
}

type ILoginReponse = CommonResponse & {
    data: {
        user: User;
        access_token: string;
        token_type: string;
        expires_in: number;
        user_type: 'freelancer' | 'client';
    };
};

const login = async (params: ILoginParams) => {
    return ApiService.post<ILoginReponse>(`${appConfig.apiUrl}/login`, {
        userName: params.email,
        password: params.password,
    });
};

type ISignUpRequest = {
    [key: string]: string | number
}

type ISIgnUpResponse = CommonResponse & {
    data: any
}

const signup = async (params: ISignUpRequest) => {
    return ApiService.post<ISIgnUpResponse>(`${appConfig.apiUrl}/register`, params)
}

type IGetUserInfoResponse = CommonResponse & {
    data: ClientInfo;
};

const getUserInfo = async () => {
    return ApiService.get<IGetUserInfoResponse>(`/client/info`);
};

type IGetFreelancerInfoResponse = CommonResponse & {
    data: ClientInfo;
};
const getFreelancerInfo = async () => {
    return ApiService.get<IGetFreelancerInfoResponse>(`/freelancer/info`);
};

export const loginServices = {
    login,
    signup,
    getUserInfo,
    getFreelancerInfo
};
