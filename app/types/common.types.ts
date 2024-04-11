export type CommonResponse = {
    status: number;
    data: unknown;
    message: string;
    result: number;
    error?: Error;
};

export type CommonSelectOptions = {
    label: string;
    value: string | number;
};

export type  Skill = {
    id: number,
    name: string
    desc: string
    created_at: string
    updated_at: string
}


export type SkillInProfile = {
    skill_id: number,
    skill_desc?: string,
    skill_name: string,
    skill_point?: number
}

export type Notification = {
    id: number;
    title: string;
    message: string;
    linkable: string;
    is_read: number;
    created_at: string;
    updated_at: string;
    className?: string;
    children: string;
};