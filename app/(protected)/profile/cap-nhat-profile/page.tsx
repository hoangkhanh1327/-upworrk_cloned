'use client';

import { Button } from '@/app/components/ui/button';
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOutlined,IdcardOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import AddPersonInfo from './components/AddPersonInfo/AddPersonInfo';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import VerifyInfoMenu from '../components/MenuPannel/VerifyInfoMenu';
import VerifyCard from './components/VerifyCard/VerifyCard';
import DoneUpdate from './components/DoneUpdate/DoneUpdate';

const AddProfileInfo = () => {
    const [accountType, setAccountType] = useState('');
    const router = useRouter();
    const [process, setProcess] = useState(3);

    useEffect(() => {
        const accountType = Cookies.get('account_type');
        setAccountType(accountType || '');
    }, []);
    const WorkSteps:any = [
        {
            title: 'Thông tin cá nhân',
            status: process>0?'wait':'finish',
            icon: process==0?<LoadingOutlined />:<UserOutlined />,
        },
        {
            title: 'Trang Giới Thiệu',
            status: process>1?'wait':'finish',
            icon: process==1?<LoadingOutlined />:<SolutionOutlined />,
        },
        {
            title: 'Xác Minh CCCD',
            status: process>2?'wait':'finish',
            icon:process==2?<LoadingOutlined />:<IdcardOutlined />,
        },
        {
            title: 'Hoàn Tất',
            status: process>3?'wait':'finish',
            icon: process==3?<LoadingOutlined />:<SmileOutlined />,
        },
    ];

    return (
        <div className=''>
            <Steps
            items={WorkSteps}
            />
            {process == 0 ? <AddPersonInfo setProcess={setProcess} userType={accountType}></AddPersonInfo> : <></>}
            {process == 1 ? <UpdateProfile setProcess={setProcess} userType={accountType}></UpdateProfile> : <></>}
            {process == 2 ? <VerifyCard setProcess={setProcess} userType={accountType}></VerifyCard> : <></>}
            {process==3?<DoneUpdate></DoneUpdate>:<></> }
        </div>
    );
};

export default AddProfileInfo;
