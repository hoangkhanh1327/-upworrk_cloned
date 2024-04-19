import { clientServices } from '@/app/services/client.services';
import { FreelancerInfo } from '@/app/types/authentication.types';
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
    visibility: string;
    status: string;
    type: string;
    postedBy: string;
    searchText: string;
    freelancers: FreelancerInfo[];
    isGettingFreelancers: boolean;
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
    freelancers: [],
    total: 0,
    totalPage: 0,
    isGettingFreelancers: false,
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
    const [freelancers, setFreelancers] = useState<FreelancerInfo[]>([]);
    const [isGettingFreelancers, setIsGettingFreelancers] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const handleGoPage = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        const fecthPosts = async (data: any) => {
            try {
                setIsGettingFreelancers(true);
                const res = await clientServices.getListFreeLancer({
                    page: data?.page || 1,
                    num: constants.PAGE_SIZE,
                    status:
                        data?.statusOpts === '-1' ? undefined : data.statusOpts,
                });
                if (res.data && !isEmpty(res.data)) {
                    setFreelancers(res.data.data);
                    setTotal(res.data.total);
                    setTotalPage(res.data.total_page);
                }
            } catch (error) {
                console.log('error', error);
            } finally {
                setIsGettingFreelancers(false);
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
                freelancers,
                isGettingFreelancers,
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
