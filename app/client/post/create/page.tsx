'use client';

import FooterNavigation from './components/FooterNavigation';
import FormCreateContainer from './components/FormCreateContainer';
import { CreatePostProvider } from './context/CreatePostContext';

const CreatePostPage = () => {
    return (
        <main>
            <CreatePostProvider>
                <FormCreateContainer />
                <FooterNavigation />
            </CreatePostProvider>
        </main>
    );
};

export default CreatePostPage;
