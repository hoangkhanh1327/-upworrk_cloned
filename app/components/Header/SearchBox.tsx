import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchBox = () => {
  return (
      <div className="flex items-center border-2 border-stone-200 border-solid rounded-[20px] overflow-hidden relative">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer" />
        <Input
          className="pl-10 border-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-base text-base"
          placeholder="Tìm kiếm"
          size={20}
        />
      </div>
  );
};

export default SearchBox;
