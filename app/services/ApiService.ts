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
                .catch((error: any) => {
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
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
                .catch((error: any) => {
                    //reject(error);
                    console.log('==>',error);
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
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
                .catch((error: any) => {
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
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
                .catch((error: any) => {
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
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
                .catch((error: any) => {
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
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
                .catch((error: any) => {
                    if (error.status == 422) {
                        const lstKey = Object.keys(error.data);
                        resolve({ result: -1, message: error.data[lstKey[0]], data: null, status: -1 }as Response);
                    }
                    resolve({ result: -1, message: 'Có lỗi khi thực hiện', data: null, status: -1 }as Response);
                });
        });
    },
};

export default ApiService;
