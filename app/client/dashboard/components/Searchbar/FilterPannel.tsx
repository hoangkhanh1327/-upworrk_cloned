import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import {
    PostedOptions,
    StatusOptions,
    TypeOptions,
    VisibilityOptions,
} from './filterData';
import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';
import { cn } from '@/lib/utils';

const FilterPannel = () => {
    const {
        postedBy,
        setPostedBy,
        type,
        setType,
        status,
        setStatus,
        visibility,
        setVisibility,
    } = useContext(SearchBarContext);

    const handleSelectVisibility = (value: string) => {
        setVisibility?.(value);
    };

    const handleSelectStatus = (id: string, value: string | boolean) => {
        if (value) {
            setStatus?.(id);
        }
    };

    const handleSelectType = (value: string) => {
        setType?.(value);
    };

    const handleSelectPostedBy = (value: string) => {
        setPostedBy?.(value);
    };

    return (
        <div className='grid grid-cols-4 gap-x-6'>
            {/* <div>
                <h5 className='mb-3'>Posted by</h5>
                <Select
                    value={postedBy}
                    onValueChange={(value) => handleSelectPostedBy(value)}
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
            </div> */}
            <div className='col-span-2 grid grid-cols-3 gap-x-5'>
                {/* <div>
                    <h5 className='mb-3'>Visibility</h5>
                    <RadioGroup
                        value={visibility}
                        onValueChange={handleSelectVisibility}
                        className='gap-0'
                    >
                        {VisibilityOptions.map((opt, index) => (
                            <div
                                key={`visibility-option-${index}`}
                                className='flex items-center space-x-2 mb-4'
                            >
                                <RadioGroupItem
                                    className={cn(
                                        'w-6 h-6',
                                        visibility === opt.value?.toString()
                                            ? 'text-[#108a00] border-2 border-[#108a00] transition-[border-color]'
                                            : ''
                                    )}
                                    value={opt.value?.toString()}
                                    id={`visibility-value-${opt.label}`}
                                />
                                <Label
                                    htmlFor={`visibility-value-${opt.label}`}
                                    className='text-sm '
                                >
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div> */}
                <div>
                    <h5 className='mb-3'>Trạng thái bài post</h5>
                    <div className='flex flex-col gap-y-4 '>
                        {StatusOptions.map((opt, index) => (
                            <div
                                key={`status-select-option-${index}`}
                                className='flex items-center space-x-2 cursor-pointer'
                            >
                                <div className='flex items-center space-x-2'>
                                    <Checkbox
                                        id={`status-value-${opt.value?.toString()}`}
                                        checked={
                                            status?.toString() ===
                                            opt.value?.toString()
                                        }
                                        className={cn(
                                            'w-6 h-6',
                                            status?.toString() ===
                                                opt.value?.toString()
                                                ? 'text white !bg-[#108a00] border-2 border-[#108a00] transition-[border-color]'
                                                : ''
                                        )}
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
                {/* <div>
                    <h5 className='mb-3'>Type</h5>
                    <RadioGroup
                        onValueChange={handleSelectType}
                        value={type}
                        className='gap-0'
                    >
                        {TypeOptions.map((opt, index) => (
                            <div
                                key={`type-select-option-${index}`}
                                className='flex items-center space-x-2 mb-4'
                            >
                                <RadioGroupItem
                                    value={opt.value?.toString()}
                                    id={`type-${opt.value}`}
                                    className={cn(
                                        'w-6 h-6',
                                        type === opt.value?.toString()
                                            ? 'text-[#108a00] border-2 border-[#108a00] transition-[border-color]'
                                            : ''
                                    )}
                                />
                                <Label htmlFor={`type-${opt.value}`}>
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div> */}
            </div>
        </div>
    );
};

export default FilterPannel;
