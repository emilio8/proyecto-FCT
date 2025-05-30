import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import UserSongsList from '@/components/Songs/UserSongsList';

export default function UserSongsPage({ params }: { params: { id: string } }) {
    return (
        <>
            <Header />
            <Navbar />
            <main>
                <UserSongsList userId={params.id} />
            </main>
        </>
    );
}