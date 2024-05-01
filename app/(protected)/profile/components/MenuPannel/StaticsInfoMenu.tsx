import { Card, CardContent } from "@/app/components/ui/card";
import ClientStatics from "./ClientStatics";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import FreelancerStatics from "./FreelancerStatics";


const StaticsInfoMenu = () => {
    const [accountType, setAccountType] = useState('');

    useEffect(() => {
        const accountType = Cookies.get('account_type');
        setAccountType(accountType || '');
    }, []);
    return <Card className='rounded-2xl mb-8'>
        
        <CardContent>
            {accountType=='client'?<ClientStatics></ClientStatics>:<FreelancerStatics></FreelancerStatics>}
    </CardContent>
    </Card>
    
 }
export default StaticsInfoMenu;