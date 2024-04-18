'use client';

import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { AuthContext } from '@/app/providers/AuthProvider';
import { Building2, CircleUserRound, Pencil } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useContext } from 'react';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { ProfileContext } from '../../context/ProfileContext';
import { FreelancerInfo } from '@/app/types/authentication.types';
import VerifyInfoMenu from './VerifyInfoMenu';

const CommonInfo = () => {
    const { user } = useContext(AuthContext);
    const { onOpenModal } = useContext(ProfileContext);
    const accoutType = Cookies.get('account_type');
    const skills = (user as FreelancerInfo)?.skills || [];
    return (
        <>
            <Card className='rounded-2xl mb-8'>
                <CardHeader>
                    <CardTitle className='flex items-start justify-between'>
                        Thông tin chung
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            onOpenModal?.('edit-common-info')
                                        }
                                        className='bg-transparent hover:bg-transparent border-2 border-solid border-primary-color rounded-full px-1.5'
                                    >
                                        <Pencil fill='#108a00' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nhấn để chỉnh sửa</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-x-8'>
                        <div className='w-[150px] '>
                            <div
                                className='w-[150px] flex items-center justify-center relative cursor-pointer'
                                onClick={() => onOpenModal?.('edit-avatar')}
                            >
                                {user?.avatar_url ? (
                                    <div className='w-[150px] h-[150px] relative rounded-full overflow-hidden'>
                                        <Image
                                            src={user.avatar_url.toString()}
                                            alt=''
                                            fill
                                        />
                                    </div>
                                ) : (
                                    <CircleUserRound className='w-[150px] h-[150px]' />
                                )}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-xl mb-2'>{user?.username}</h4>

                            <div className='mb-1'>
                                {typeof window !== 'undefined' && (
                                    <small className='text-sm text-[#5e6d55] font-medium'>
                                        {accoutType}
                                    </small>
                                )}

                                <p className='text-base font-semibold'>
                                    {user?.last_name} {user?.first_name}
                                </p>
                            </div>

                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Email
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.email || ''}
                                </p>
                            </div>

                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Tên công ty
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.company_name || ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='rounded-2xl mb-8'>
                <CardHeader>
                    <CardTitle className='flex items-start justify-between'>
                        Thông tin cá nhân
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            onOpenModal?.('edit-personal-info')
                                        }
                                        className='bg-transparent hover:bg-transparent border-2 border-solid border-primary-color rounded-full px-1.5'
                                    >
                                        <Pencil fill='#108a00' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nhấn để chỉnh sửa</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-x-8'>
                        <div className='w-[150px] '>
                            <div className='w-[150px] flex items-center justify-center relative'>
                                <Building2 className='w-[150px] h-[150px]' />
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Giới tính
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.sex === '0' ? 'Nam' : 'Nữ'}
                                </p>
                            </div>
                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Ngày sinh
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.date_of_birth &&
                                        format(
                                            user.date_of_birth,
                                            'dd/MM/yyyy'
                                        )}
                                </p>
                            </div>
                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Số điện thoại
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.phone_num}
                                </p>
                            </div>
                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    Địa chỉ
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {accoutType === 'freelancer' && (
                <Card className='rounded-2xl mb-8'>
                    <CardHeader>
                        <CardTitle className='flex items-start justify-between'>
                            Kỹ năng
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={() =>
                                                onOpenModal?.('edit-skill-info')
                                            }
                                            className='bg-transparent hover:bg-transparent border-2 border-solid border-primary-color rounded-full px-1.5'
                                        >
                                            <Pencil fill='#108a00' />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Nhấn để chỉnh sửa</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex gap-x-8 gap-y-1'>
                            {skills.length ? (
                                <Fragment>
                                    {skills.map((s) => (
                                        <div
                                            key={`selected-skill-${s.skill_id}`}
                                            className='cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white'
                                        >
                                            {s.skill_name}
                                        </div>
                                    ))}
                                </Fragment>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>
            )}
            {user?.is_completed_profile?.toString() === '1' && (
                <VerifyInfoMenu />
            )}
        </>
    );
};

export default CommonInfo;
