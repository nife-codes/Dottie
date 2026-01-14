import BingoCard from './components/BingoCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">Dottie</h1>
        <BingoCard />
      </div>
    </div>
  );
}