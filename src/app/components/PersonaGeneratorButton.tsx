import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface PersonaGeneratorButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export function PersonaGeneratorButton({ onGenerate, isGenerating }: PersonaGeneratorButtonProps) {
  return (
    <Button
      onClick={onGenerate}
      disabled={isGenerating}
      className="fixed top-8 right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-[#e30646] hover:bg-[#c00538] text-white hidden"
      title="Generate AI Persona"
    >
      {isGenerating ? (
        <div className="animate-spin">
          <Sparkles className="h-6 w-6" />
        </div>
      ) : (
        <Sparkles className="h-6 w-6" />
      )}
    </Button>
  );
}