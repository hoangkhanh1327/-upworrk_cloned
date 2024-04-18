import * as React from 'react';
import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/app/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';

interface ListNotiProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string;
    isRead: number;
    linkable?: string; // Allow linkable to be optional
}
const ListNoti = React.forwardRef<HTMLAnchorElement, ListNotiProps>(
    ({ className, title, isRead, linkable, children, ...props }, ref) => {
        // Hàm để cắt chuỗi nếu quá dài
        const truncateString = (str: any, maxLength: number) => {
            return str.length > maxLength
                ? str.slice(0, maxLength) + '...'
                : str;
        };

        // Sử dụng hàm truncateString để giới hạn độ dài của title và children
        const truncatedTitle = truncateString(title, 50); // Giới hạn title 50 ký tự
        const truncatedChildren = truncateString(children, 60);

        return (
            <div className='px-2 mt-3 py-2 border-b border-solid rounded-sm border-stone-200 hover:bg-gray-100'>
                <NavigationMenuLink asChild>
                    {linkable && linkable.startsWith('http') ? (
                        <a ref={ref} href={linkable} className='block'>
                            <div className='flex items-center gap-x-4'>
                                {/* Thêm biểu tượng thông báo ở đây nếu bạn muốn */}
                                {/* <div style={{width:"20%"}}>aaa</div> */}
                                <Image
                                    alt=''
                                    src={
                                        'https://timviecits.id.vn/storage/notificationdefault.png'
                                    }
                                    width={50}
                                    height={50}
                                />
                                <div className='flex-1'>
                                    <div style={{ fontWeight: 600 }}>
                                        {truncatedTitle}
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: truncatedChildren,
                                        }}
                                    ></div>
                                </div>
                                <div className='w-4 h-4 text-4xl text-primary-color/75'>
                                    {isRead == 1 ? '' : '*'}
                                </div>
                            </div>
                        </a>
                    ) : (
                        <Link
                            ref={ref}
                            href={linkable ?? ''}
                            className='block'
                        >
                            <div className='flex items-center gap-x-4'>
                                <Image
                                    src={
                                        'https://timviecits.id.vn/storage/notificationdefault.png'
                                    }
                                    alt=''
                                    width={50}
                                    height={50}
                                />
                                <div className='flex-1'>
                                    <div style={{ fontWeight: 600 }}>
                                        {truncatedTitle}
                                    </div>
                                    <div>{truncatedChildren}</div>
                                </div>
                                <div className='w-4 h-4 text-4xl text-primary-color/75'>
                                    {isRead == 1 ? '' : '*'}
                                </div>
                            </div>
                        </Link>
                    )}
                </NavigationMenuLink>
            </div>
        );
    }
);
ListNoti.displayName = 'ListNoti';

export default ListNoti;
