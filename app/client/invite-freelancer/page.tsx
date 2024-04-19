"use client";

import SearchBar from "../dashboard/components/Searchbar";
import SubHeader from "../dashboard/components/SubHeader";
import {
  SearchBarContext,
  SearchBarProvider,
} from "./context/SearchBarContext";

import Freelancers from "./components/Freelancers";
import { useContext } from "react";
import Pagiantion from "./components/Pagination";

const ListFreelancer = () => {
  return (
    <SearchBarProvider>
      <div className="relative">
        <SearchBar />
        <Freelancers />
        <Pagiantion />
      </div>
    </SearchBarProvider>
  );
};

export default ListFreelancer;
