import { useState } from 'react';
import imgBitmap1 from "figma:asset/6b4e9e68c4383ae8435202d1a20cdd484b43d3c9.png";
import imgBitmap2 from "figma:asset/e16d74f78d0986bc13dd6f44e9fde0ff3b0e4394.png";
import imgImage12 from "figma:asset/45a21127e8a62f31a98151fabb97f3701242098b.png";
import imgImage21 from "figma:asset/813928e1367bb67035583ab6c13a59e50909a773.png";
import imgImage19 from "figma:asset/eed7dec5fd9f3391169eed0a68e71a1750831a84.png";
import imgImage25 from "figma:asset/a3599933228a87d305a1da869ea22347d1cd2ee1.png";
import { imgBitmap } from "../imports/svg-0xkgh";
import { BsCalendar3, BsGenderAmbiguous, BsCurrencyDollar, BsMortarboard, BsGeoAlt, BsBriefcase, BsPeople } from 'react-icons/bs';
import { Pencil } from 'lucide-react';
import { EditableText } from './EditableText';
import { DemographicItem } from './DemographicItem';
import { ImageEditor } from './ImageEditor';

interface PersonaData {
  quote: string;
  quoteNote: string;
  age: string;
  gender: string;
  income: string;
  education: string;
  location: string;
  occupation: string;
  family: string;
  spouseOccupation: string;
  characteristics: string[];
  brand_1: string;
  brand_2: string;
  brand_3: string;
  brand_4: string;
  platform_1: string;
  platform_2: string;
  platform_3: string;
  platform_4: string;
}

interface ProfileSectionProps {
  personaData: PersonaData;
  backgroundColor: string;
  updateField: (field: string, value: string) => void;
  setPersonaData: React.Dispatch<React.SetStateAction<any>>;
  imageUrl: string;
  imageTransform: { x: number; y: number; rotation: number; zoom: number };
  onImageChange: (url: string, transform: { x: number; y: number; rotation: number; zoom: number }) => void;
  onAgeHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onGenderHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onIncomeHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onEducationHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onLocationHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onOccupationHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onFamilyHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onSpouseOccupationHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
}

const DEMOGRAPHIC_FIELDS = [
  { label: 'Age:', field: 'age', icon: BsCalendar3 },
  { label: 'Gender:', field: 'gender', icon: BsGenderAmbiguous },
  { label: 'Income:', field: 'income', icon: BsCurrencyDollar },
  { label: 'Education:', field: 'education', icon: BsMortarboard },
  { label: 'Location:', field: 'location', icon: BsGeoAlt },
  { label: 'Occupation:', field: 'occupation', icon: BsBriefcase },
  { label: 'Family:', field: 'family', icon: BsPeople },
  { label: 'Spouse Occupation:', field: 'spouseOccupation', icon: BsBriefcase }
];

export function ProfileSection({ personaData, backgroundColor, updateField, setPersonaData, imageUrl, imageTransform, onImageChange, onAgeHoverChange, onGenderHoverChange, onIncomeHoverChange, onEducationHoverChange, onLocationHoverChange, onOccupationHoverChange, onFamilyHoverChange, onSpouseOccupationHoverChange }: ProfileSectionProps) {
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);

  const handleImageChange = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setPendingImageUrl(url);
      setShowImageEditor(true);
    }
  };

  const handleSaveImage = (data: { rotation: number; zoom: number; position: { x: number; y: number } }) => {
    const transform = {
      x: data.position.x,
      y: data.position.y,
      rotation: data.rotation,
      zoom: data.zoom
    };
    if (pendingImageUrl) {
      onImageChange(pendingImageUrl, transform);
    }
    setShowImageEditor(false);
    setPendingImageUrl(null);
  };

  const handleResetImage = () => {
    onImageChange("", { x: 0, y: 0, rotation: 0, zoom: 1 });
    setShowImageEditor(false);
    setPendingImageUrl(null);
  };

  const handleCloseEditor = () => {
    setShowImageEditor(false);
    setPendingImageUrl(null);
  };

  return (
    <div 
      className="box-border content-stretch flex flex-col gap-[54px] self-stretch items-center overflow-clip px-[49px] py-[38px] relative rounded-[36px] w-[465px]" 
      style={{ backgroundColor }}
    >
      {/* Profile Image */}
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start relative shrink-0 size-[350px]">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 350">
            <circle cx="175" cy="175" fill="transparent" r="175" />
          </svg>
        </div>
        <div className="h-[408px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[350px_350px] relative shrink-0 w-[613px]" style={{ maskImage: `url('${imgBitmap}')` }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            {imageUrl ? (
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <img 
                  alt="" 
                  className="max-h-full max-w-full object-contain" 
                  src={imageUrl} 
                  style={{
                    transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) rotate(${imageTransform.rotation}deg) scale(${imageTransform.zoom})`,
                    transformOrigin: 'center center'
                  }}
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[101%] left-[-3.53%] max-w-none top-[-5.15%] w-[81.74%]" src={imgBitmap1} />
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[118.53%] left-[-9.44%] max-w-none top-[-5.15%] w-[69.59%]" src={imgBitmap2} />
                </div>
              </>
            )}
          </div>
        </div>
        {/* Edit Button - positioned outside the masked area */}
        <button
          onClick={handleImageChange}
          className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 rounded-full p-3 transition-colors z-20"
          aria-label="Change profile image"
        >
          <Pencil className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Image Editor */}
      <ImageEditor
        isOpen={showImageEditor}
        onClose={handleCloseEditor}
        imageUrl={pendingImageUrl}
        onSave={handleSaveImage}
        onReset={handleResetImage}
        initialRotation={imageTransform.rotation}
        initialZoom={imageTransform.zoom}
        initialPosition={{ x: imageTransform.x, y: imageTransform.y }}
      />

      {/* Quote */}
      <div className="content-stretch flex flex-col font-['Avenir:Medium',_sans-serif] gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[#606060] text-center w-full">
        <EditableText
          value={personaData.quote}
          onChange={(val) => updateField('quote', val)}
          className="relative shrink-0 text-[25px] w-[301px]"
        />
        <EditableText
          value={personaData.quoteNote}
          onChange={(val) => updateField('quoteNote', val)}
          className="relative shrink-0 text-[12px] w-[301px]"
        />
      </div>

      {/* Demographics */}
      <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
        {DEMOGRAPHIC_FIELDS.map((item, idx) => (
          <DemographicItem
            key={idx}
            label={item.label}
            value={personaData[item.field as keyof PersonaData] as string}
            icon={item.icon}
            onChange={(val) => updateField(item.field, val)}
            onHoverChange={item.field === 'age' ? onAgeHoverChange : item.field === 'gender' ? onGenderHoverChange : item.field === 'income' ? onIncomeHoverChange : item.field === 'education' ? onEducationHoverChange : item.field === 'location' ? onLocationHoverChange : item.field === 'occupation' ? onOccupationHoverChange : item.field === 'family' ? onFamilyHoverChange : item.field === 'spouseOccupation' ? onSpouseOccupationHoverChange : undefined}
          />
        ))}
      </div>

      {/* Characteristics */}
      <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0 w-full">
        {personaData.characteristics.map((char, idx) => (
          <div key={idx} className="bg-[#606060] box-border content-stretch flex gap-[10px] h-[41px] items-center justify-center overflow-clip px-[16px] py-[8px] relative shrink-0">
            <EditableText
              value={char}
              onChange={(val) => {
                const newChars = [...personaData.characteristics];
                newChars[idx] = val;
                setPersonaData((prev: any) => ({ ...prev, characteristics: newChars }));
              }}
              className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre"
            />
          </div>
        ))}
      </div>

      {/* Favorite Brands */}
      <div className="content-stretch flex flex-col gap-[30px] items-start overflow-clip relative shrink-0 w-full">
        <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] text-nowrap whitespace-pre">FAVORITE BRANDS</p>
        <div className="flex flex-wrap gap-[12px] items-center leading-[0] relative shrink-0">
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[32px]">
            <EditableText
              value={personaData.brand_1}
              onChange={(val) => updateField('brand_1', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[32px]">
            <EditableText
              value={personaData.brand_2}
              onChange={(val) => updateField('brand_2', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[32px]">
            <EditableText
              value={personaData.brand_3}
              onChange={(val) => updateField('brand_3', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[32px]">
            <EditableText
              value={personaData.brand_4}
              onChange={(val) => updateField('brand_4', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
        </div>
      </div>

      {/* Favorite Platforms */}
      <div className="content-stretch flex flex-col gap-[30px] items-start overflow-clip relative shrink-0 w-full">
        <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] text-nowrap whitespace-pre">FAVORITE PLATFORMS</p>
        <div className="flex flex-wrap gap-[12px] items-center leading-[0] relative shrink-0">
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[12px]">
            <EditableText
              value={personaData.platform_1}
              onChange={(val) => updateField('platform_1', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[12px]">
            <EditableText
              value={personaData.platform_2}
              onChange={(val) => updateField('platform_2', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[12px]">
            <EditableText
              value={personaData.platform_3}
              onChange={(val) => updateField('platform_3', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
          <div className="flex items-center justify-center px-[12px] h-[64px] bg-white rounded-[12px]">
            <EditableText
              value={personaData.platform_4}
              onChange={(val) => updateField('platform_4', val)}
              className="text-[#393939] text-[18px] font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}