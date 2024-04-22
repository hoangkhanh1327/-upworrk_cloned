import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { StatusOptions } from './filterData';
import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';

const FilterPannel = () => {
    const { status, setStatus } = useContext(SearchBarContext);

    return (
        <div className='grid grid-cols-4 gap-x-6'>
            <div className='col-span-2 grid grid-cols-3 gap-x-5'>
                <div>
                    <h5 className='mb-3 font-semibold'>Trạng thái bài post</h5>
                    <div className='flex flex-col gap-y-4 '>
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus?.(value)}
                        >
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder='Select a fruit' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {StatusOptions.map((opt, index) => (
                                        <SelectItem
                                            value={opt.value.toString()}
                                            key={`select-status-${index}`}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPannel;
