import { clientServices } from '@/app/services/client.services';
import { ClientPostList } from '@/app/types/client.types';
import constants from '@/app/utils/constants';
import { isEmpty } from 'lodash';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

interface ISearchBarContext {
    status: string;
    searchText: string;
    posts: ClientPostList;
    isGettingPosts: boolean;
    total: number;
    page: number;
    totalPage: number;
    setStatus?: Dispatch<SetStateAction<string>>;
    setSearchText?: Dispatch<SetStateAction<string>>;
    handleGoPage?: (page: number) => void;
}
export const SearchBarContext = createContext<ISearchBarContext>({
    status: '-1',
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
    const [statusOpts, setStatusOpts] = useState<string>('-1');
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<ClientPostList>([]);
    const [isGettingPosts, setIsGettingPosts] = useState(true);
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
                    num: constants.PAGE_SIZE,
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
        if (statusOpts && page)
            fecthPosts({
                page,
                statusOpts,
                searchText,
            });
    }, [statusOpts, page, searchText]);

    return (
        <SearchBarContext.Provider
            value={{
                page,
                status: statusOpts,
                searchText,
                posts,
                isGettingPosts,
                total,
                totalPage,
                setStatus: setStatusOpts,
                setSearchText,
                handleGoPage,
            }}
        >
            {children}
        </SearchBarContext.Provider>
    );
};
