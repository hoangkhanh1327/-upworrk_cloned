'use client';

import DetailUserInfo from "./components/DetailUserInfo";


interface IFreelancerInfo {
    params: {
        user_id: string;
        user_type: string;
    };
}
const FreelancerInfo: React.FC<IFreelancerInfo> = ({ params }) => {
    return <DetailUserInfo userId={params.user_id} userType={params.user_type} />;
};

export default FreelancerInfo;
