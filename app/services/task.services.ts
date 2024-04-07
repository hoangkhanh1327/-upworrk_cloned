import { CommonResponse, Skill } from '../types/common.types';
import { Task } from '../types/task.types';
import ApiService from './ApiService';

type GetTaskResponse = CommonResponse & {
    data: Task[]
}

const getJobTask = async (id: string) => {
    return ApiService.get<GetTaskResponse>(`/job/${id}/task`);
};

const getDetailJobTask = async (id: string) => {
    return ApiService.get(`/job/${id}`);
};

type CreateJobTaskRequest = {
    id: string;
    name: string;
    desc: string;
    deadline: string;
};

type CreateJobTaskResponse = CommonResponse & {
    data: any;
};

const createJobTask = async (params: CreateJobTaskRequest) => {
    const { id, ...rest } = params;
    return ApiService.post<CreateJobTaskResponse>(`/job/${id}/new-task`, rest);
};

type FreelancerUpdateJobStatusRequest = {
    id: string;
    status: string;
};

type FreelancerUpdateJobStatusResponse = CommonResponse & {
    data: any;
};

const freelancerUpdateJobStatus = async (
    params: FreelancerUpdateJobStatusRequest
) => {
    const { id, status } = params;
    return ApiService.post<FreelancerUpdateJobStatusResponse>(
        `/job/task/${id}/set-status`,
        status
    );
};

type ClientConfirmUpdateStatusRequest = {
    id: string;
    confirm_status: string;
};

type ClientConfirmUpdateStatusResponse = {
    data: any;
};

const clientConfirmUpdateStatus = async (
    params: ClientConfirmUpdateStatusRequest
) => {
    const { id, confirm_status } = params;
    return ApiService.post<ClientConfirmUpdateStatusResponse>(
        `/job/${id}/confirm-status`,
        confirm_status
    );
};

const deleteJobTask = async (id: string) => {
    return ApiService._delete(`/job/task/${id}`);
};

export const taskServices = {
    getJobTask,
    getDetailJobTask,
    createJobTask,
    freelancerUpdateJobStatus,
    clientConfirmUpdateStatus,
    deleteJobTask,
};
