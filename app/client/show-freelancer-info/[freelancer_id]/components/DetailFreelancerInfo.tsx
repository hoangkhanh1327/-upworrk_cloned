import { Skeleton } from '@/app/components/ui/skeleton';
import { clientServices } from '@/app/services/client.services';
import { FreelancerPreviewInfo } from '@/app/types/authentication.types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface IDetailFreelancerInfo {
    freelancerId: string;
}

const DetailFreelancerInfo: React.FC<IDetailFreelancerInfo> = ({
    freelancerId,
}) => {
    const [loading, setLoading] = useState(false);
    const [freelancerInfo, setFreelancerInfo] =
        useState<FreelancerPreviewInfo | null>(null);

    useEffect(() => {
        const fetchfreelancerInfoData = async (freelancerInfoId: string) => {
            try {
                setLoading(true);
                const res = await clientServices.getDetailFreelancersInfo(
                    freelancerId
                );
                if (res.data) {
                    setFreelancerInfo(res.data);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        if (freelancerId) {
            fetchfreelancerInfoData(freelancerId);
        }
    }, [freelancerId]);

    return (
        <section className='px-20'>
            <div>
                <h2 className='text-4xl font-semibold -tracking-[1px]'>
                    Thông tin ứng viên
                </h2>
            </div>
            <div className='my-8 border border-solid border-[#d5e0d5] rounded-[16px]'>
                <article className='mb-8'>
                    <header className='p-8 border-b border-solid border-[#d5e0d5] flex items-center justify-between'>
                        {loading ? (
                            <Skeleton className='w-full h-7' />
                        ) : (
                            <>
                                <h3 className='text-2xl font-medium'>
                                    Thông tin liên lạc
                                </h3>
                            </>
                        )}
                    </header>
                    <div className='grid grid-cols-5 gap-x-8'>
                        <div></div>
                        <div className='col-span-4'>
                            <div className='pt-8 mb-5'>
                                <h3 className='text-xl font-medium'>
                                    {`${freelancerInfo?.base_info.last_name} ${freelancerInfo?.base_info.first_name}`}
                                </h3>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Ngày sinh:
                                            </h3>
                                            <p className='ml-4'>
                                                {freelancerInfo?.base_info
                                                    .date_of_birth &&
                                                    format(
                                                        freelancerInfo
                                                            ?.base_info
                                                            .date_of_birth,
                                                        'dd-M-yyyy'
                                                    )}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Giới tính:
                                            </h3>
                                            <p className='ml-4'>
                                                {freelancerInfo?.base_info
                                                    .sex === '0'
                                                    ? 'Nam'
                                                    : 'Nữ'}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Số điện thoại:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.phone_num
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Email:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.email
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Địa chỉ:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.address
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Giới thiệu ngắn:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.intro
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Kỹ năng:
                                            </h3>
                                            <div className='ml-4 flex items-center gap-x-3'>
                                                {freelancerInfo?.experience.map(
                                                    (s) => (
                                                        <div
                                                            key={`selected-skill-${s.id}`}
                                                            className='cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white'
                                                        >
                                                            {s.name}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <div className='my-8 border border-solid border-[#d5e0d5] rounded-[16px]'>
                <article className='mb-8'>
                    <header className='p-8 border-b border-solid border-[#d5e0d5] flex items-center justify-between'>
                        {loading ? (
                            <Skeleton className='w-full h-7' />
                        ) : (
                            <>
                                <h3 className='text-2xl font-medium'>
                                    Công việc đã tham gia
                                </h3>
                            </>
                        )}
                    </header>
                    <div className='grid grid-cols-5 gap-x-8'>
                        <div></div>
                        <div className='col-span-4'>
                            <div className='pt-8 mb-5'>
                                <h3 className='text-xl font-medium'>
                                    {`${freelancerInfo?.base_info.last_name} ${freelancerInfo?.base_info.first_name}`}
                                </h3>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Ngày sinh:
                                            </h3>
                                            <p className='ml-4'>
                                                {freelancerInfo?.base_info
                                                    .date_of_birth &&
                                                    format(
                                                        freelancerInfo
                                                            ?.base_info
                                                            .date_of_birth,
                                                        'dd-M-yyyy'
                                                    )}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Giới tính:
                                            </h3>
                                            <p className='ml-4'>
                                                {freelancerInfo?.base_info
                                                    .sex === '0'
                                                    ? 'Nam'
                                                    : 'Nữ'}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Số điện thoại:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.phone_num
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Email:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.email
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Địa chỉ:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.address
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Giới thiệu ngắn:
                                            </h3>
                                            <p className='ml-4'>
                                                {
                                                    freelancerInfo?.base_info
                                                        ?.intro
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center'>
                                    {loading ? (
                                        <Skeleton className='w-full h-8' />
                                    ) : (
                                        <>
                                            <h3 className='text-lg font-medium'>
                                                Kỹ năng:
                                            </h3>
                                            <div className='ml-4 flex items-center gap-x-3'>
                                                {freelancerInfo?.experience.map(
                                                    (s) => (
                                                        <div
                                                            key={`selected-skill-${s.id}`}
                                                            className='cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white'
                                                        >
                                                            {s.name}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default DetailFreelancerInfo;
