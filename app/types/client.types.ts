import { Skill } from './common.types';

export type ClientPost = {
    bids: string;
    client_id: string;
    content: string;
    created_at: string;
    deadline: string;
    desc: string;
    id: number;
    min_proposals: string;
    status: string | number;
    thumbnail: string;
    title: string;
    updated_at: string;
};

export type ClientPostList = ClientPost[];



type Task = {
    id: number
    name: string
}

export type DetailClientPost = {
    id: number,
    client_id: number,
    title: string,
    desc: string,
    content: string,
    thumbnail: string,
    bids: number,
    status: number | string,
    deadling: string,
    created_at: string,
    updated_at: string,
    min_proposals: string | number
    nominee?: string | number
    skills: Skill[],
    statusText: string 
    task: Task[]
}