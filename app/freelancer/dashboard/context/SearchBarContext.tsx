import { freelancerServices } from '@/app/services/freelancer.services';
import { DetailJobPost } from '@/app/types/freelancer.type';
import { isEmpty } from 'lodash';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

interface ISearchBarContext {
    price: string[];
    status: string;
    dates: string[];
    skills: any[];
    searchText: string;
    posts: DetailJobPost[];
    isGettingPosts: boolean;
    total: number;
    page: number;
    totalPage: number;
    setPrice?: Dispatch<SetStateAction<string[]>>;
    setStatus?: Dispatch<SetStateAction<string>>;
    setDates?: Dispatch<SetStateAction<string[]>>;
    setSkills?: Dispatch<SetStateAction<any[]>>;
    setSearchText?: Dispatch<SetStateAction<string>>;
    handleGoPage?: (page: number) => void;
}
export const SearchBarContext = createContext<ISearchBarContext>({
    price: [''],
    status: '0',
    dates: [''],
    skills: [],
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
    const [price, setPrice] = useState(['']);
    const [statusOpts, setStatusOpts] = useState<string>('0');
    const [dates, setDates] = useState(['']);
    const [skills, setSkills] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<DetailJobPost[]>([]);
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
                const res = await freelancerServices.getPosts({
                    ...data,
                    // page: data?.page || 1,
                    // num: 999,
                });
                if (res.data && !isEmpty(res.data.data)) {
                    setPosts(res.data.data || []);
                    setTotal(res.data.total || 0);
                    setTotalPage(res.data.total_page || 0);
                }
            } catch (error) {
                console.log('error', error);
            } finally {
                setIsGettingPosts(false);
            }
        };
        if (dates && skills && statusOpts && price && page) {
            const params = {
                page,
                status: statusOpts,
                keyword: searchText || '',
                skills: skills?.map((s: any) => s.id)?.toString(),
                bids: price?.toString(),
                deadline: dates.toString(),
            };
            fecthPosts(params);
        }
    }, [skills, statusOpts, dates, price, page, searchText]);

    return (
        <SearchBarContext.Provider
            value={{
                page,
                price,
                status: statusOpts,
                dates,
                skills,
                searchText,
                posts,
                isGettingPosts,
                total,
                totalPage,
                setPrice,
                setStatus: setStatusOpts,
                setDates,
                setSkills,
                setSearchText,
                handleGoPage,
            }}
        >
            {children}
        </SearchBarContext.Provider>
    );
};
