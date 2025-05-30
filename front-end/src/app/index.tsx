import Navbar from '../components/Navbar';
import SongList from '../components/Songs/SongList';

export default function Index() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Songs</h1>
        <SongList />
      </main>
    </div>
  );
}