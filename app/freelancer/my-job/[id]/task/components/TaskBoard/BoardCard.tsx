import { forwardRef } from 'react';
import classNames from 'classnames';
import { Card } from '@/app/components/ui/card';

interface BoardCardProps {
    data: any;
}

const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
    const { data, ...rest } = props;

    const { id, name, comments, attachments, members, dueDate, labels } = data;

    const onCardClick = () => {
        // dispatch(openDialog())
        // dispatch(updateDialogView('TICKET'))
        // dispatch(setSelectedTicketId(id))
    };

    return (
        <Card
            ref={ref}
            className={classNames(
                'hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50'
            )}
            onClick={() => onCardClick()}
            {...rest}
        >
            <h6 className='mb-2'>{name}</h6>

            <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-2'></div>
            </div>
        </Card>
    );
});

BoardCard.displayName = 'BoardCard';

export default BoardCard;
