import Navbar from '@/components/Navbar';
import UserSongsList from '@/components/Songs/UserSongsList';

export default function UserSongsPage({ params }: { params: { id: string } }) {
    return (
        <>
            <Navbar />
            <main>
                <UserSongsList userId={params.id} />
            </main>
        </>
    );
}