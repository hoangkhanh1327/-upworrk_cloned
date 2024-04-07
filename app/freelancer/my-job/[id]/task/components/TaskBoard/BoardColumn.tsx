import { Draggable } from 'react-beautiful-dnd';
import BoardCardList, { BaseBoardProps } from './BoardCardList';
import BoardTitle from './BoardTitle';

interface BoardColumnProps extends BaseBoardProps {
    title: string;
    index: number;
    isScrollable?: boolean;
    columnStatus: string;
}

const BoardColumn = (props: BoardColumnProps) => {
    const {
        title,
        contents,
        columnStatus,
        index,
        isScrollable,
        isCombineEnabled,
        useClone,
    } = props;

    return (
        <Draggable draggableId={`task-status-${columnStatus}`} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className='board-column flex flex-col mb-3 min-w-[300px] w-[300px] max-w-[300px] p-0 rounded-lg min-h-[60vh]'
                    {...provided.draggableProps}
                >
                    <div className='px-4 mb-4'>
                        <BoardTitle
                            title={title}
                            status={columnStatus}
                            dragHandleProps={provided.dragHandleProps}
                        />
                    </div>
                    <BoardCardList
                        listId={columnStatus}
                        listType='CONTENT'
                        className={snapshot.isDragging ? 'is-dragging' : ''}
                        contents={contents}
                        internalScroll={isScrollable}
                        isCombineEnabled={isCombineEnabled}
                        useClone={useClone}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default BoardColumn;
