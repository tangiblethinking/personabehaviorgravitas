// VERSION 349 - CustomerTypeSelector with Manual Overrides
import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface CustomerTypeSelectorProps {
  onGenerate: (customerType: string, loyalty: string, generation: string, overrideText?: string) => void;
  isGenerating: boolean;
}

export function CustomerTypeSelector({ onGenerate, isGenerating }: CustomerTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerType, setCustomerType] = useState<string>("");
  const [loyalty, setLoyalty] = useState<string>("");
  const [generation, setGeneration] = useState<string>("");
  const [manualOverrides, setManualOverrides] = useState<string>("");

  const handleCreate = () => {
    if (!customerType || !loyalty || !generation) {
      toast.error("Please select all options before creating");
      return;
    }
    
    setIsOpen(false);
    // Pass override text only if it has content
    onGenerate(customerType, loyalty, generation, manualOverrides.trim() || undefined);
    toast.info(`Generating ${customerType} persona...`);
    
    // Reset selections
    setCustomerType("");
    setLoyalty("");
    setGeneration("");
    setManualOverrides("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset selections when closing
      setCustomerType("");
      setLoyalty("");
      setGeneration("");
      setManualOverrides("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="fixed top-8 right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-black hover:bg-gray-800 text-white hidden"
          title="Generate Persona by Customer Type"
          disabled={isGenerating}
        >
          <User className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Custom Persona</DialogTitle>
          <DialogDescription>
            Select customer type, loyalty level, and generation to generate a matching persona
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {/* Customer Type Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Customer Type</label>
            <Select value={customerType} onValueChange={setCustomerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Retail/Unaware">Retail/Unaware</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Ambassador">Ambassador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Loyalty Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Customer Loyalty</label>
            <Select value={loyalty} onValueChange={setLoyalty}>
              <SelectTrigger>
                <SelectValue placeholder="Select loyalty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Infrequent Buyer">Infrequent Buyer</SelectItem>
                <SelectItem value="Gaining Trust in Brand">Gaining Trust in Brand</SelectItem>
                <SelectItem value="Losing Interest or Trust in Brand">Losing Interest or Trust in Brand</SelectItem>
                <SelectItem value="Potential Ambassadorship">Potential Ambassadorship</SelectItem>
                <SelectItem value="Struggling with Ambassadorship">Struggling with Ambassadorship</SelectItem>
                <SelectItem value="Influential Entrepreneur">Influential Entrepreneur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generation Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Generation</label>
            <Select value={generation} onValueChange={setGeneration}>
              <SelectTrigger>
                <SelectValue placeholder="Select generation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gen Z">Generation Z</SelectItem>
                <SelectItem value="Millennial">Millennial</SelectItem>
                <SelectItem value="Gen X">Generation X</SelectItem>
                <SelectItem value="Boomer">Boomer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manual Overrides Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Manual Overrides (Optional)</label>
            <Textarea
              value={manualOverrides}
              onChange={(e) => setManualOverrides(e.target.value)}
              placeholder="Optional: Enter custom details like 'lives in Miami, FL' or 'works as a yoga instructor earning $75k'"
              className="resize-none h-20"
            />
          </div>

          {/* Create Button */}
          <Button 
            onClick={handleCreate}
            disabled={isGenerating || !customerType || !loyalty || !generation}
            className="w-full mt-2 bg-black hover:bg-gray-800"
          >
            {isGenerating ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}