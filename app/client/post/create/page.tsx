import FooterNavigation from './components/FooterNavigation';
import { CreatePostProvider } from './context/CreatePostContext';

const CreatePostPage = () => {
    return (
        <main>
            <CreatePostProvider>Create post page

                <FooterNavigation />
            </CreatePostProvider>
        </main>
    );
};

export default CreatePostPage;
