import { Checkbox } from '@/app/components/ui/checkbox';
import { StatusOptions } from './filterData';
import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';
import { cn } from '@/lib/utils';
import MultiSkillSelect from '@/app/components/Selects/SkillSelect';
import PriceSelect from '@/app/components/Selects/PriceSelect.tsx';
import DateRangeSelect from '@/app/components/Selects/DateRangeSelect';

const FilterPannel = () => {
    const { skills, setSkills, setDates, status, setStatus, setPrice } =
        useContext(SearchBarContext);

    const handleSelectStatus = (id: string, value: string | boolean) => {
        if (value) {
            // Nếu chọn tất cả thì bỏ các lựa chọn khác
            // Nếu chọn lựa chọn khác thì bỏ chọn tất cả
            if (id === '0') {
                setStatus?.(['0']);
            } else {
                setStatus?.((prev) =>
                    [...prev, id]?.filter((opt) => opt.toString() !== '0')
                );
            }
        } else {
            // Nếu bỏ chọn các lựa chọn khác thì tự động chọn tất cả
            if (status.length === 1) {
                setStatus?.(['0']);
            } else {
                setStatus?.((prev) => prev.filter((s) => s?.toString() !== id));
            }
        }
    };

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
                    {StatusOptions.map((opt, index) => (
                        <div
                            key={`status-select-option-${index}`}
                            className='flex items-center space-x-2 cursor-pointer'
                        >
                            <div className='flex items-center space-x-2'>
                                <Checkbox
                                    id={`status-value-${opt.value?.toString()}`}
                                    checked={status.includes(
                                        opt.value?.toString()
                                    )}
                                    className={cn(
                                        'w-6 h-6',
                                        status.includes(opt.value?.toString())
                                            ? 'text white !bg-[#108a00] border-2 border-[#108a00] transition-[border-color]'
                                            : ''
                                    )}
                                    disabled={
                                        status.includes('0') &&
                                        opt.value?.toString() === '0'
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
                <h5 className='mb-3 font-semibold'>Deadline</h5>
                <DateRangeSelect onChangeDate={handleSelectDeadline} />
            </div>
        </div>
    );
};

export default FilterPannel;
