import SingleImageUpload from '@/app/components/themes/ImageUpload/SingleImageUpload';
import Upload from '@/app/components/themes/Upload';
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
import { NotificationContext } from '@/app/providers/NotificationProvider';
import { loginServices } from '@/app/services/authentication.services';
import { commonServices } from '@/app/services/common.services';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spin } from 'antd';
import { useContext, useState } from 'react';
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
type IVerifyCard = {
    setProcess: any;
    userType: string;
  };
const VerifyCard = ({ setProcess, userType }: IVerifyCard) => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: yupResolver(verifyInfoForm),
        defaultValues: {
            nationalIdFront: '',
            nationalIdBack: '',
        },
    });
    let { openNotificationWithIcon } = useContext(NotificationContext);
    const onSubmit: SubmitHandler<any> = async(data) => {
        console.log('data', data);
        setLoading(true);
        // Sau khi xác thực tài khoản thành công
        const res =await commonServices.verifyCard(data.nationalIdFront)
        console.log("data", res);
        setLoading(false);
        if (res) {
            const type=res.result==0?'success':'error';
            openNotificationWithIcon(
                type,
                "Thông Báo",
                res.message
            );
            if(res.result==0)
              setProcess(3); 
        }
        else {
            openNotificationWithIcon(
                "error",
                "Xác thực thất bại",
                "Có lỗi khi xác thực vui lòng thử lại."
              ); 
        }
       
        
        // if (res.data) {
        //     window.location.reload();
        // }
    };

    return (
        <Spin spinning={loading} tip="Đang xác thực...">
        <Card className=' mb-8' style={{marginTop:'20px'}}>
            <CardHeader>
                <CardTitle className='flex items-start justify-between'>
                    Xác thực thông tin tài khoản
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex gap-x-8 mb-8'>
                    Upload hình ảnh CCCD để xác thực tài khoản.
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
                        <div  style={{display:'flex',justifyContent:'center'}}>
                        <Button
                className="rounded-[16rem] bg-primary-color hover:bg-primary-color/80 text-white"
                htmlType="submit"
              >
                Xác thực
              </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            </Card>
            </Spin>
    );
};

export default VerifyCard;
