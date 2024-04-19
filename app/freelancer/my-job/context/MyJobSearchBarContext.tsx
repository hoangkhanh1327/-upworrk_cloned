import { freelancerServices } from "@/app/services/freelancer.services";
import { AppliedJob } from "@/app/types/freelancer.type";
import constants from "@/app/utils/constants";
import { isEmpty } from "lodash";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface ISearchBarContext {
  page: number;
  status: string;
  searchText: string;
  jobs: AppliedJob[];
  total: number;
  totalPage: number;
  isGettingJobs: boolean;
  setStatus?: Dispatch<SetStateAction<string>>;
  setSearchText?: Dispatch<SetStateAction<string>>;
  handleGoPage?: (page: number) => void;
}

export const statusOpts = [
  {
    value: "-2",
    label: "Tất cả",
  },
  {
    value: "1",
    label: "Đã apply",
  },
  {
    value: "-1",
    label: "Đã bị loại",
  },
  {
    value: "2",
    label: "Được mời",
  },
  {
    value: "3",
    label: "Đang trong thời gian làm việc",
  },
  {
    value: "4",
    label: "Công việc đã hoàn thành",
  },
];

export const SearchBarContext = createContext<ISearchBarContext>({
  page: 1,
  status: "",
  searchText: "",
  jobs: [],
  isGettingJobs: false,
  total: 0,
  totalPage: 0,
});

export const SearchBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [statusOpts, setStatusOpts] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [isGettingJobs, setIsGettingJobs] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const handleGoPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const fecthPosts = async (data: any) => {
      try {
        setIsGettingJobs(true);
        const res = await freelancerServices.getAppliedJobs({
          page: data?.page || 1,
          num: constants.PAGE_SIZE,
          status: data?.statusOpts === "-2" ? "" : data?.statusOpts,
        });
        if (res.data && !isEmpty(res.data)) {
          setJobs(res.data.data);
          setTotal(res.data.total);
          setTotalPage(res.data.total_page);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsGettingJobs(false);
      }
    };
    fecthPosts({
      statusOpts,
    });
  }, [statusOpts, page]);

  return (
    <SearchBarContext.Provider
      value={{
        page,
        status: statusOpts,
        searchText,
        jobs,
        total,
        totalPage,
        isGettingJobs,
        setStatus: setStatusOpts,
        setSearchText,
        handleGoPage,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
