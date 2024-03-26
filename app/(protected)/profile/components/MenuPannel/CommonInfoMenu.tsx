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
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { ProfileContext } from '../../context/ProfileContext';

const CommonInfo = () => {
    const { user } = useContext(AuthContext);
    const { onOpenModal } = useContext(ProfileContext);
    const accoutType = Cookies.get('account_type');
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
                            <div className='w-[150px] flex items-center justify-center relative'>
                                {user?.avatar_url ? (
                                    <Image src={user.avatar_url} alt='' />
                                ) : (
                                    <CircleUserRound className='w-[150px] h-[150px]' />
                                )}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-xl mb-2'>{user?.username}</h4>

                            <div className='mb-1'>
                                <small className='text-sm text-[#5e6d55] font-medium'>
                                    {accoutType}
                                </small>
                                <p className='text-base font-semibold'>
                                    {user?.first_name} {user?.last_name}
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

            <Card className='rounded-2xl'>
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
        </>
    );
};

export default CommonInfo;
