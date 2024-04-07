'use client';

import { useEffect, lazy, Suspense } from 'react';

import {
    Droppable,
    DragDropContext,
    DropResult,
    DraggableChildrenFn,
} from 'react-beautiful-dnd';
import BoardColumn from './BoardColumn';
import { reorder, reorderQuoteMap } from './utils';
import { TaskColumns, useTaskBoardContext } from './TaskBoardContext';
import { Dialog, DialogContent } from '@/app/components/ui/dialog';

const CreateTaskForm = lazy(() => import('./TaskForm'));

export type TaskBoardProps = {
    containerHeight?: boolean;
    useClone?: DraggableChildrenFn;
    isCombineEnabled?: boolean;
    withScrollableColumns?: boolean;
    jobId: string;
};

const TaskBoard = (props: TaskBoardProps) => {
    const { onFetchTasks, isOpenDialog, dialogType, onCloseDialog, tasks } =
        useTaskBoardContext();
    const {
        containerHeight,
        useClone,
        isCombineEnabled,
        withScrollableColumns,
    } = props;

    const onDragEnd = (result: DropResult) => {
        if (result.combine) {
            const columns: any[] = [];
            if (result.type === 'COLUMN') {
                const shallow: any[] = [];
                shallow.splice(result.source.index, 1);
                // dispatch(updateOrdered(shallow));
                return;
            }
            console.log('test', result);

            const column = columns[0];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const newColumns = {
                ...columns,
                [result.source.droppableId]: withQuoteRemoved,
            };
            // dispatch(updateColumns(newColumns));
            return;
        }

        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (result.type === 'COLUMN') {
            const newOrdered = reorder([], source.index, destination.index);
            return;
        }

        const data = reorderQuoteMap({
            quoteMap: [] as any,
            source,
            destination,
        });
    };

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
                <DialogContent>
                    <Suspense fallback={<></>}>
                        {dialogType === 'ADD_NEW_TASk' && (
                            <CreateTaskForm jobId={props.jobId} type='new' />
                        )}
                    </Suspense>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TaskBoard;
