import { useTaskBoardContext } from './TaskBoardContext';
import { CircleEllipsisIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type BoardTitleProps = {
    title: string;
    status: string | number;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
};

const BoardTitle = (props: BoardTitleProps) => {
    const { title, status, dragHandleProps } = props;
    const { onOpenDialog } = useTaskBoardContext();

    const onAddNewTask = () => {
        onOpenDialog('ADD_NEW_TASk');
    };

    return (
        <div
            className='board-title border border-solid border-stone-500 px-4 py-3 flex justify-between items-center rounded-2xl'
            {...dragHandleProps}
        >
            <h6 className='font-medium text-lg'>{title}</h6>
            {status === '0' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CircleEllipsisIcon role='button' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={onAddNewTask}>
                            <span className='ml-2 rtl:mr-2'>Thêm task mới</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};

export default BoardTitle;
