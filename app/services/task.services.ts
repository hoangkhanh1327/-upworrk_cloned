import { CommonResponse, Skill } from '../types/common.types';
import { Task } from '../types/task.types';
import ApiService from './ApiService';

type GetTaskResponse = CommonResponse & {
    data: Task[];
};

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
    priority: string
};

type CreateJobTaskResponse = CommonResponse & {
    data: Task;
};

const createJobTask = async (params: CreateJobTaskRequest) => {
    const { id, ...rest } = params;
    return ApiService.post<CreateJobTaskResponse>(`/job/${id}/new-task`, rest);
};

type UpdateJobTaskRequest = Partial<CreateJobTaskRequest> & {
    task_id: string;
};

type UpdateJobTaskResponse = CommonResponse & {
    data: Task;
};

const updateJobTask = async (params: UpdateJobTaskRequest) => {
    const { task_id, id, ...rest } = params;
    return ApiService.put<UpdateJobTaskResponse>(`/job/task/${task_id}`, rest);
};

type FreelancerUpdateJobStatusRequest = {
    id: string;
    status: string;
};

type FreelancerUpdateJobStatusResponse = CommonResponse & {
    data: Task;
};

const freelancerUpdateJobStatus = async (
    params: FreelancerUpdateJobStatusRequest
) => {
    const { id, ...rest } = params;
    console.log('status', status);

    return ApiService.post<FreelancerUpdateJobStatusResponse>(
        `/job/task/${id}/set-status`,
        rest
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
    updateJobTask,
    freelancerUpdateJobStatus,
    clientConfirmUpdateStatus,
    deleteJobTask,
};
