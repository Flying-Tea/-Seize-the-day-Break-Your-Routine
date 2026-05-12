import { useState } from "react";
import Modal from "../Modal.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
};

export default function ReflectModal({ isOpen, onClose, prompt }: Props) {
  const [text, setText] = useState("");

  const saveEntry = () => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push({ text, prompt, date: new Date() });
    localStorage.setItem("entries", JSON.stringify(entries));
    setText("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg mb-3">{prompt}</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-3 rounded-lg bg-black border border-gray-700"
        placeholder="Write your thoughts..."
      />

      <button
        onClick={saveEntry}
        className="mt-4 w-full bg-white text-black py-2 rounded-lg"
      >
        Save
      </button>
    </Modal>
  );
}