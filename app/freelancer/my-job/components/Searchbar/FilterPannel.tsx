// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select";
import { StatusOptions } from "./filterData";
import { useContext } from "react";
import { SearchBarContext } from "../../context/MyJobSearchBarContext";
import { Select } from "antd";

const FilterPannel = () => {
  const { status, setStatus } = useContext(SearchBarContext);
  const handleChange = (value: string) => {
    setStatus?.(value);
  };

  return (
    <div className="grid grid-cols-4 gap-x-6">
      <div className="col-span-2 grid grid-cols-3 gap-x-5">
        <div>
          <Select
            size="large"
            placeholder="Trạng thái công việc"
            defaultValue={status}
            onChange={handleChange}
            style={{ width: 280 }}
            options={StatusOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPannel;
