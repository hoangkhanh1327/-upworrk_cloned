import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { AppliedJob } from '@/app/types/freelancer.type';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/app/components/ui/badge';

dayjs.extend(relativeTime).locale('vi');

interface IJobItem {
    job: AppliedJob;
}

const JobItem: React.FC<IJobItem> = ({ job }) => {
    return (
        <Link
            href={`/freelancer/my-job/${job.id}`}
            className='flex gap-x-8 w-full p-6 group border-b border-solid border-[#d5e0d5] hover:bg-[#f2f7f2] last-of-type:border-transparent'
        >
            <div className='flex-1'>
                <small className='text-sm mb-3 font-normal text-[#5e6d55]'>
                    {dayjs(job.updated_at).fromNow()}
                </small>
                <h4 className='mb-1 text-2xl leading-7 tracking-[0.03px] font-medium text-black group-hover:text-[#14a800] group-hover:underline'>
                    {job.title}
                </h4>
                <p className='text-sm text-[#5e6d55] mb-2'>{job.desc}</p>
                <div className='flex items-center justify-between'>
                    <div className='text-sm text-[#5e6d55] mb-3 flex items-center'>
                        <p>
                            <BadgeCheck
                                className='w-5 h-5 inline-flex -mt-[3px] text-white'
                                fill='#5e6d55'
                            />{' '}
                            Payment verified
                        </p>
                        <span className='ml-4'>{`${job.bids}$`}</span>
                    </div>
                    <div>
                        <Badge
                            className={cn(
                                'font-semibold ',
                                job.status?.toString() === '-1'
                                    ? '!bg-red-500 !text-white'
                                    : '',
                                job.status?.toString() === '1' ||
                                    job.status?.toString() === '2'
                                    ? '!bg-orange-400 !text-white'
                                    : '',
                                job.status?.toString() === '3'
                                    ? '!bg-stone-400 !text-back'
                                    : '',
                                job.status?.toString() === '4'
                                    ? '!bg-primary-color !text-white'
                                    : ''
                            )}
                        >
                            {job.status_apply_text}
                        </Badge>
                    </div>
                </div>
                <p className='text-[12px] text-[#5e6d55] font-medium'>
                    Proposals: <span>{`${job.min_proposals}+`}</span>
                </p>
            </div>
            <div className='w-[150px] aspect-square bg-slate-500 relative'>
                <Image src={job.thumbnail} alt={job.title} fill />
            </div>
        </Link>
    );
};

export default JobItem;
