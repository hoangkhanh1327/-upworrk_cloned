import BannerSection from './components/BannerSection';
import CategoriesSection from './components/CategoriesSection';
import Introduction from './components/IntroductionSection';
import QABussiness from './components/QABussiness';
import QAClientSection from './components/QAClientSection';
import QAEnterpriseSection from './components/QAEnterpriseSection';

export default function Home() {
    return <div>
        <BannerSection />
        <Introduction />
        <CategoriesSection />
        <div className='mx-[9px]'>
            <QAEnterpriseSection />
            <QAClientSection />
            <QABussiness />
        </div>
    </div>;
}
