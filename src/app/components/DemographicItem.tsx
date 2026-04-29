import { IconType } from 'react-icons';
import { EditableText } from './EditableText';
import { useRef } from 'react';

interface DemographicItemProps {
  label: string;
  value: string;
  icon: IconType;
  onChange: (value: string) => void;
  onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
}

export function DemographicItem({ label, value, icon: Icon, onChange, onHoverChange }: DemographicItemProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && divRef.current) {
      onHoverChange(true, divRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <div 
      ref={divRef}
      className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]">
            <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#e30646] text-[16px]">
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              {label}
              <span className="font-['Arial:Regular',_sans-serif] not-italic">
                <EditableText
                  value={value}
                  onChange={onChange}
                  className="inline-block"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}