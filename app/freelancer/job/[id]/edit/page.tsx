'use client';

import EditPostDetail from './components/EditPostDetail';
import EditPostProvider from './context/EditPostContext';
import EditPostModalProvider from './provider/EditPostModalProvider';

interface IEditPostPage {
    params: {
        id: string;
    };
}

const EditPostPage: React.FC<IEditPostPage> = ({ params }) => {
    return (
        <main>
            <EditPostProvider>
                <EditPostDetail postId={params.id} />
                <EditPostModalProvider />
            </EditPostProvider>
        </main>
    );
};

export default EditPostPage;
