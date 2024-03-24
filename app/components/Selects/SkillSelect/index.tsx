import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

import { Skill } from '@/app/types/common.types';
import { commonServices } from '@/app/services/common.services';

interface MultiSkillSelectProps {
    onChange?: any;
}

const MultiSkillSelect: React.FC<MultiSkillSelectProps> = ({ onChange }) => {
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

    return (
        <AsyncSelect
            isMulti
            cacheOptions={true}
            defaultOptions={defaultOptionSkills}
            loadOptions={loadOptionSkills as any}
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id?.toString()}
            placeholder='Chọn skill...'
            noOptionsMessage={() => `No skill found`}
            loadingMessage={() => `Getting skill ...`}
            value={[] as Skill[]}
            onChange={onChange}
        />
    );
};

export default MultiSkillSelect;
