import Navbar from '@/components/Navbar';
import ShowUser from '@/components/User/ShowUser';

export default function UserShowPage({ params }: { params: { id: string } }) {
    return (
        <>
            <Navbar />
            <main>
                <ShowUser userId={params.id} />
            </main>
        </>
    );
}