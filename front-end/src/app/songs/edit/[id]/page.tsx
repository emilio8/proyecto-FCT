import EditSongForm from '@/components/Songs/EditSongForm';
import Navbar from '@/components/Navbar';

export default function EditSongPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto py-8">
                <EditSongForm />
            </main>
        </div>
    );
}