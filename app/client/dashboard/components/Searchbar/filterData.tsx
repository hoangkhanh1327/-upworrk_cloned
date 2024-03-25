import { CommonSelectOptions } from '@/app/types/common.types';

export const PostedOptions: CommonSelectOptions[] = [
    {
        label: 'All coworkers',
        value: '0',
    },
    {
        label: 'Me',
        value: '1',
    },
];

export const VisibilityOptions: CommonSelectOptions[] = [
    {
        label: 'All',
        value: '0',
    },
    {
        label: 'Invite-only',
        value: '1',
    },
    {
        label: 'Public',
        value: '2',
    },
];

export const StatusOptions: CommonSelectOptions[] = [
    {
        label: 'Tất cả',
        value: '-1',
    },
    {
        label: 'Ẩn',
        value: '0',
    },
    {
        label: 'Mở ứng tuyển',
        value: '1',
    },
    {
        label: 'Đóng ứng tuyển',
        value: '2',
    },
    {
        label: 'Đang được thực hiện',
        value: '3',
    },
   
];

export const TypeOptions: CommonSelectOptions[] = [
    {
        label: 'All',
        value: '0',
    },
    {
        label: 'Fixed-price',
        value: '1',
    },
    {
        label: 'Hourly',
        value: '2',
    },
];
