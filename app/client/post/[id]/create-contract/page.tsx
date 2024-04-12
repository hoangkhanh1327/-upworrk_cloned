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

// import EditPostDetail from './components/EditPostDetail';
// import EditPostProvider from './context/EditPostContext';
// import EditPostModalProvider from './provider/EditPostModalProvider';

// interface IEditPostPage {
//     params: {
//         id: string;
//     };
// }

// const EditPostPage: React.FC<IEditPostPage> = ({ params }) => {
//     return (
//         <main>
//             <EditPostProvider>
//                 <EditPostDetail postId={params.id} />
//                 <EditPostModalProvider />
//             </EditPostProvider>
//         </main>
//     );
// };

// export default EditPostPage;
