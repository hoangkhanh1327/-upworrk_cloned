import SearchBox from './SearchBox';
import UserDropdown from './UserDropdown';

const Action = () => {
    return (
        <div className='ml-auto flex items-center'>
            <SearchBox />
            <UserDropdown />
        </div>
    );
};

export default Action;
