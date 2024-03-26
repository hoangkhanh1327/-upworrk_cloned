import { SkillInProfile } from './common.types';

export interface User {
    id: number;
    username: string;
    email: string;
    position?: string | number;
    status: number;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface ClientInfo {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_num: string;
    address: string;
    sex: string;
    date_of_birth: string;
    company_name?: string;
    introduce?: string;
    avatar_url?: string;
    status: number;
    email_verified_at: string;
    google_id?: string;
    otp?: string;
    otp_exp?: string;
    bank_account?: string;
    created_at?: string;
    updated_at?: string;
    is_completed_profile: number | string;
}

export interface FreelancerInfo {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_num: string;
    address: string;
    sex: string;
    date_of_birth: string;
    company_name?: string;
    introduce?: string;
    avatar_url?: string;
    status: number;
    email_verified_at: string;
    google_id?: string;
    otp?: string;
    otp_exp?: string;
    bank_account?: string;
    created_at?: string;
    updated_at?: string;
    intro: string;
    available_proposal?: number | string;
    skills: SkillInProfile[];
    is_completed_profile: number | string;
}
