"use client";

import FeeBack from "./components/Feebacks/Feeback";

interface IRate {
  params: {
    user_id: string;
      job_id: string;
    user_type: string;
  };
}
const Rate: React.FC<IRate> = ({ params }) => {
  return (
    <>
      <FeeBack user_id={params.user_id} job_id={params.job_id}></FeeBack>
    </>
  );
};

export default Rate;
