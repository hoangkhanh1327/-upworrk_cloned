import { ClientPostList } from '../types/client.types';
import { CommonResponse } from '../types/common.types';
import ApiService from './ApiService';

type GetClientPostsRequest = {
    page: number;
    num: number;
    status: number;
};

type GetClientPostsResponse =  CommonResponse & {
    data: {
        data: ClientPostList
    }
}
const getPosts = async (params: GetClientPostsRequest) => {
    return ApiService.get<GetClientPostsResponse>(`/client/job/my-jobs`, params);
};

export const clientServices = {
    getPosts,
};
