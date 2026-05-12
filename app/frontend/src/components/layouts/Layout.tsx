import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-6 pb-20">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}