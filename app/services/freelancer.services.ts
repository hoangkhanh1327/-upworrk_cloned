import { CommonResponse } from '../types/common.types';
import { DetailJobPost } from '../types/freelancer.type';
import ApiService from './ApiService';

type GetFreelancerPostsRequest = {
    page: number;
    num: number;
    status: number;
};

type GetFreelancerPostsResponse = CommonResponse & {
    data: {
        data: DetailJobPost[];
        total: number;
        total_page: number;
    };
};
const getPosts = async (params: GetFreelancerPostsRequest) => {
    return ApiService.get<GetFreelancerPostsResponse>(
        `/freelancer/job`,
        params
    );
};

export const freelancerServices = {
    getPosts,
  };