'use client';

import React from 'react';
import DetailJobInfo from './components/DetailJobInfo';

interface ITaskPage {
    params: {
        id: string;
    };
}
const TaskPage: React.FC<ITaskPage> = ({ params }) => {
    return <DetailJobInfo id={params.id} />;
};

export default TaskPage;
