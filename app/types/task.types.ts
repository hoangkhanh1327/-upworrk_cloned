export type Task = {
    confirm_status: number;
    created_at: string;
    deadline: string;
    desc: string;
    id: number;
    job_id: number | string;
    name: string;
    status:  number | string;
    updated_at: string;
    priority: number | string;
};
