import {
  FreelancerInfo,
  FreelancerPreviewInfo,
} from "../types/authentication.types";
import { ClientPostList, DetailClientPost } from "../types/client.types";
import { CommonResponse } from "../types/common.types";
import ApiService from "./ApiService";

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
  return ApiService.get<GetClientPostsResponse>(`/client/job/my-jobs`, params);
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
  data: FreelancerPreviewInfo;
};
type GetListFreelancerInfoResponse = CommonResponse & {
  data: {
    data: FreelancerInfo[];
    total: number;
    total_page: number;
  };
};

type InviteJobToFreelancerRequest = {
  job_id: number | string;
  freelancer_id: number;
  mail_invite: string;
};
type InviteJobToFreelancerResponse = CommonResponse;

const getDetailFreelancersInfo = (freelancerId: GetFreelancerInfoRequest) => {
  return ApiService.get<GetFreelancerInfoResponse>(
    `/info-user?id=${freelancerId}&typeUser=freelancer`
  );
};
const getDetailInfo = (userType:string,user_id: GetFreelancerInfoRequest) => {
  return ApiService.get<GetFreelancerInfoResponse>(
    `/info-user?id=${user_id}&typeUser=${userType}`
  );
};
const confirmJob = async (id: any) => {
  return ApiService.postFormData<any>(`/client/job/${id}/recruit-confirm`);
};

const getListFreeLancer = async (params: any) => {
  return ApiService.get<GetListFreelancerInfoResponse>(
    `/client/freelancers`,
    params
  );
};
const sendInviteWorkToFreelancer = async (
  params: InviteJobToFreelancerRequest
) => {
  return ApiService.post<InviteJobToFreelancerResponse>(
    `/client/freelancers/invite`,
    params
  );
};
// confirm status

type ConfirmStatusRequest = {
  id: number | string;
  status: number | string;
  job_id: number | string;
};

const confirmStatus = async (params: ConfirmStatusRequest) => {
  return ApiService.post<CommonResponse>(
    `/job/task/${params.id}/confirm-status`,
    {
      // id: params.id,
      confirm_status: params.status,
    }
  );
};
const recruitConfirm = async (id: number) => {
  return ApiService.post<CommonResponse>(`/client/job/${id}/recruit-confirm`);
}


export const clientServices = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  confirmJob,
  getDetailFreelancersInfo,
  getListFreeLancer,
  sendInviteWorkToFreelancer,
  confirmStatus,
  getDetailInfo,
  recruitConfirm
};
