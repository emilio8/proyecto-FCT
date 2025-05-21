import Navbar from "../components/Navbar";
import SongList from "../components/SongList";

export default function Index() {
  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <main className="mt-8">
        <SongList />
      </main>
    </div>
  );
}