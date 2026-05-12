import { BookOpen, Home, Menu, NotebookPen, X } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { ReuseButton } from "./MyButton";

type ReflectionNavBarProps = {
  viewSaved: boolean;
  setViewSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ReflectionNavBar({
  viewSaved,
  setViewSaved
}: ReflectionNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavigation = (saved: boolean) => {
    setViewSaved(saved);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-slate-950/20 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-6 lg:px-10">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold p-4">
            <BookOpen />
            Dead Poets Reflections
          </h1>
        </div>

        <div className="hidden md:flex gap-4 items-center">

          <Button
            variant={viewSaved ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => handleNavigation(true)}
          >
            <NotebookPen size={18} />
            Your Reflections
          </Button>

            <ReuseButton
            intent="primaryButton"
            href="/"
            className="flex items-center gap-2 border-2 bg-blue-500 p-2 rounded-lg hover:bg-teal-400"
            >
                <Home   /> <span>Home</span>
            </ReuseButton>
        </div>

        <button
          className="md:hidden flex items-center p-2 rounded hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/90 backdrop-blur-sm border-t border-white/10">
          <div className="flex flex-col gap-2 p-4">
            <Button
              variant={!viewSaved ? "default" : "outline"}
              className="flex items-center gap-2 justify-center"
              onClick={() => handleNavigation(false)}
            >
              <Home size={18} />
              Home
            </Button>

            <Button
              variant={viewSaved ? "default" : "outline"}
              className="flex items-center gap-2 justify-center"
              onClick={() => handleNavigation(true)}
            >
              <NotebookPen size={18} />
              Your Reflections
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}