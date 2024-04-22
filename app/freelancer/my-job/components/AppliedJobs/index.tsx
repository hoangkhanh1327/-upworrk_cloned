import React, { useContext } from "react";
import JobItem from "./JobItem";
import { SearchBarContext } from "../../context/MyJobSearchBarContext";
import LoadingComponent from "@/app/components/loading";

interface IAppliedJobs {}
const AppliedJobs: React.FC<IAppliedJobs> = () => {
  const { jobs, isGettingJobs } = useContext(SearchBarContext);

  return (
    <>
      {isGettingJobs ? (
        <LoadingComponent />
      ) : (
        <section className="py-6 border-b border-solid border-[#d5e0d5]">
          <div className="flex flex-col">
            {jobs?.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default AppliedJobs;
