import { DetailClientPost } from "../types/client.types";
import { CommonResponse } from "../types/common.types";
import { DetailJobPost } from "../types/freelancer.type";
import ApiService from "./ApiService";

type GetFreelancerPostsRequest = {
  page: number;
  num: number;
  status: number;
};

type GetJobDetailRequest = string;

type GetPostDetailReponse = CommonResponse & {
  data: DetailClientPost;
};

type GetFreelancerPostsResponse = CommonResponse & {
  data: {
    data: DetailJobPost[];
    total: number;
    total_page: number;
  };
};
const getPosts = async (params: GetFreelancerPostsRequest) => {
  return ApiService.get<GetFreelancerPostsResponse>(`/freelancer/job`, params);
};
const getPost = async (params: GetJobDetailRequest) => {
  return ApiService.get<GetPostDetailReponse>(`/job/${params}`);
};

type ApplyJobResponse = CommonResponse;

const applyJob = async (params: any) => {
  return ApiService.postFormData<ApplyJobResponse>(`/freelancer/job/apply`, params);
};

export const freelancerServices = {
  getPosts,
  getPost,
  applyJob
};
