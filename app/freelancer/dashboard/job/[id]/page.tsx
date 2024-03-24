import JobDetail from "./components/JobDetail";

interface IPostPage {
    params: {
        id: string;
    };
}

const PostPage: React.FC<IPostPage> = ({ params }) => {
    // return <JobDetail postId={params.id} />;
    return <div>PostPage</div>;
};

export default PostPage;
