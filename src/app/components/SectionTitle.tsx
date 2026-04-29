import { useRef } from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  onHoverChange?: (isHovering: boolean, element: HTMLParagraphElement | null) => void;
}

export function SectionTitle({ children, className = '', onHoverChange }: SectionTitleProps) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && pRef.current) {
      onHoverChange(true, pRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <p 
      ref={pRef}
      className={`font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#669ad4] text-[25px] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </p>
  );
}