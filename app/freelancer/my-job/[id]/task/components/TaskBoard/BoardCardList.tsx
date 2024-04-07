import {
    Draggable,
    Droppable,
    DraggableChildrenFn,
    DroppableProvided,
} from 'react-beautiful-dnd';
import BoardCard from './BoardCard';
import type { CSSProperties } from 'react';
import { Task } from '@/app/types/task.types';

export interface BaseBoardProps {
    contents?: Task[];
    useClone?: DraggableChildrenFn;
    isCombineEnabled?: boolean;
}

interface BoardCardListProps extends BaseBoardProps {
    ignoreContainerClipping?: boolean;
    internalScroll?: boolean;
    scrollContainerStyle?: CSSProperties;
    isDropDisabled?: boolean;
    listId?: string;
    style?: CSSProperties;
    listType?: string;
    className?: string;
}

type InnerListProps = {
    dropProvided: DroppableProvided;
    contents?: Task[];
};

function InnerList(props: InnerListProps) {
    const { dropProvided, contents, ...rest } = props;

    return (
        <div ref={dropProvided.innerRef} className='board-dropzone h-full'>
            <div className='px-4 h-full'>
                {contents?.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={`task-${item.id?.toString()}`}
                        index={index}
                    >
                        {(dragProvided) => (
                            <BoardCard
                                ref={dragProvided.innerRef}
                                data={item}
                                {...rest}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                            />
                        )}
                    </Draggable>
                ))}
            </div>
        </div>
    );
}

const BoardCardList = (props: BoardCardListProps) => {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId = 'LIST',
        style,
        listType,
        contents,
        useClone,
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={useClone}
        >
            {(dropProvided) => (
                <div
                    style={style}
                    className='board-wrapper overflow-hidden flex-auto'
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <div
                            className='board-scrollContainer'
                            style={scrollContainerStyle}
                        >
                            <InnerList
                                contents={contents}
                                dropProvided={dropProvided}
                            />
                        </div>
                    ) : (
                        <InnerList
                            contents={contents}
                            dropProvided={dropProvided}
                        />
                    )}
                    {dropProvided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default BoardCardList;
