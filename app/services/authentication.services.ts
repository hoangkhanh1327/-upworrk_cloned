import { appConfig } from '@/app/configs/app.config';
import ApiService from './ApiService';
import { User, UserInfo } from '../@types/authentication.types';
import { CommonResponse } from '../@types/common.types';

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
        user_type: string;
    };
};

const login = async (params: ILoginParams) => {
    return ApiService.post<ILoginReponse>(`${appConfig.apiUrl}/login`, {
        userName: params.email,
        password: params.password,
    });
};

type IGetUserInfoResponse = CommonResponse & {
    data: UserInfo;
};

const getUserInfo = async () => {
    return ApiService.get<IGetUserInfoResponse>(`/client/info`);
};
export const loginServices = {
    login,
    getUserInfo,
};
