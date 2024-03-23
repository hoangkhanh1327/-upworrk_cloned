'use client'; 
import { Input } from '@/app/components/ui/input';
import { CreatePostContext } from '../../context/CreatePostContext';
import { useContext } from 'react';
import { FormControl, FormField, FormItem } from '@/app/components/ui/form';

const StepOne = () => {
    
    return (
        <div className='grid grid-cols-2 gap-x-8 px-12 mx-12'>
            <div>
                <small className='mb-6 inline-block text-sm'>
                    {`1/5`} <span className='ml-6'>Job post</span>
                </small>
                <h2 className='mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza'>{`Let's start with a strong title and description.`}</h2>
                <p className='text-sm leading-5 mb-8'>
                    {`This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!`}
                </p>
            </div>
            <div>
                <h5>Write a title for your job post</h5>
                {/* <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                /> */}
            </div>
        </div>
    );
};

export default StepOne;
