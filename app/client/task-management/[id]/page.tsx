'use client';

import React from 'react';
import ManageTask from './components/ManageTask'

interface ITaskPage {
    params: {
        id: string;
    };
}
const TaskPage: React.FC<ITaskPage> = ({ params }) => {
    return <ManageTask id={params.id} />;
};

export default TaskPage;
