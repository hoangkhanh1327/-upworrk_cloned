import { Button } from '@/app/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useContext, useRef, useState } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { AuthContext } from '@/app/providers/AuthProvider';
import { loginServices } from '@/app/services/authentication.services';
import { useToast } from '@/app/components/ui/use-toast';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from '@/app/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/app/components/ui/calendar';

const UpdateSkillDialog = () => {
    const { onCloseModal } = useContext(ProfileContext);
    const { user, setUser } = useContext(AuthContext);
    const { toast } = useToast();
    const accountType = Cookies.get('account_type');
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const [sex, setSex] = useState('0');
    const [birthDay, setBirthday] = useState(
        user?.date_of_birth ? new Date(user.date_of_birth) : new Date()
    );

    const handleSubmit = async () => {
        try {
            if (accountType === 'client') {
                const res = await loginServices.updateUserInfo({
                    sex: sex,
                    date_of_birth: format(birthDay, 'yyyy-MM-dd'),
                    phone_num: phoneRef.current?.value || '',
                    address: addressRef.current?.value || '',
                });
                if (res.data) {
                    toast({
                        title: 'Cập nhật thành công',
                        description: 'Thông tin tài khoản đã được cập nhật',
                        className: cn(
                            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                        ),
                        duration: 1000,
                    });
                    setUser?.(res.data);
                    onCloseModal?.();
                }
            }
            if (accountType === 'freelancer') {
                const res = await loginServices.updateFreelancerInfo({
                    sex: sex,
                    date_of_birth: format(birthDay, 'yyyy-MM-dd'),
                    phone_num: phoneRef.current?.value || '',
                    address: addressRef.current?.value || '',
                });
                if (res.data) {
                    toast({
                        title: 'Cập nhật thành công',
                        description: 'Thông tin tài khoản đã được cập nhật',
                        className: cn(
                            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                        ),
                        duration: 1000,
                    });
                    setUser?.(res.data);
                    onCloseModal?.();
                }
            }
        } catch (error) {
            console.log('error', error);
            toast({
                title: 'Đã có lỗi xảy ra',
                description: (error as Error)?.message,
                variant: 'destructive',
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            });
        }
    };

    return (
        <Dialog open={true}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin</DialogTitle>
                    <DialogDescription>
                        {`Thay đổi thông tin tài khoản.`}
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='sex' className='text-right'>
                            Giới tính
                        </Label>
                        <Select
                            onValueChange={(value) => {
                                setSex(value);
                            }}
                            defaultValue={user?.sex}
                        >
                            <SelectTrigger
                                id='sex'
                                className='w-full col-span-3'
                            >
                                <SelectValue placeholder='Chọn giới tính' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='0'>Nam</SelectItem>
                                <SelectItem value='1'>Nữ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='birthday' className='text-right'>
                            Ngày sinh
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id='birthday'
                                    variant={'outline'}
                                    className={cn(
                                        'w-[280px] justify-start text-left font-normal',
                                        !birthDay && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {birthDay ? (
                                        format(birthDay, 'dd/MM/yyyy')
                                    ) : (
                                        <span>Chọn ngày sinh</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                                <Calendar
                                    mode='single'
                                    selected={new Date(birthDay)}
                                    onSelect={(date) =>
                                        date ? setBirthday(date) : null
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='phone' className='text-right'>
                            Số điện thoại
                        </Label>
                        <Input
                            placeholder='Nhập số điện thoại'
                            id='phone'
                            className='w-full col-span-3'
                            defaultValue={user?.phone_num}
                            ref={phoneRef}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='address' className='text-right'>
                            Địa chỉ
                        </Label>
                        <Input
                            placeholder='Nhập địa chỉ'
                            id='address'
                            className='w-full col-span-3'
                            defaultValue={user?.address}
                            ref={addressRef}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type='button' onClick={() => onCloseModal?.()}>
                        Đóng
                    </Button>
                    <Button type='submit' onClick={() => handleSubmit()}>
                        Cập nhật
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateSkillDialog;
