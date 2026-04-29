import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { RotateCcw } from "lucide-react";
import { imgBitmap } from "../imports/svg-0xkgh";

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onSave: (data: { rotation: number; zoom: number; position: { x: number; y: number } }) => void;
  initialRotation?: number;
  initialZoom?: number;
  initialPosition?: { x: number; y: number };
  onReset?: () => void;
}

export function ImageEditor({ 
  isOpen, 
  onClose, 
  imageUrl,
  onSave,
  initialRotation = 0,
  initialZoom = 1,
  initialPosition = { x: 0, y: 0 },
  onReset
}: ImageEditorProps) {
  const [rotation, setRotation] = useState(initialRotation);
  const [zoom, setZoom] = useState(initialZoom);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    onSave({ rotation, zoom, position });
    onClose();
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  if (!imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-6">
        <div className="mb-4">
          <h2 className="text-gray-900">Edit Image</h2>
        </div>

        {/* Match the exact structure from ProfileSection */}
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start relative shrink-0 size-[350px] mx-auto">
          <div className="absolute inset-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 350">
              <circle cx="175" cy="175" fill="transparent" r="175" stroke="none" />
            </svg>
          </div>
          <div 
            ref={containerRef}
            className="h-[408px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[350px_350px] relative shrink-0 w-[613px] cursor-move"
            style={{ maskImage: `url('${imgBitmap}')` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <img 
                  alt="Edit preview" 
                  className="max-h-full max-w-full object-contain select-none" 
                  src={imageUrl} 
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom})`,
                    transformOrigin: 'center center'
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
          
          {/* Drag instruction */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-sm bg-black/50 px-3 py-1 rounded">
              Drag to reposition image
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-4 px-2">
          {/* Rotate Control */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm text-gray-700 min-w-[50px]">Rotate</span>
            <div className="flex-1 flex items-center gap-2">
              <Slider
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
                min={-180}
                max={180}
                step={15}
                className="flex-1"
              />
            </div>
          </div>

          {/* Zoom Control */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm text-gray-700 min-w-[50px]">Zoom</span>
            <div className="flex-1 flex items-center gap-2">
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-3 mt-6">
          {/* Reset Button - Left aligned */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-gray-700 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>

          {/* Cancel and Save - Right aligned */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="px-6 bg-black text-white hover:bg-black/90"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}