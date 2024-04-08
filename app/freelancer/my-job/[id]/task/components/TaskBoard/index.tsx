'use client';

import { useEffect, lazy, Suspense, useCallback, useState } from 'react';

import {
    Droppable,
    DragDropContext,
    DropResult,
    DraggableChildrenFn,
} from 'react-beautiful-dnd';
import BoardColumn from './BoardColumn';
import { TaskColumns, useTaskBoardContext } from './TaskBoardContext';
import { Dialog, DialogClose, DialogContent } from '@/app/components/ui/dialog';
import { Task } from '@/app/types/task.types';
import { taskServices } from '@/app/services/task.services';
import { useToast } from '@/app/components/ui/use-toast';
import { LucideLoader } from 'lucide-react';

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

        if (destination.droppableId === '3') {
            toast({
                title: 'Bạn không có quyền cập nhật trạng thái này',
                variant: 'destructive',
            });
            return;
        }

        const taskId = draggableId?.replace('task-', '');
        const updateStatus = destination.droppableId;
        try {
            setLoadingDialog(true);
            const res = await taskServices.freelancerUpdateJobStatus({
                id: taskId,
                status: updateStatus,
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
    };

    const handleUpdateTaskList = useCallback(
        (data: Task) => {
            setTasks?.((prev) => [data, ...prev]);
        },
        [setTasks]
    );

    const handleDeleteTaskFromList = useCallback(
        (data: string) => {
            console.log('data', data);

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
                                    const data = tasks?.filter(
                                        (t) => t.status?.toString() === col.key
                                    );
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
                                onClose={() => onCloseDialog()}
                            />
                        )}
                        {dialogType === 'UPDATE_TASK' && (
                            <CreateTaskForm
                                jobId={props.jobId}
                                type='edit'
                                onSuccess={(data) =>
                                    handleDeleteTaskFromList(data as string)
                                }
                                onClose={() => onCloseDialog()}
                                initialData={selectedTask}
                            />
                        )}
                    </Suspense>
                </DialogContent>
            </Dialog>
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
