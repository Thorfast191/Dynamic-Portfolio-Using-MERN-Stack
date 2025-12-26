import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemePovider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-4 right-4 z-[999]">
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className="rounded-[6px] w-12 h-12 p-2 bg-blue-900 hover:bg-blue-800 text-white shadow-lg transition-all duration-300"
      >
        {theme === "light" ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
        {/* <span className="sr-only">Toggle theme</span> */}
      </Button>
    </div>
  );
}
