import { useContext } from 'react';
import { SearchBarContext } from '../../context/SearchBarContext';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagiantion = () => {
    const { total, totalPage, page, handleGoPage } =
        useContext(SearchBarContext);
    const start = Math.max((page - 1) * 4, 1);
    const end = Math.min(start + (4 - 1), total - 1);
    ``;
    return (
        <div className='py-6 flex items-center justify-between'>
            <div>
                <span>
                    {start} - {end}
                </span>
                <span>{` of ${total} `}</span>
                <span>{` Job posts `}</span>
            </div>
            <ul className='flex items-center gap-x-1 text-sm'>
                <li>
                    <Button
                        className={cn(
                            'bg-transparent hover:bg-transparent flex items-center',
                            page === 1
                                ? 'cursor-not-allowed text-[#9aaa97]'
                                : 'text-[#9aaa97] cursor-pointer'
                        )}
                        onClick={() => handleGoPage?.(page - 1)}
                    >
                        <ChevronLeft className='-mt-[2px]' /> Previous
                    </Button>
                </li>
                {[...Array(totalPage + 3)].map((_, index) => {
                    const isActive = page === index + 1;
                    return (
                        <li key={`pagination-${index}`}>
                            <Button
                                disabled={isActive}
                                onClick={() => {
                                    handleGoPage?.(index + 1);
                                }}
                                className={cn(
                                    'p-0 text w-6 h-6 flex items-center justify-center rounded-full text-[12px] leading-[12px] disabled:opacity-100',
                                    isActive
                                        ? '!bg-[#108a00] text-white hover:opacity-85'
                                        : 'bg-[#dddddd]  text-black hover:bg-[#cccccc]'
                                )}
                            >
                                <span className='mt-[1px]'>{index + 1}</span>
                            </Button>
                        </li>
                    );
                })}

                <li>
                    <Button
                        className={cn(
                            'bg-transparent hover:bg-transparent',
                            page === totalPage
                                ? 'cursor-not-allowed text-[#9aaa97]'
                                : 'text-[#9aaa97] cursor-pointer'
                        )}
                        onClick={() => handleGoPage?.(page + 1)}
                    >
                        Next <ChevronRight className='-mt-[2px]' />
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default Pagiantion;
