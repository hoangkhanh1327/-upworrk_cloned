import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ClientPost } from '@/app/types/client.types';
import Link from 'next/link';

dayjs.extend(relativeTime).locale('vi');

interface IPostItem {
    post: ClientPost;
}
const PostItem: React.FC<IPostItem> = ({ post }) => {
    return (
        <Link
            href={`/client/post/${post.id}`}
            className='block p-6 group border-b border-solid border-[#d5e0d5] hover:bg-[#f2f7f2]'
        >
            <small>{dayjs(post.updated_at).fromNow()}</small>
            <h4> {post.title}</h4>
            <p>{post.desc}</p>
            <p>Payment verified</p>
            <p>
                Proposals: <span>{post.min_proposals}</span>
            </p>
        </Link>
    );
};

export default PostItem;
