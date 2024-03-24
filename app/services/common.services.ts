import { appConfig } from '../configs/app.config';
import { CommonResponse, Skill } from '../types/common.types';
import ApiService from './ApiService';

type GetSkillRequest = {
    page: number,
    num: number,
    search?: string
}

type GetSkillResponse =  CommonResponse & {
    data: {
        data: Skill[],
        total: number,
        total_page: number,
    }
}
const getSkill = (params: GetSkillRequest) => {
    return ApiService.get<GetSkillResponse>(`/administrator/skill`, params);
}
const sendNotication = async (params: INotiParams) => {
    return ApiService.postFormData<any>(`/notifications`, {
        title: params.title,
        message: params.message,
        linkable: params.linkable,
        smail: params.smail,
        imagefile: params.imagefile,
        user_type: params.user_type,
        user_id: params.user_id,
    });
};

export const commonServices = {
    getSkill,
    sendNotication
}

export type INotiParams = {
    title: string;
    message: string;
    linkable: string;
    smail: number;
    imagefile: File;
    user_type?: string;
    user_id?: number;
}


