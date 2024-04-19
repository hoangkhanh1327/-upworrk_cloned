import { clientServices } from "@/app/services/client.services";
import { freelancerServices } from "@/app/services/freelancer.services";
import { FreelancerInfo } from "@/app/types/authentication.types";
import { Invite } from "@/app/types/freelancer.type";
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
  invites: Invite[];
  isGettingInvite: boolean;
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
  page: 1,
  invites: [],
  total: 0,
  totalPage: 0,
  isGettingInvite: false,
});

export const SearchBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visibility, setVisibility] = useState("0");
  const [statusOpts, setStatusOpts] = useState<string>("-1");
  const [type, setType] = useState("0");
  const [postedBy, setPostedBy] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isGettingInvite, setIsGettingInvite] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const handleGoPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const fecthPosts = async (data: any) => {
      try {
        setIsGettingInvite(true);
        const res = await freelancerServices.getListInvite({
          page: data?.page || 1,
          num: constants.PAGE_SIZE,
        });
        console.log("res", res);
        // debugger
        if (res.data && !isEmpty(res.data)) {
          setInvites(res.data.data);
          setTotal(res.data.total);
          setTotalPage(res.data.current_page);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsGettingInvite(false);
      }
    };
    fecthPosts({ page, searchText });
  }, [page, searchText]);

  return (
    <SearchBarContext.Provider
      value={{
        page,
        invites,
        isGettingInvite,
        total,
        totalPage,
        setVisibility,
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
