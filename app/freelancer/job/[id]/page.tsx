import PostDetail from './components/PostDetail';

interface IPostPage {
    params: {
        id: string;
    };
}

const PostPage: React.FC<IPostPage> = ({ params }) => {
    return <PostDetail postId={params.id} />;
};

export default PostPage;
