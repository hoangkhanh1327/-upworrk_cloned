import { CommonSelectOptions } from '@/app/types/common.types';

export const StatusOptions: CommonSelectOptions[] = [
    {
        label: 'Tất cả',
        value: '-2',
    },
    {
        label: 'Đã bị loại',
        value: '-1',
    },
    {
        label: 'Được mời',
        value: '2',
    },
    {
        label: 'Đang trong thời gian thực hiện',
        value: '3',
    },
    {
        label: 'Công việc hoàn tất',
        value: '4',
    },
];
