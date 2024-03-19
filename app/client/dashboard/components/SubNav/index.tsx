import Link from 'next/link';

const SubNav = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href={`/client/dashboard`}>All job posts</Link>
                    </li>
                    <li>
                        <Link href={`/client/contract`}>All contracts</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SubNav;
