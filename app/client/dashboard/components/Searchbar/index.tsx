'use client';

import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { cn } from '@/lib/utils';
import { Search, Settings2 } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
    const [isFilterPannelOpen, toggleFilterPannel] = useState(false);
    return (
        <div>
            <div className='flex items-center relative py-6'>
                <label
                    htmlFor='search'
                    className='pl-[48px] pr-[32px] flex items-center group  border-2 border-solid border-[#e4ebe4] hover:border-[#c7d6c7] group-focus-within:border-[#c7d6c7] rounded-[10rem] overflow-hidden relative w-1/2'
                >
                    <Search className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer w-6 h-6' />
                    <Input
                        id='search'
                        className='border-none p-0 h-[34px] text-[#001e00] placeholder:text-[#001e00] placeholder:text-sm bg-white text-sm leading-[22px] !ring-transparent !outline-none transition-[border-color]  !shadow-none'
                        placeholder='Tìm kiếm'
                        size={20}
                    />
                </label>
                <Button
                    onClick={() => toggleFilterPannel((prev) => !prev)}
                    className='bg-transparent inline-flex pl-4 pr-6 items-center group hover:bg-transparent text-[#108a00] active:scale-95 transition-all'
                >
                    <Settings2 className='w-6 h-6 mr-3' />
                    Filters
                </Button>
            </div>
            <div
                className={cn(
                    'border-y border-solid border-[#beccbe] transition-all pt-10 pb-6',
                    isFilterPannelOpen ? 'h-[330px]' : 'h-0'
                )}
            >
                <div className='grid grid-cols-4 gap-x-6'>
                    <div>
                        <h5 className='mb-3'>Posted by</h5>
                        <Select
                            onValueChange={(value) =>
                                console.log('value', value)
                            }
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Theme' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='light'>Light</SelectItem>
                                <SelectItem value='dark'>Dark</SelectItem>
                                <SelectItem value='system'>System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='col-span-2 grid grid-cols-3 gap-x-5'>
                        <div>
                            <h5 className='mb-3'>Visibility</h5>
                            <RadioGroup defaultValue='all'>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='all' id='all' />
                                    <Label htmlFor='all'>All</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='invite-only'
                                        id='invite-only'
                                    />
                                    <Label htmlFor='invite-only'>
                                        Invite-only
                                    </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='public'
                                        id='public'
                                    />
                                    <Label htmlFor='public'>Public</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <h5 className='mb-3'>Status</h5>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox id='all' />
                                    <label
                                        htmlFor='all'
                                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                    >
                                        All
                                    </label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox id='draft' />
                                    <label
                                        htmlFor='draft'
                                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                    >
                                        Draft
                                    </label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox id='open' />
                                    <label
                                        htmlFor='open'
                                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                    >
                                        Open
                                    </label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox id='filled' />
                                    <label
                                        htmlFor='filled'
                                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                    >
                                        Filled
                                    </label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Checkbox id='closed' />
                                    <label
                                        htmlFor='closed'
                                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                    >
                                        Closed
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className='mb-3'>Visibility</h5>
                            <RadioGroup defaultValue='all'>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='all' id='all' />
                                    <Label htmlFor='all'>All</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='fixed-price'
                                        id='fixed-price'
                                    />
                                    <Label htmlFor='fixed-price'>
                                        Fixed-price
                                    </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value='hourly'
                                        id='hourly'
                                    />
                                    <Label htmlFor='hourly'>Hourly</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
