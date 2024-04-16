import { StatusOptions } from './filterData';
import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';
import MultiSkillSelect from '@/app/components/Selects/SkillSelect';
import PriceSelect from '@/app/components/Selects/PriceSelect.tsx';
import DateRangeSelect from '@/app/components/Selects/DateRangeSelect';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';

const FilterPannel = () => {
    const { skills, setSkills, setDates, status, setStatus, setPrice } =
        useContext(SearchBarContext);

    const handleSelectDeadline = (data: any) => {
        setDates?.(data);
    };

    const handleSelectSkills = (data: any[]) => {
        setSkills?.(data);
    };

    const handleSelectPrice = (data: any[]) => {
        setPrice?.(data);
    };

    return (
        <div className='grid grid-cols-4 gap-x-6'>
            <div>
                <h5 className='mb-3 font-semibold'>Kỹ năng</h5>
                <MultiSkillSelect
                    value={skills}
                    onChange={handleSelectSkills}
                />
            </div>
            <div>
                <h5 className='mb-3 font-semibold'>Giá tiền</h5>
                <PriceSelect onChange={handleSelectPrice} />
            </div>
            <div>
                <h5 className='mb-3 font-semibold'>Trạng thái</h5>
                <div className='flex flex-col gap-y-4 '>
                    <Select
                        value={status}
                        onValueChange={(value) => setStatus?.(value)}
                    >
                        <SelectTrigger>
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
            <div>
                <h5 className='mb-3 font-semibold'>Deadline</h5>
                <DateRangeSelect onChangeDate={handleSelectDeadline} />
            </div>
        </div>
    );
};

export default FilterPannel;
