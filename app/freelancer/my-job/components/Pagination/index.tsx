import { useContext } from "react";
import PagiantionComp from "@/app/components/Pagiantion";
import { SearchBarContext } from "../../context/MyJobSearchBarContext";

const Pagiantion = () => {
  const { total, totalPage, page, handleGoPage } = useContext(SearchBarContext);
  return (
    <PagiantionComp
      total={total}
      totalPage={totalPage}
      page={page}
      handleGoPage={handleGoPage || (() => {})}
    />
  );
};

export default Pagiantion;
