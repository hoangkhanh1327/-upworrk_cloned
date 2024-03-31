'use client';

import ApplyJob from './components/ApplyJob';
import EditPostProvider from './context/ApplyPostContext';
// import EditPostModalProvider from './provider/EditPostModalProvider';

interface IEditPostPage {
    params: {
        id: string;
    };
}

const EditPostPage: React.FC<IEditPostPage> = ({ params }) => {
    return (
        <main>
            <EditPostProvider>
                <ApplyJob postId={params.id}/>
                {/* <EditPostModalProvider /> */}
            </EditPostProvider>
        </main>
    );
};

export default EditPostPage;
