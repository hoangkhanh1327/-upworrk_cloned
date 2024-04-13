'use client';

import { freelancerServices } from '@/app/services/freelancer.services';
import { AppliedJob } from '@/app/types/freelancer.type';
import { DetailClientPost } from '@/app/types/client.types';
import React, { useEffect, useState } from 'react';
import TaskBoardProvider from './TaskBoard/TaskBoardContext';
import TaskBoard from './TaskBoard';

interface IManageTask {
    id: string;
}
const ManageTask: React.FC<IManageTask> = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<DetailClientPost | null>(null);
    const [jobs, setJobs] = useState<AppliedJob[]>([]);

    useEffect(() => {
        const fetchFreelancerJobs = async () => {
            const res = await freelancerServices.getAppliedJobs({});
            setJobs(res.data);
        };
        fetchFreelancerJobs();
    }, []);

    useEffect(() => {
        const fetchPostData = async (jobId: string) => {
            try {
                setLoading(true);
                const res = await freelancerServices.getPost(jobId);
                if (res.data) {
                    setPost(res.data);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchPostData(id);
        }
    }, [id]);

    const currentStatusJob = (jobs || []).find(
        (j) => j.job_id?.toString() === id
    );

    console.log('vo day');
    
    return (
        <section>
            <div>
                <h2 className='text-4xl font-semibold -tracking-[1px]'>
                    Quản lý task - {post?.title}
                </h2>
            </div>
            <div className='my-8'>
                <TaskBoardProvider>
                    <TaskBoard jobId={id} />
                </TaskBoardProvider>
            </div>
        </section>
    );
};

export default ManageTask;
