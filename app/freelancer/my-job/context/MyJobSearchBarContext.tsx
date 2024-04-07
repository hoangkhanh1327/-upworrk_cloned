import { freelancerServices } from '@/app/services/freelancer.services';
import { AppliedJob } from '@/app/types/freelancer.type';
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
    jobs: AppliedJob[];
    isGettingJobs: boolean;
    setStatus?: Dispatch<SetStateAction<string>>;
    setSearchText?: Dispatch<SetStateAction<string>>;
}

export const statusOpts = [
    {
        value: '1',
        label: 'Đã apply',
    },
    {
        value: '-1',
        label: 'Đã bị loại',
    },
    {
        value: '2',
        label: 'Được mời',
    },
    {
        value: '3',
        label: 'Đang trong thời gian làm việc',
    },
    {
        value: '4',
        label: 'Công việc đã hoàn thành',
    },
];

export const SearchBarContext = createContext<ISearchBarContext>({
    status: '',
    searchText: '',
    jobs: [],
    isGettingJobs: false,
});

export const SearchBarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [statusOpts, setStatusOpts] = useState<string>('');
    const [searchText, setSearchText] = useState('');
    const [jobs, setJobs] = useState<AppliedJob[]>([]);
    const [isGettingJobs, setIsGettingJobs] = useState(false);


    useEffect(() => {
        const fecthPosts = async (data: any) => {
            try {
                setIsGettingJobs(true);
                const res = await freelancerServices.getAppliedJobs({
                    page: data?.page || 1,
                    status: 1,
                });
                if (res.data && !isEmpty(res.data)) {
                    setJobs(res.data);
                }
            } catch (error) {
                console.log('error', error);
            } finally {
                setIsGettingJobs(false);
            }
        };
        fecthPosts({
            statusOpts,
        });
    }, [statusOpts]);

    return (
        <SearchBarContext.Provider
            value={{
                status: statusOpts,
                searchText,
                jobs,
                isGettingJobs,
                setStatus: setStatusOpts,
                setSearchText,
            }}
        >
            {children}
        </SearchBarContext.Provider>
    );
};
