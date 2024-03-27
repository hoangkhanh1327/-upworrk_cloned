import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CircleUser, CircleUserRound, LogOut } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const UserDropdown = () => {
    const { user, logout } = useAuth();
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CircleUserRound className='ml-3 cursor-pointer w-7 h-7' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-60'>
                <DropdownMenuItem>
                    <div className='flex flex-col items-center justify-center w-full py-5'>
                        <CircleUserRound className='w-20 h-20' />
                        <h4 className='mt-2.5 text-center text-base font-medium'>
                            {user?.first_name
                                ? `${user?.first_name} ${user?.last_name}`
                                : user?.username}
                        </h4>
                        <small></small>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <DropdownMenuLabel asChild>
                        <Button
                            className='w-full border-none bg-transparent text-left justify-between'
                            variant='outline'
                        >
                            <CircleUser />
                            <span>Thông tin tài khoản</span>
                        </Button>
                    </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                    <DropdownMenuLabel asChild>
                        <Button
                            className='w-full border-none bg-transparent text-left justify-between'
                            variant='outline'
                        >
                            <LogOut />
                            <span>Đăng Xuất</span>
                        </Button>
                    </DropdownMenuLabel>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
