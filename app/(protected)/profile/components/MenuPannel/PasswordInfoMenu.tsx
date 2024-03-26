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
import { Pencil } from 'lucide-react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';

const PasswordInfoMenu = () => {
    const { onOpenModal } = useContext(ProfileContext);

    return (
        <Card className='rounded-2xl mb-8'>
            <CardHeader>
                <CardTitle className='flex items-start justify-between'>
                    Thay đổi mật khẩu
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() =>
                                        onOpenModal?.('change-password')
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
                    Thực hiện thay đổi mật khẩu để bảo vệ tài khoản của ban.
                </div>
            </CardContent>
        </Card>
    );
};

export default PasswordInfoMenu;
