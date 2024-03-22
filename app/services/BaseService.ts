import axios from 'axios';
import https from 'https';
import Cookies from 'js-cookie';
import { appConfig } from '../configs/app.config';

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials: true,
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

BaseService.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BaseService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const { response } = error;

        if (response) {
            if (response.status === 401) {
                Cookies.remove('token');
                Cookies.remove('account_type');
                window.location.replace('/');
            }
            if (response.status === 500) {
                return Promise.reject({
                    ...error,
                    message: 'Đã có lỗi xảy ra phía server!',
                    response: {
                        ...response,
                        message: 'Đã có lỗi xảy ra phía server!',
                    },
                });
            } else {
                return Promise.reject(response?.data);
            }
        }

        return Promise.reject(error);
    }
);

export default BaseService;
