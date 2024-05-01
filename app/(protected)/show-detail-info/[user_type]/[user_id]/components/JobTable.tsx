import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Job } from '@/app/types/authentication.types';
import { format } from 'date-fns';

interface IJobTable {
    job: Job[];
}

const JobTable: React.FC<IJobTable> = ({ job = [] }) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px] text-center font-medium'>
                            STT
                        </TableHead>
                        <TableHead>Tên công việc</TableHead>
                        <TableHead className='text-center'>Bids</TableHead>
                        <TableHead className='text-center'>
                            Ngày đáo hạn
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {job.map((i, index) => (
                        <TableRow key={`applied-job-item-${index}`}>
                            <TableCell className='font-medium text-center'>
                                {index + 1}
                            </TableCell>
                            <TableCell>{i.title}</TableCell>
                            <TableCell className='text-center'>
                                ${i.bids}
                            </TableCell>
                            <TableCell className='text-center'>
                                {format(i.deadline, 'dd/MM/yyyy')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default JobTable;
