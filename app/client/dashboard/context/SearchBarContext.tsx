import { clientServices } from '@/app/services/client.services';
import { ClientPostList } from '@/app/types/client.types';
import { isEmpty } from 'lodash';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

interface ISearchBarContext {
    visibility: string;
    status: string;
    type: string;
    postedBy: string;
    searchText: string;
    posts: ClientPostList;
    isGettingPosts: boolean;
    total: number;
    page: number;
    totalPage: number;
    setVisibility?: Dispatch<SetStateAction<string>>;
    setStatus?: Dispatch<SetStateAction<string>>;
    setType?: Dispatch<SetStateAction<string>>;
    setPostedBy?: Dispatch<SetStateAction<string>>;
    setSearchText?: Dispatch<SetStateAction<string>>;
    handleGoPage?: (page: number) => void;
}
export const SearchBarContext = createContext<ISearchBarContext>({
    visibility: '0',
    status: '-1',
    type: '0',
    postedBy: '0',
    searchText: '',
    page: 1,
    posts: [],
    total: 0,
    totalPage: 0,
    isGettingPosts: false,
});

export const SearchBarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [visibility, setVisibility] = useState('0');
    const [statusOpts, setStatusOpts] = useState<string>('-1');
    const [type, setType] = useState('0');
    const [postedBy, setPostedBy] = useState('0');
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<ClientPostList>([]);
    const [isGettingPosts, setIsGettingPosts] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const handleGoPage = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        const fecthPosts = async (data: any) => {
            try {
                setIsGettingPosts(true);
                const res = await clientServices.getPosts({
                    page: data?.page || 1,
                    num: 999,
                    status:
                        data?.statusOpts === '-1' ? undefined : data.statusOpts,
                });
                if (res.data && !isEmpty(res.data.data)) {
                    setPosts(res.data.data);
                    setTotal(res.data.total);
                    setTotalPage(res.data.total_page);
                }
            } catch (error) {
                console.log('error', error);
            } finally {
                setIsGettingPosts(false);
            }
        };
        if (type && postedBy && statusOpts && visibility && page)
            fecthPosts({
                page,
                // type,
                // visibility,
                statusOpts,
                searchText,
                // postedBy,
            });
    }, [postedBy, statusOpts, type, visibility, page, searchText]);

    return (
        <SearchBarContext.Provider
            value={{
                page,
                visibility,
                status: statusOpts,
                type,
                postedBy,
                searchText,
                posts,
                isGettingPosts,
                total,
                totalPage,
                setVisibility,
                setStatus: setStatusOpts,
                setType,
                setPostedBy,
                setSearchText,
                handleGoPage,
            }}
        >
            {children}
        </SearchBarContext.Provider>
    );
};
