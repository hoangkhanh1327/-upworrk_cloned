'use client';

import { useState } from 'react';
import { AccountType } from '@/app/types/signup.types';
import SelectAccountType from './SelectAccountType';
import SignUpForm, { SignUpSubmitValue } from './SignUpForm';
import { loginServices } from '@/app/services/authentication.services';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

const SignUpContainer = () => {
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);
    const [isSignUpSuccess, toggleSignUpSuccess] = useState(false);

    const handleGoToSignUpForm = () => {
        if (accountType) {
            setIsAccountTypeSelected(true);
        }
    };

    const handleCreateAccount = async (data: SignUpSubmitValue) => {
        const params = {
            firstName: data?.firstName,
            lastName: data?.lastName,
            password: data?.password,
            typeUser: accountType || 'client',
            email: data?.email,
            userName: data?.userName,
        };
        if (accountType) {
            const res = await loginServices.signup(params);
            if (res.data) {
                toggleSignUpSuccess(true);
            }
        }
    };

    return (
        <div className='contaienr'>
            {isSignUpSuccess ? (
                <Dialog open={true}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Đăng ký thành công</DialogTitle>
                            <DialogDescription>
                                Vui lòng truy cập hộp thư mail để xác nhận tài
                                khoản của bạn!
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className='justify-end'>
                            <Button className='bg-primary-color hover:bg-primary-color' asChild>
                                <Link href={`/dang-nhap`}>
                                    Tới trang đăng nhập
                                </Link>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : null}
            <div className='mt-8 mb-10'>
                {isAccountTypeSelected ? (
                    <SignUpForm handleCreateAccount={handleCreateAccount} />
                ) : (
                    <SelectAccountType
                        accountType={accountType}
                        setAccountType={setAccountType}
                        handleGoToSignUpForm={handleGoToSignUpForm}
                    />
                )}
            </div>
        </div>
    );
};

export default SignUpContainer;
