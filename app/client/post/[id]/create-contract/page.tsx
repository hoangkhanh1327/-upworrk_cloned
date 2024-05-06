"use client";
import React from "react";
import PostDetailProvider from "../context/PostDetailProvider";
import CreateContractDetail from "./components/CreateContractDetail";

interface ICreateContract {
  params: {
    id: string;
  };
}
const CreateContract: React.FC<ICreateContract> = ({ params }) => {
  return (
    <main className="container w-[80%]">
      <PostDetailProvider>
        <CreateContractDetail postId={params.id} />
      </PostDetailProvider>
    </main>
  );
};
export default CreateContract;