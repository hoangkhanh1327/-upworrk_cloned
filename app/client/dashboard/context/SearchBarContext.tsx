import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    createContext,
    useRef,
    useState,
} from 'react';

interface ISearchBarContext {
    visibility: string;
    status: string[];
    type: string;
    postedBy: string;
    searchText: string;
    setVisibility?: Dispatch<SetStateAction<string>>;
    setStatus?: Dispatch<SetStateAction<string[]>>;
    setType?: Dispatch<SetStateAction<string>>;
    setPostedBy?: Dispatch<SetStateAction<string>>;
    setSearchText?: Dispatch<SetStateAction<string>>;
}
export const SearchBarContext = createContext<ISearchBarContext>({
    visibility: '0',
    status: ['0'],
    type: '0',
    postedBy: '0',
    searchText: '',
});

export const SearchBarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [visibility, setVisibility] = useState('0');
    const [statusOpts, setStatusOpts] = useState<string[]>(['0']);
    const [type, setType] = useState('0');
    const [postedBy, setPostedBy] = useState('0');
    const [searchText, setSearchText] = useState('');
    return (
        <SearchBarContext.Provider
            value={{
                visibility,
                status: statusOpts,
                type,
                postedBy,
                searchText,
                setVisibility,
                setStatus: setStatusOpts,
                setType,
                setPostedBy,
                setSearchText,
            }}
        >
            {children}
        </SearchBarContext.Provider>
    );
};
