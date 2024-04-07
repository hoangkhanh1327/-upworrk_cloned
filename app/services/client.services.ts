import { FreelancerPreviewInfo } from '../types/authentication.types';
import { ClientPostList, DetailClientPost } from '../types/client.types';
import { CommonResponse } from '../types/common.types';
import ApiService from './ApiService';

type GetClientPostsRequest = {
    page: number;
    num: number;
    status: number;
};

type GetClientPostsResponse = CommonResponse & {
    data: {
        data: ClientPostList;
        total: number;
        total_page: number;
    };
};
const getPosts = async (params: GetClientPostsRequest) => {
    return ApiService.get<GetClientPostsResponse>(
        `/client/job/my-jobs`,
        params
    );
};

type GetPostDetailRequest = string;

type GetPostDetailReponse = CommonResponse & {
    data: DetailClientPost;
};

const getPost = async (params: GetPostDetailRequest) => {
    return ApiService.get<GetPostDetailReponse>(`/job/${params}`);
};

type CreatePostRequest = any;

type CreatePostResponse = CommonResponse;

const createPost = async (params: CreatePostRequest) => {
    return ApiService.postFormData<CreatePostResponse>(
        `/client/job/create-job`,
        params
    );
};

type UpdatePostRequest = any;

type UpdatePostResponse = CommonResponse;

const updatePost = async (params: UpdatePostRequest) => {
    const { id, ...rest } = params;
    return ApiService.postFormData<UpdatePostResponse>(
        `/client/job/update-jobs/${id}`,
        rest
    );
};

type GetFreelancerInfoRequest = string;

type GetFreelancerInfoResponse = CommonResponse & {
    data: FreelancerPreviewInfo
}

const getDetailFreelancersInfo = (freelancerId: GetFreelancerInfoRequest) => {
    return ApiService.get<GetFreelancerInfoResponse>(`/info-user?id=${freelancerId}&typeUser=freelancer`)
}
const confirmJob = async (id: any) => { 
    
    return ApiService.postFormData<any>(`/client/job/${id}/recruit-confirm`);
  }

export const clientServices = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    confirmJob,
    getDetailFreelancersInfo,
};
