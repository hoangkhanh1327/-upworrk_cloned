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
import { FormEvent, useState } from 'react';
import {
    PostedOptions,
    StatusOptions,
    TypeOptions,
    VisibilityOptions,
} from './filterData';

const SearchBar = () => {
    const [isFilterPannelOpen, toggleFilterPannel] = useState(false);
    const [visibility]
    const [statusOpts, setStatusOpts] = useState<string[]>([]);

    const handleSelectVisibility = (value: string) => {
        console.log('on change visibility', value);
    };

    const handleSelectStatus = (id: string, value: string | boolean) => {
        if (value) {
            // Nếu chọn tất cả thì bỏ các lựa chọn khác
            // Nếu chọn lựa chọn khác thì bỏ chọn tất cả
            if (id === '0') {
                setStatusOpts(['0']);
            } else {
                setStatusOpts((prev) =>
                    [...prev, id]?.filter((opt) => opt.toString() !== '0')
                );
            }
        } else {
            // Nếu bỏ chọn các lựa chọn khác thì tự động chọn tất cả
            if (statusOpts.length === 1) {
                setStatusOpts(['0']);
            } else {
                setStatusOpts((prev) =>
                    prev.filter((s) => s?.toString() !== id)
                );
            }
        }
    };

    const handleSelectType = (value: string) => {
        console.log('on change type', value);
    };

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
                    className={cn(
                        'bg-transparent inline-flex pl-4 pr-6 items-center group hover:bg-transparent  active:scale-95 transition-all',
                        !isFilterPannelOpen
                            ? 'text-[#001e00]'
                            : 'text-[#108a00]'
                    )}
                >
                    <Settings2 className='w-6 h-6 mr-3' />
                    Filters
                </Button>
            </div>
            <div
                className={cn(
                    'border-y border-solid border-[#beccbe] transition-all ',
                    isFilterPannelOpen
                        ? 'h-[330px] pt-10 pb-6'
                        : 'p-0 h-0 overflow-hidden'
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
                                <SelectValue placeholder='Select Posted by' />
                            </SelectTrigger>
                            <SelectContent>
                                {PostedOptions.map((opt) => (
                                    <SelectItem
                                        key={`posted-option-${opt.value}`}
                                        value={opt.value?.toString()}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='col-span-2 grid grid-cols-3 gap-x-5'>
                        <div>
                            <h5 className='mb-3'>Visibility</h5>
                            <RadioGroup
                                defaultValue='all'
                                onValueChange={handleSelectVisibility}
                            >
                                {VisibilityOptions.map((opt, index) => (
                                    <div
                                        key={`visibility-option-${index}`}
                                        className='flex items-center space-x-2'
                                    >
                                        <RadioGroupItem
                                            value={opt.value?.toString()}
                                            id={`visibility-value-${opt.label}`}
                                        />
                                        <Label
                                            htmlFor={`visibility-value-${opt.label}`}
                                        >
                                            {opt.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <h5 className='mb-3'>Status</h5>
                            <div className='flex flex-col gap-y-3'>
                                {StatusOptions.map((opt, index) => (
                                    <div
                                        key={`status-select-option-${index}`}
                                        className='flex items-center space-x-2 cursor-pointer'
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <Checkbox
                                                id={`status-value-${opt.value?.toString()}`}
                                                checked={statusOpts.includes(
                                                    opt.value?.toString()
                                                )}
                                                disabled={
                                                    statusOpts.includes('0') &&
                                                    opt.value?.toString() ===
                                                        '0'
                                                }
                                                onCheckedChange={(checked) =>
                                                    handleSelectStatus(
                                                        opt.value?.toString(),
                                                        checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`status-value-${opt.value?.toString()}`}
                                                className='select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                            >
                                                {opt.label}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className='mb-3'>Type</h5>
                            <RadioGroup
                                onValueChange={handleSelectType}
                                defaultValue='all'
                            >
                                {TypeOptions.map((opt, index) => (
                                    <div
                                        key={`type-select-option-${index}`}
                                        className='flex items-center space-x-2'
                                    >
                                        <RadioGroupItem
                                            value={opt.label}
                                            id={`type-${opt.value}`}
                                        />
                                        <Label htmlFor={`type-${opt.value}`}>
                                            {opt.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
