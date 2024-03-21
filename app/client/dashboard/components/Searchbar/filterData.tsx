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
        label: 'All',
        value: '0',
    },
    {
        label: 'Draft',
        value: '1',
    },
    {
        label: 'Open',
        value: '2',
    },
    {
        label: 'Filled',
        value: '3',
    },
    {
        label: 'Closed',
        value: '4',
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
