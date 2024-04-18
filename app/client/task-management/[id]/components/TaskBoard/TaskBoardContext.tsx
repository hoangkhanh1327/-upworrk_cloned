import { taskServices } from '@/app/services/task.services';
import { Task } from '@/app/types/task.types';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';

type TaskBoardDialogType = 'ADD_NEW_TASK' | 'UPDATE_TASK';

interface ITaskBoardContext {
    loading: boolean;
    isOpenDialog: boolean;
    isOpenDrawer: boolean;
    dialogType?: TaskBoardDialogType;
    tasks: Task[];
    onOpenDialog: (type: TaskBoardDialogType, data?: Task) => void;
    onOpenDrawer: (data: Task) => void;
    onCloseDialog: () => void;
    onFetchTasks: (jobId: string) => void;
    setTasks?: Dispatch<SetStateAction<Task[]>>;
    selectedTask: Task | null;
}

const TaskBoardContext = createContext<ITaskBoardContext | null>(null);

export const useTaskBoardContext = () => {
    const context = useContext(TaskBoardContext);
    if (!context) {
        throw new Error(
            'useTaskBoardContext must be used in TaskBoardProvider'
        );
    }
    return context;
};

export const TaskColumns = [
    {
        key: '-1',
        title: 'Chưa thực hiện',
    },
    {
        key: '0',
        title: 'Đang tiến hành',
    },
    {
        key: '1',
        title: 'Hoàn thành chức năng',
    },
    {
        key: '3',
        title: 'Hoàn thành yêu cầu',
    },
];

const TaskBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [dialogType, setDialogType] = useState<
        TaskBoardDialogType | undefined
    >(undefined);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleOpenDialog = useCallback(
        (type: TaskBoardDialogType, data?: Task) => {
            setOpenDialog(true);
            setDialogType(type);
            if (data) {
                setSelectedTask(data);
            }
        },
        []
    );

    const handleOpenDrawer = useCallback((data: Task) => {
        setOpenDrawer(true);
        setSelectedTask(data);
    }, []);

    const handleCloseDialogg = useCallback(() => {
        setOpenDialog(false);
        setOpenDrawer(false);
        setDialogType(undefined);
    }, []);

    const fetchTasks = useCallback(async (jobId: string) => {
        try {
            setLoading(true);
            const res = await taskServices.getJobTask(jobId);
            setTasks(res.data);
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <TaskBoardContext.Provider
            value={{
                loading,
                isOpenDialog,
                isOpenDrawer,
                dialogType,
                tasks,
                selectedTask,
                onOpenDialog: handleOpenDialog,
                onOpenDrawer: handleOpenDrawer,
                onCloseDialog: handleCloseDialogg,
                onFetchTasks: fetchTasks,
                setTasks: setTasks,
            }}
        >
            {children}
        </TaskBoardContext.Provider>
    );
};

export default TaskBoardProvider;
