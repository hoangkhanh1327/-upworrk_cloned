import LoginForm from './components/LoginForm';

const Login = () => {
    return (
        <div className='flex-1'>
            <div className='container h-full'>
                <div className='w-full h-full flex justify-center items-center'>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
