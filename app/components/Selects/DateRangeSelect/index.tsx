import { format } from 'date-fns';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

interface IDateRangeSelect {
    onChangeDate: (data: any) => void;
}

const DateRangeSelect: React.FC<IDateRangeSelect> = ({ onChangeDate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(dayjs().add(1, 'day').toDate());
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            onChangeDate([
                format(start, 'yyyy-MM-dd'),
                format(end, 'yyyy-MM-dd'),
            ]);
        }
    };
    return (
        <>
            <ReactDatePicker
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hide-arrow !outline-none focus:!outline-none !ring-0 !ring-transparent'
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
            />
        </>
    );
};

export default DateRangeSelect;
