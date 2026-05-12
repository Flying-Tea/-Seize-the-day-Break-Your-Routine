import Layout from "../layouts/Layout";

type ReflectionEntry = {
  prompt: string;
  text: string;
};

export default function Reflections() {
  const entries = JSON.parse(localStorage.getItem("entries") || "[]") as ReflectionEntry[];

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Explore</h1>

      {entries.length === 0 && (
        <p className="text-gray-400">No entries yet.</p>
      )}

      {entries.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-900 p-4 rounded-xl mb-3"
        >
          <p className="text-xs text-gray-500 mb-1">{entry.prompt}</p>
          <p className="text-sm">{entry.text}</p>
        </div>
      ))}
    </Layout>
  );
}