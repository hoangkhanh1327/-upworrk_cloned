import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';

const Pagiantion = () => {
    const { total, page } = useContext(SearchBarContext);
    const start = Math.max((page - 1) * 4, 1);
    const end = Math.min(start + (4 - 1), total - 1);
    return (
        <div className='py-6'>
            <div>
                <span>
                    {start} - {end}
                </span>
                <span>{` of ${total} `}</span>
                <span>{` Job posts `}</span>
            </div>
        </div>
    );
};

export default Pagiantion;
