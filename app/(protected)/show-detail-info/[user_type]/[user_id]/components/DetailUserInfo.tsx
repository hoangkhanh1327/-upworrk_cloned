import { Skeleton } from '@/app/components/ui/skeleton';
import { clientServices } from '@/app/services/client.services';
import { FreelancerPreviewInfo } from '@/app/types/authentication.types';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import JobTable from './JobTable';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { Button } from 'antd';
import { ProfileContext } from '@/app/(protected)/profile/context/ProfileContext';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/providers/AuthProvider';
import Cookies from "js-cookie";

interface IDetailUserInfo {
    userId: string;
    userType: string;
}

const DetailUserInfo: React.FC<IDetailUserInfo> = ({
    userId,userType
}) => {
    const [loading, setLoading] = useState(false);
    const [freelancerInfo, setFreelancerInfo] =
        useState<FreelancerPreviewInfo | null>(null);
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const accountType = Cookies.get("account_type");
    setAccountType(accountType || "");
  }, []);


    useEffect(() => {
        const fetchfreelancerInfoData = async (userType:string,freelancerInfoId: string) => {
            try {
                setLoading(true);
                const res = await clientServices.getDetailInfo(userType,
                    userId
                );
                if (res.data) {
                    setFreelancerInfo(res.data);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchfreelancerInfoData(userType,userId);
        }
    }, [userType,userId]);

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
                        {(parseInt(userId)==user?.id&&userType==accountType)?<Button
                            onClick={() => {
                                router.replace('/profile')

                            }}
                            className='bg-transparent hover:bg-transparent border-2 border-solid border-primary-color rounded-full px-1.5'
                        >
                            <Pencil
                                fill='#108a00' />
                        </Button>:<></>}
                    </header>
                    <div className='grid grid-cols-5 gap-x-8'>
                        <div style={{padding:20, width:'100%'}}> <img src={freelancerInfo?.base_info?.avatar_url}></img></div>
                        <div className='col-span-4'>
                            <div className='pt-8 mb-5'>
                                {loading ? (
                                    <Skeleton className='w-full h-8' />
                                ) : (
                                    <h3 className='text-xl font-medium'>
                                        {`${freelancerInfo?.base_info.last_name} ${freelancerInfo?.base_info.first_name}`}
                                    </h3>
                                )}
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
                            {/* <div className='mb-2'>
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
                            </div> */}
                            {userType=='freelancer'?<div className='mb-2'>
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
                            </div>:<></>}
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
                                    Giới Thiệu
                                </h3>
                            </>
                        )}
                    </header>
                    <div style={{padding:20}} dangerouslySetInnerHTML={{ __html: 
                                                    userType=='client'?(freelancerInfo?.base_info
                                                        ?.introduce||''):(freelancerInfo?.base_info
                                                        ?.intro||'')
                                                }} />
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
                                    {userType=='client'?"Công việc đã đăng":"Công việc đã thực hiện"} 
                                </h3>
                            </>
                        )}
                    </header>
                    <JobTable job={freelancerInfo?.job || []} />
                </article>
            </div>
        </section>
    );
};

export default DetailUserInfo;
