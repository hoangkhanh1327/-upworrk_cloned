import { appConfig } from '@/app/configs/app.config';
import ApiService from './ApiService';
import {
    User,
    ClientInfo,
    FreelancerInfo,
} from '../types/authentication.types';
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
    [key: string]: string | number;
};

type ISIgnUpResponse = CommonResponse & {
    data: any;
};

const signup = async (params: ISignUpRequest) => {
    return ApiService.post<ISIgnUpResponse>(
        `${appConfig.apiUrl}/register`,
        params
    );
};

type IGetUserInfoResponse = CommonResponse & {
    data: ClientInfo;
};

const getUserInfo = async () => {
    return ApiService.get<IGetUserInfoResponse>(`/client/info`);
};

type IUpdateUserInfoRequest = Partial<
    ClientInfo & {
        avatar_url: File;
    }
>;

type IUpdateUserInfoReponse = CommonResponse & {
    data: ClientInfo;
};

const updateUserInfo = async (params: IUpdateUserInfoRequest) => {
    return ApiService.postFormData<IUpdateUserInfoReponse>(
        `/client/info/update`,
        params
    );
};

type IGetFreelancerInfoResponse = CommonResponse & {
    data: FreelancerInfo;
};
const getFreelancerInfo = async () => {
    return ApiService.get<IGetFreelancerInfoResponse>(`/freelancer/info`);
};

type IUpdateFreelancerInfoRequest = Partial<FreelancerInfo> & {
    avatar_url?: string;
    skills?: {
        skill_id: string | number;
        point: string | number;
    }[];
    username?: string;
    company_name?: string;
    last_name?: string;
    first_name?: string;
    avatar?: File;
};

type IUpdateFreelancerInfoReponse = CommonResponse & {
    data: ClientInfo;
};

const updateFreelancerInfo = async (params: IUpdateFreelancerInfoRequest) => {
    return ApiService.postFormData<IUpdateFreelancerInfoReponse>(
        `/freelancer/info/update`,
        params
    );
};

const verifyIdentify = async (params: { image: File }) => {
    return ApiService.postFormData<CommonResponse & { data: any }>(
        `/verify-citizen-identification-card`,
        params
    );
};

export const loginServices = {
    login,
    signup,
    getUserInfo,
    getFreelancerInfo,
    updateUserInfo,
    updateFreelancerInfo,
    verifyIdentify
};
