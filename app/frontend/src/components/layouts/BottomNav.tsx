import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full max-w-md flex justify-around bg-gray-950 py-3 border-t border-gray-800">
      <Link to="/" className="text-sm">Home</Link>
      <Link to="/Reflections" className="text-sm">Entries</Link> // FIX LINK FUTURE ME
    </div>
  );
}