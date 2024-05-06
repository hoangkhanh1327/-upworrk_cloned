import { IMenu } from '@/app/types/menu.types';

const findTalentSubMenu: IMenu[] = [
    {
        title: 'Tất cả các công việc',
        href: '/dashboard',
        description: 'Danh sách các list công việc',
    },
    {
        title: 'Tạo công việc mới',
        href: '/post/create',
        description: 'Tạo một công việc mới',
    },
    {
        title: 'Công việc đang làm',
        href: '/my-job',
        description: 'Sub 3 description',
    },
];

const 
findWorkSubMenu: IMenu[] = [
    {
        title: 'Ways to earn',
        href: '/docs/find-work/way-to-earn',
        description: 'Find work that suits your skills',
    },
    {
        title: 'Find work for your skills',
        href: '/docs/find-work/find-work-for-your-skill',
        description: 'Find work that suits your skills',
    },
    {
        title: 'Win work with ads',
        href: '/docs/find-work/win-work-with-ads',
        description: 'Find work that suits your skills',
    },
    {
        title: 'Join Freelancer Plus',
        href: '/docs/find-work/scroll-area',
        description: 'Find work that suits your skills',
        
    },
];

export { findTalentSubMenu, findWorkSubMenu };
