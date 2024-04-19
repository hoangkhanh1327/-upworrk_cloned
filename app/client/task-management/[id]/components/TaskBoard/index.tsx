'use client';

import { useEffect, lazy, Suspense, useCallback, useState } from 'react';

import {
    Droppable,
    DragDropContext,
    DropResult,
    DraggableChildrenFn,
} from 'react-beautiful-dnd';
import { TaskColumns, useTaskBoardContext } from './TaskBoardContext';
import { Dialog, DialogContent } from '@/app/components/ui/dialog';
import { Task } from '@/app/types/task.types';
import { taskServices } from '@/app/services/task.services';
import { useToast } from '@/app/components/ui/use-toast';
import { LucideLoader } from 'lucide-react';
import BoardColumn from './BoardColumn';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/app/components/ui/drawer';
import { Button } from '@/app/components/ui/button';

const CreateTaskForm = lazy(() => import('./TaskForm'));

export type TaskBoardProps = {
    containerHeight?: boolean;
    useClone?: DraggableChildrenFn;
    isCombineEnabled?: boolean;
    withScrollableColumns?: boolean;
    jobId: string;
};

const TaskBoard = (props: TaskBoardProps) => {
    const {
        onFetchTasks,
        isOpenDialog,
        dialogType,
        onCloseDialog,
        tasks,
        setTasks,
        selectedTask,
        isOpenDrawer,
    } = useTaskBoardContext();
    const {
        containerHeight,
        useClone,
        isCombineEnabled,
        withScrollableColumns,
    } = props;
    const { toast } = useToast();
    const [showLoadingDialog, setLoadingDialog] = useState(false);

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (type === 'COLUMN') {
            return;
        }

        if (source.droppableId === '1' && destination.droppableId === '3') {
            const taskId = draggableId?.replace('task-', '');
            try {
                setLoadingDialog(true);
                const res = await taskServices.clientConfirmUpdateStatus({
                    id: taskId,
                    confirm_status: '-1',
                });
                if (res.data) {
                    const updatedTaskList = tasks?.map((t) => {
                        if (t.id === res.data.id) {
                            return res.data;
                        }
                        return t;
                    });
                    toast({
                        title: 'Cập nhật trạng thái task thành công',
                    });
                    setTasks?.(updatedTaskList);
                }
            } catch (error) {
                toast({
                    title: 'Cập nhật trạng thái task thất bại',
                    description: (error as Error)?.message,
                    variant: 'destructive',
                });
            } finally {
                setLoadingDialog(false);
            }
        } else {
            toast({
                title: 'Bạn không có quyền cập nhật trạng thái này',
                variant: 'destructive',
            });
            return;
        }
    };

    const handleUpdateTaskList = useCallback(
        (data: Task) => {
            const isExisted = tasks?.findIndex(
                (t) => t.id.toString() === data?.id?.toString()
            );
            if (isExisted > -1) {
                let updatedTask = [...tasks];
                updatedTask?.splice(isExisted, 1, data);
                setTasks?.(updatedTask);
            } else {
                setTasks?.((prev) => [data, ...prev]);
            }
        },
        [tasks, setTasks]
    );

    const handleDeleteTaskFromList = useCallback(
        (data: string) => {
            setTasks?.((prev) =>
                [...prev].filter((s) => s.id?.toString() !== data?.toString())
            );
        },
        [setTasks]
    );

    useEffect(() => {
        onFetchTasks?.(props.jobId);
    }, [props.jobId]);

    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId='board'
                    type='COLUMN'
                    direction='horizontal'
                    ignoreContainerClipping={containerHeight}
                    isCombineEnabled={isCombineEnabled}
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            className='scrumboard flex flex-col flex-auto w-full h-full mb-2'
                            {...provided.droppableProps}
                        >
                            <div className='scrumboard-body flex justify-between max-w-full overflow-x-auto h-full mt-4'>
                                {TaskColumns.map((col, index) => {
                                    let data: Task[];
                                    if (col.key === '3') {
                                        data = tasks?.filter(
                                            (t) =>
                                                t.confirm_status?.toString() ===
                                                '1'
                                        );
                                    } else {
                                        data = tasks?.filter(
                                            (t) =>
                                                t.status?.toString() === col.key
                                        );
                                    }
                                    return (
                                        <BoardColumn
                                            columnStatus={col.key}
                                            key={col.key}
                                            index={index}
                                            title={col.title}
                                            contents={data}
                                            isScrollable={withScrollableColumns}
                                            isCombineEnabled={isCombineEnabled}
                                            useClone={useClone}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Dialog open={isOpenDialog} onOpenChange={() => onCloseDialog()}>
                <DialogContent className='max-w-[30vw]'>
                    <Suspense fallback={<></>}>
                        {dialogType === 'ADD_NEW_TASK' && (
                            <CreateTaskForm
                                jobId={props.jobId}
                                type='new'
                                onSuccess={(data) =>
                                    handleUpdateTaskList(data as Task)
                                }
                                onDeleteSuccess={(data) =>
                                    handleDeleteTaskFromList(data)
                                }
                                onClose={() => onCloseDialog()}
                            />
                        )}
                        {dialogType === 'UPDATE_TASK' && (
                            <CreateTaskForm
                                jobId={props.jobId}
                                type='edit'
                                onSuccess={(data) =>
                                    handleUpdateTaskList(data as Task)
                                }
                                onDeleteSuccess={(data) =>
                                    handleDeleteTaskFromList(data)
                                }
                                onClose={() => onCloseDialog()}
                                initialData={selectedTask}
                            />
                        )}
                    </Suspense>
                </DialogContent>
            </Dialog>
            <Drawer
                open={isOpenDrawer}
                onClose={() => onCloseDialog()}
                direction='right'
            >
                <DrawerContent className='w-[30vw] top-0 right-0 h-screen overflow-y-auto'>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant='outline'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {showLoadingDialog && (
                <div
                    className='fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
                    style={{
                        pointerEvents: 'auto',
                    }}
                    data-aria-hidden='true'
                    aria-hidden='true'
                >
                    <div
                        role='dialog'
                        className='fixed left-[50%] top-[50%] z-50 grid  translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg'
                        tabIndex={-1}
                        style={{
                            pointerEvents: 'auto',
                        }}
                    >
                        <LucideLoader className='h-5 w-5 animate-spin inline-flex' />
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskBoard;
