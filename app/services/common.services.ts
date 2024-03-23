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

export const commonServices = {
    getSkill
}