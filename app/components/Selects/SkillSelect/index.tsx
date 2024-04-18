import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

import { Skill } from '@/app/types/common.types';
import { commonServices } from '@/app/services/common.services';

interface MultiSkillSelectProps {
    value?: any;
    onChange?: any;
}

const MultiSkillSelect: React.FC<MultiSkillSelectProps> = ({
    value,
    onChange,
}) => {
    const [defaultOptionSkills, setDefaultOptionSkills] = useState<Skill[]>([]);

    const loadOptionSkills = async (
        inputValue: string,
        callback: (options: Skill[]) => void
    ) => {
        try {
            const params = { page: 1, num: 5, search: inputValue };
            const response = await commonServices.getSkill(params);
            const options = response.data.data;
            setDefaultOptionSkills(options);
            callback(options as any);
        } catch (error) {
            console.log('errror', error);
        }
    };

    useEffect(() => {
        const fetchDefault = async () => {
            const params = { page: 1, num: 5, search: '' };
            const response = await commonServices.getSkill(params);
            const options = response.data.data;
            setDefaultOptionSkills(options);
        };
        fetchDefault();
    }, []);

    return (
        <AsyncSelect
            isMulti
            cacheOptions={true}
            defaultOptions={defaultOptionSkills}
            loadOptions={loadOptionSkills as any}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id?.toString()}
            placeholder='Chọn kỹ năng...'
            noOptionsMessage={() => `Không tìm thấy dữ liệu kỹ năng`}
            loadingMessage={() => `Đang tải dữ liệu ...`}
            value={(value || []) as Skill[]}
            onChange={onChange}
        />
    );
};

export default MultiSkillSelect;
