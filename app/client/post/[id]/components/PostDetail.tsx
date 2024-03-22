'use client';

import { clientServices } from '@/app/services/client.services';
import { useEffect, useState } from 'react';

interface IPostDetail {
    postId: string;
}

const PostDetail: React.FC<IPostDetail> = ({ postId }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchPostData = async (postId: string) => {
            try {
                setLoading(true);
                const res = await clientServices.getPost(postId);
                console.log('res', res);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        if (postId) {
            fetchPostData(postId);
        }
    }, [postId]);
    return <section>Data</section>;
};

export default PostDetail;
