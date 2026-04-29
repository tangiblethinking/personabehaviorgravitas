import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { imgBitmap } from "../imports/svg-0xkgh";

interface ImagePositionDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (position: { x: number; y: number; scale: number }) => void;
  initialPosition?: { x: number; y: number; scale: number };
}

export function ImagePositionDialog({ 
  open, 
  onClose, 
  imageUrl, 
  onSave,
  initialPosition = { x: 0, y: 0, scale: 1 }
}: ImagePositionDialogProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition, imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (value: number[]) => {
    setPosition(prev => ({ ...prev, scale: value[0] }));
  };

  const handleSave = () => {
    onSave(position);
    onClose();
  };

  const handleReset = () => {
    setPosition({ x: 0, y: 0, scale: 1 });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Position Your Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-lg text-sm">
            Drag to reposition • Use slider to zoom • The circle shows what will be visible
          </div>

          {/* Preview Area - matching exact dimensions of actual profile */}
          <div className="flex justify-center bg-gray-100 rounded-lg p-4">
            <div 
              className="relative" 
              style={{ 
                width: '613px', 
                height: '408px',
                transform: 'scale(0.65)',
                transformOrigin: 'center center'
              }}
            >
              {/* Actual image container with mask - matching ProfileSection EXACTLY */}
              <div 
                className="h-[408px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[350px_350px] relative shrink-0 w-[613px]"
                style={{ 
                  WebkitMaskImage: `url('${imgBitmap}')`,
                  maskImage: `url('${imgBitmap}')`,
                  WebkitMaskSize: '350px 350px',
                  maskSize: '350px 350px',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: '0px',
                  maskPosition: '0px'
                }}
              >
                <div 
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                >
                  <div 
                    ref={containerRef}
                    className="absolute inset-0 overflow-hidden flex items-center justify-center cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <img
                      src={imageUrl}
                      alt="Position preview"
                      className="h-full w-full object-cover pointer-events-none"
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
                        transformOrigin: 'center center'
                      }}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Circle border overlay to show the boundary - positioned at mask location */}
              <div className="absolute top-0 left-0 pointer-events-none" style={{ width: '350px', height: '350px' }}>
                <svg className="w-full h-full" viewBox="0 0 350 350">
                  <circle 
                    cx="175" 
                    cy="175" 
                    r="174" 
                    fill="none" 
                    stroke="rgba(59, 130, 246, 0.5)" 
                    strokeWidth="2"
                    strokeDasharray="8,4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-gray-600" />
              <Slider
                value={[position.scale]}
                onValueChange={handleZoomChange}
                min={0.5}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <ZoomIn className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 w-12 text-right">
                {Math.round(position.scale * 100)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Apply Position
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}