import SignUpForm from '@/components/temp/SignUpForm';
import LoginForm from './components/LoginForm';

const Login = () => {
    return (
        <div className='flex-1'>
            <div className='container h-full'>
                <div className='w-full h-full flex justify-center items-center'>
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
