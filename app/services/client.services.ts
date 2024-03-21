import ApiService from './ApiService';

type GetClientPostsRequest = {
    page: number;
    num: number;
    status: number;
};
const getPosts = async (params: GetClientPostsRequest) => {
    return ApiService.get(`/client/job/my-jobs`, params);
};

export const clientServices = {
    getPosts,
};
