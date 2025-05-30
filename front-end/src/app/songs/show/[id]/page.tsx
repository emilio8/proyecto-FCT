import SongDetails from "@/components/Songs/SongDetails";
import Navbar from "@/components/Navbar";

export default function SongShowPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <SongDetails />
      </main>
    </div>
  );
}