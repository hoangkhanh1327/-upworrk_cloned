'use client';

import { useState } from 'react';
import { AccountType } from '@/@types/signup.types';
import SelectAccountType from './SelectAccountType';
import SignUpForm, { SignUpSubmitValue } from './SignUpForm';

const SignUpContainer = () => {
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);

    const handleGoToSignUpForm = () => {
        if (accountType) {
            setIsAccountTypeSelected(true);
        }
    };

    const handleCreateAccount = (data: SignUpSubmitValue) => {
        // TODO: gắn api vô đây
        console.log('data', data);
    };

    return (
        <div className='contaienr'>
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
