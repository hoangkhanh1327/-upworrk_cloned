import MyJobDetail from './components/MyJobDetail';

interface IMyJobJobPage {
    params: {
        id: string;
    };
}

const MyJobPage: React.FC<IMyJobJobPage> = ({ params }) => {
    return <MyJobDetail jobId={params.id} />;
};

export default MyJobPage;
