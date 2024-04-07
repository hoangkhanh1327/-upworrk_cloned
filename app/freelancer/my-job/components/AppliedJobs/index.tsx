import React, { useContext } from 'react';
import JobItem from './JobItem';
import { SearchBarContext } from '../../context/MyJobSearchBarContext';

interface IAppliedJobs {}
const AppliedJobs: React.FC<IAppliedJobs> = () => {
    const { jobs } = useContext(SearchBarContext);

    return (
        <section className='py-6 border-b border-solid border-[#d5e0d5]'>
            <div className='flex flex-col'>
                {jobs?.map((job) => (
                    <JobItem key={job.id} job={job} />
                ))}
            </div>
        </section>
    );
};

export default AppliedJobs;
