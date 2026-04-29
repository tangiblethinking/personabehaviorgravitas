import { useState, useRef, useEffect } from 'react';

type SliderType = 'CSAT' | 'CES' | 'NPS';

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  getDisplayValue: (value: number) => string;
  getStatusLabel: (value: number) => string;
  calculatePosition: (value: number, min: number, max: number) => number;
}

const sliderConfigs: Record<SliderType, SliderConfig> = {
  CSAT: {
    label: 'CSAT',
    min: 0,
    max: 100,
    getDisplayValue: (value) => `${value}/100`,
    getStatusLabel: (value) => {
      if (value >= 0 && value <= 50) return "Poor Satisfaction";
      if (value >= 51 && value <= 69) return "Somewhat Satisfied";
      if (value >= 70 && value <= 85) return "Satisfied";
      return "Great Satisfaction";
    },
    calculatePosition: (value) => value
  },
  CES: {
    label: 'CES',
    min: 1,
    max: 7,
    getDisplayValue: (value) => `${value}/7`,
    getStatusLabel: (value) => {
      const labels = {
        1: "Extreme Frustration",
        2: "Frustration",
        3: "Impatient",
        4: "Neutral",
        5: "Somewhat Easy",
        6: "Easy",
        7: "Intuitive"
      };
      return labels[value as keyof typeof labels] || "";
    },
    calculatePosition: (value) => ((value - 1) / 6) * 100
  },
  NPS: {
    label: 'NPS',
    min: -100,
    max: 100,
    getDisplayValue: (value) => `${value}/200`,
    getStatusLabel: (value) => {
      if (value >= -100 && value <= -86) return "Advocating Detractor";
      if (value >= -85 && value <= -51) return "Enthusiastic Detractor";
      if (value >= -50 && value <= -21) return "Detractor";
      if (value >= -20 && value <= -1) return "Passive Promoter";
      if (value >= 0 && value <= 50) return "Good Promoter";
      if (value >= 51 && value <= 80) return "Enthusiastic Promoter";
      return "Advocating Promoter";
    },
    calculatePosition: (value) => ((value + 100) / 200) * 100
  }
};

interface SliderProps {
  type: SliderType;
  value: number;
  onChange: (value: number) => void;
  tooltip: string;
}

export function Slider({ type, value, onChange, tooltip }: SliderProps) {
  const config = sliderConfigs[type];
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const updateValue = (clientX: number) => {
    if (!lineRef.current) return;

    const rect = lineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    
    let newValue: number;
    if (type === 'CSAT') {
      newValue = Math.round(percentage * 100);
    } else if (type === 'CES') {
      newValue = Math.max(1, Math.min(7, Math.round(1 + percentage * 6)));
    } else {
      newValue = Math.round(-100 + percentage * 200);
    }
    
    setLocalValue(newValue);
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

  const position = config.calculatePosition(localValue, config.min, config.max);

  return (
    <div className="h-[34px] relative shrink-0 w-[450px]">
      <div
        ref={lineRef}
        className="absolute bottom-[20.59%] left-[3%] right-[8%] top-[73.53%] cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute bottom-1/4 left-0 right-0 top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[3%] not-italic text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre pointer-events-none">
        {config.label} ({config.getDisplayValue(localValue)})
      </p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] right-[3%] not-italic text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre pointer-events-none">
        {config.getStatusLabel(localValue)}
      </p>
      <div
        className="absolute bottom-0 top-[52.94%] cursor-grab active:cursor-grabbing"
        style={{
          left: `calc(3% + ${position * 0.89}%)`,
          right: `calc(8% + ${(100 - position) * 0.89 - 3.56}%)`
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
        {isHovering && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] px-4 py-2 bg-black/90 text-white text-[18px] font-['Avenir:Roman',_sans-serif] rounded-lg shadow-lg pointer-events-none z-[9999] min-w-[300px] max-w-[500px] whitespace-normal">
            <p className="leading-relaxed">
              {tooltip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
