import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Applied } from '@/app/types/client.types';
import { format } from 'date-fns';

interface IAppliedTable {
    appliedList: Applied[];
}

const AppliedTable: React.FC<IAppliedTable> = ({ appliedList = [] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[100px] text-center font-medium'>
                        #
                    </TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className='text-center'>Proposal</TableHead>
                    <TableHead className='text-right'>
                        Ngày tạo tài khỏan
                    </TableHead>
                    <TableHead className='text-center'>Giới thiệu</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appliedList.map((i, index) => (
                    <TableRow key={`applied-job-item-${i.id}`}>
                        <TableCell className='font-medium text-center'>
                            {index + 1}
                        </TableCell>
                        <TableCell>{i.username}</TableCell>
                        <TableCell className='text-center'>
                            ${i.proposal}
                        </TableCell>
                        <TableCell className='text-center'>
                            {format(i.created_at, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>{i.cover_letter}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AppliedTable;
