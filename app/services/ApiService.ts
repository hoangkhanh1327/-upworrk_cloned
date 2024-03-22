import BaseService from './BaseService';
import type { AxiosResponse, AxiosError } from 'axios';

const ApiService = {
    get<Response>(url: string, params?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.get<Response>(url, {
                params: { ...params },
                headers: { ...configs },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    post<Response>(url: string, params?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.post<Response>(url, params, {
                headers: { ...configs },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    put<Response>(url: string, params?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.put<Response>(url, params, {
                headers: { ...configs },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    patch<Response>(url: string, params?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.patch<Response>(url, params, {
                headers: { ...configs },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    _delete<Response>(url: string, params?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.delete(url, {
                data: params,
                headers: { ...configs },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    postFormData<Response>(url: string, data?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.post(url, data, {
                ...configs,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
    putFormData<Response>(url: string, data?: any, configs?: any) {
        return new Promise<Response>((resolve, reject) => {
            BaseService.put(url, data, {
                ...configs,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response: AxiosResponse<Response>) => {
                    resolve(response as Response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
};

export default ApiService;
