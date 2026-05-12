type Props = {
  prompt: string;
};

export default function PromptCard({ prompt }: Props) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Today's Prompt</h2>
      <p className="text-gray-300">{prompt}</p>
    </div>
  );
}