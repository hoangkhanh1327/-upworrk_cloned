import { CommonSelectOptions } from '@/app/types/common.types';

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
