import { useContext } from "react";
import { SearchBarContext } from "../../context/SearchBarContext";
import PagiantionComp from "@/app/components/Pagiantion";

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
