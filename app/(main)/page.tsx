import BannerSection from './components/BannerSection';
import CategoriesSection from './components/CategoriesSection';
import Introduction from './components/IntroductionSection';

export default function Home() {
    return <div>
        <BannerSection />
        <Introduction />
        <CategoriesSection />
    </div>;
}
