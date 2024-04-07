export type DetailJobPost = {
    id: number;
    client_id: number;
    title: string;
    desc: string;
    content: string;
    thumbnail: any;
    bids: number;
    status: number;
    min_proposals: number;
    deadline: string;
    created_at: string;
    updated_at: string;
    content_file: any;
};

export type Skill = {
    skill_id: number;
    skill_desc: string;
    skill_name: string;
    skill_points: number;
};

export type DetailClientPost = {
    id: number;
    client_id: number;
    title: string;
    desc: string;
    content: string;
    thumbnail: any;
    bids: number;
    status: number;
    min_proposals: number;
    deadline: string;
    created_at: string;
    updated_at: string;
    content_file: any;
    skills: Skill[];
    status_text: string;
    tasks: [];
    applied: [];
    applied_count: number;
    nominee: string | number;
};

export type AppliedJob = {
    attachment_url: string;
    bids: string;
    client_id: number | string;
    content: string;
    content_file: string;
    cover_letter: string;
    created_at: string;
    deadline: string;
    desc: string;
    freelancer_id: number | string;
    id: number | string;
    job_ap_status: number | string;
    job_id: number | string;
    min_proposals: string;
    proposal: string;
    status: string;
    status_apply_text: string;
    thumbnail: string;
    title: string;
    updated_at: string;
};
