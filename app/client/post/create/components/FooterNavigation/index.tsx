'use client';

import { useContext } from 'react';
import { CreatePostContext } from '../../context/CreatePostContext';
import { Progress } from '@/app/components/ui/progress';

const FooterNavigation = () => {
    const { step, goNextStep, goPreviousStep } = useContext(CreatePostContext)
    return ( 
        <footer>
            <Progress value={100} className='h-1' color='#14a800'/>
        </footer>
     );
}
 
export default FooterNavigation;