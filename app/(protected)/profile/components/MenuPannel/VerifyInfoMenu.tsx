import SingleImageUpload from '@/app/components/themes/ImageUpload/SingleImageUpload';
import Upload from '@/app/components/themes/Upload';
import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const verifyInfoForm = yup.object({
    nationalIdFront: yup.mixed().when('documentType', {
        is: 'nationalId',
        then: (schema) =>
            schema.required('Please upload your front National ID'),
        otherwise: (schema) => schema,
    }),
    nationalIdBack: yup.mixed().when('documentType', {
        is: 'nationalId',
        then: (schema) =>
            schema.required('Please upload your back National ID'),
        otherwise: (schema) => schema,
    }),
});

const VerifyInfoMenu = () => {
    const form = useForm({
        resolver: yupResolver(verifyInfoForm),
        defaultValues: {
            nationalIdFront: '',
            nationalIdBack: '',
        },
    });

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log('data', data);
    };

    return (
        <Card className='rounded-2xl mb-8'>
            <CardHeader>
                <CardTitle className='flex items-start justify-between'>
                    Xác thực thông tin tài khoản
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex gap-x-8 mb-8'>
                    Upload hình ảnh CMND/CCCD để xác thực tài khoản.
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-x-2 mb-4'>
                            <FormField
                                control={form.control}
                                name='nationalIdFront'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='!font-semibold'>
                                            Mặt trước
                                        </FormLabel>
                                        <SingleImageUpload
                                            containerClass='my-6'
                                            imageClass='h-[253px]'
                                            onFileUpload={(file) => {
                                                form.setValue(
                                                    'nationalIdFront',
                                                    file
                                                );
                                            }}
                                            onDeleteImage={() => {
                                                form.setValue(
                                                    'nationalIdFront',
                                                    undefined
                                                );
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='nationalIdBack'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='!font-semibold'>
                                            Mặt sau
                                        </FormLabel>
                                        <SingleImageUpload
                                            containerClass='my-6'
                                            imageClass='h-[253px]'
                                            onFileUpload={(file) => {
                                                form.setValue(
                                                    'nationalIdBack',
                                                    file
                                                );
                                            }}
                                            onDeleteImage={() => {
                                                form.setValue(
                                                    'nationalIdBack',
                                                    undefined
                                                );
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='text-right'>
                            <Button
                                // disabled={loading}
                                className='inline-block bg-[#108a00] hover:bg-[#14a800]'
                                type='submit'
                            >
                                {/* {loading && (
                                <ReloadIcon className='mr-2 h-4 w-4 animate-spin inline-flex' />
                            )} */}
                                Xác thực thông tin
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default VerifyInfoMenu;
