import { BulletPoint } from './BulletPoint';
import { EditableText } from './EditableText';

interface BulletListItemProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
}

export function BulletListItem({ value, onChange, width = 'w-[420px]' }: BulletListItemProps) {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <div className="box-border content-stretch flex gap-[10px] items-start px-0 py-[12px] relative self-stretch shrink-0">
        <BulletPoint />
      </div>
      <EditableText
        value={value}
        onChange={onChange}
        className={`font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] ${width}`}
        multiline
      />
    </div>
  );
}
