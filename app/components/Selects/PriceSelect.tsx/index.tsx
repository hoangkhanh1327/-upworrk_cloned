import { FC, useRef } from 'react';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { CircleDollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import _ from 'lodash';
interface IPriceSelect {
    onChange: (data: string[]) => void;
}
const PriceSelect: FC<IPriceSelect> = ({ onChange }) => {
    const minPriceRef = useRef<HTMLInputElement | null>(null);
    const maxPriceRef = useRef<HTMLInputElement | null>(null);

    const handleChangePrice = _.debounce(() => {
        onChange([
            minPriceRef.current?.value || '',
            maxPriceRef.current?.value || '',
        ]);
    }, 1000);

    return (
        <div className='flex flex-col gap-y-3'>
            <div className='flex items-center gapx-x-2 relative'>
                <Label className='min-w-[50px]'>Từ:{` `}</Label>
                <Input
                    ref={minPriceRef}
                    className='hide-arrow !outline-none focus:!outline-none focus-visible:!outline-none !ring-0 !ring-transparent'
                    type='number'
                    onChange={handleChangePrice}
                />
                <CircleDollarSign className='absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6' />
            </div>
            <div className='flex items-center gapx-x-2 relative'>
                <Label className='min-w-[50px]'>Đến:{` `}</Label>
                <Input
                    ref={maxPriceRef}
                    className='hide-arrow !outline-none focus:!outline-none focus-visible:!outline-none !ring-0 !ring-transparent pr-8'
                    type='number'
                    onChange={handleChangePrice}
                />
                <CircleDollarSign className='absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6' />
            </div>
        </div>
    );
};

export default PriceSelect;
