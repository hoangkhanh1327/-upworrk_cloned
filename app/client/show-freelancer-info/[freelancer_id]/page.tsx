'use client';

import DetailFreelancerInfo from './components/DetailFreelancerInfo';

interface IFreelancerInfo {
    params: {
        freelancer_id: string;
    };
}
const FreelancerInfo: React.FC<IFreelancerInfo> = ({ params }) => {
    return <DetailFreelancerInfo freelancerId={params.freelancer_id} />;
};

export default FreelancerInfo;
