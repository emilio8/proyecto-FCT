import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UserSongsList from '@/components/Songs/UserSongsList';

export default function UserSongsPage({ params }: { params: { id: string } }) {
    return (
        <UserSongsList userId={params.id} />
    );
}