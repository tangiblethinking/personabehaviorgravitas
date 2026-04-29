import { useState, useRef, useEffect } from 'react';

interface InteractiveSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  toolTip: string;
  traitInsight: string;
}

export function InteractiveSlider({ label, value, onChange, className = '', toolTip, traitInsight }: InteractiveSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  const updateValue = (clientX: number) => {
    if (!lineRef.current) return;
    
    const rect = lineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = Math.round(percentage * 10);
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        updateValue(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Calculate position as percentage (0-10 maps to 0%-95%)
  const position = (value / 10) * 95;

  return (
    <div className={`h-[34px] overflow-visible relative shrink-0 w-[450px] ${className}`}>
      <div 
        ref={lineRef}
        className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%] cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre pointer-events-none">
        {label}
      </p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre pointer-events-none">
        {value}/10
      </p>
      <div 
        className="absolute bottom-0 top-[52.94%] cursor-grab active:cursor-grabbing"
        style={{ 
          left: `${position}%`,
          right: `${100 - position - 3.56}%`
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" r="9" />
          </svg>
        </div>
      </div>
      {isHovering && (
        <div className="absolute bottom-[100%] left-0 right-0 mb-2 px-4 py-2 bg-black/90 text-white text-[20px] font-['Avenir:Roman',_sans-serif] rounded-lg shadow-lg pointer-events-none z-50 max-w-[450px]">
          <p className="leading-relaxed">
            {toolTip}
          </p>
          {traitInsight && (
            <p className="leading-relaxed mt-2 text-gray-300 italic text-[18px]">
              {traitInsight}
            </p>
          )}
        </div>
      )}
    </div>
  );
}