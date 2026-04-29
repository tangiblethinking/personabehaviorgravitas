import imgBitmap1 from "figma:asset/6b4e9e68c4383ae8435202d1a20cdd484b43d3c9.png";
import imgBitmap2 from "figma:asset/e16d74f78d0986bc13dd6f44e9fde0ff3b0e4394.png";
import imgImage12 from "figma:asset/45a21127e8a62f31a98151fabb97f3701242098b.png";
import imgImage21 from "figma:asset/813928e1367bb67035583ab6c13a59e50909a773.png";
import imgImage19 from "figma:asset/eed7dec5fd9f3391169eed0a68e71a1750831a84.png";
import imgImage25 from "figma:asset/a3599933228a87d305a1da869ea22347d1cd2ee1.png";
import { imgBitmap } from "./svg-0xkgh";

function Image() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start relative shadow-[0px_7px_11px_0px_rgba(116,116,116,0.5)] shrink-0 size-[350px]" data-name="Image">
      <div className="absolute inset-0" data-name="Mask">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 350">
          <circle cx="175" cy="175" fill="var(--fill-0, #CCCCCC)" id="Mask" r="175" />
        </svg>
      </div>
      <div className="h-[408px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[350px_350px] relative shrink-0 w-[613px]" data-name="Bitmap" style={{ maskImage: `url('${imgBitmap}')` }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[101%] left-[-3.53%] max-w-none top-[-5.15%] w-[81.74%]" src={imgBitmap1} />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[118.53%] left-[-9.44%] max-w-none top-[-8.01%] w-[69.59%]" src={imgBitmap2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col font-['Avenir:Medium',_sans-serif] gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[#606060] text-center w-full">
      <p className="relative shrink-0 text-[25px] w-[301px]">{`“I'm all about thriving. Plexus fuels my family's gut health, keeps my runs strong, and grows my hustle to inspire others!”`}</p>
      <p className="relative shrink-0 text-[12px] w-[301px]">*while drinking a smoothie in the gym. **AI image generation</p>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Age:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` 37 years old`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-0 pr-[12.2px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">
          Gender:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Female `}</span>
        </p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin1 />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_'Noto_Sans:Black',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#e30646] text-[16px] text-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 900" }}>
        <p className="leading-[16px] whitespace-pre">$</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin2 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Income:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` $110k  (Plexus Commissions)`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin3 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Education:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Bachelor's`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin4 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Location:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Urban Austin,Texas USA`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin5 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Occupation:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Wellness Coach`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin6 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Family:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Married with 2 young children`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pl-0 pr-[12px] pt-[4px] relative shrink-0 w-[32px]" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e30646] text-[16px] text-nowrap">
        <p className="leading-[16px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#cccccc] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start p-[16px] relative w-full">
          <Margin7 />
          <div className="flex flex-col font-['Arial:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">
              Spouse Occupation:<span className="font-['Arial:Regular',_sans-serif] not-italic">{` Physical Therapist`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Information() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full" data-name="Information">
      <Background />
      <Background1 />
      <Background2 />
      <Background3 />
      <Background4 />
      <Background5 />
      <Background6 />
      <Background7 />
    </div>
  );
}

function Group() {
  return (
    <div className="bg-[#606060] box-border content-stretch flex gap-[10px] h-[41px] items-center justify-center overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Group">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">HIIT</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="bg-[#606060] box-border content-stretch flex gap-[10px] h-[41px] items-center justify-center overflow-clip px-[16px] py-[8px] relative shrink-0">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">MEAL PREP FTW</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="bg-[#606060] box-border content-stretch flex gap-[10px] h-[41px] items-center justify-center overflow-clip px-[16px] py-[8px] relative shrink-0">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">WORK/LIFE</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="bg-[#606060] box-border content-stretch flex gap-[10px] h-[41px] items-center justify-center overflow-clip px-[16px] py-[8px] relative shrink-0">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">YOGA</p>
    </div>
  );
}

function Characteristics() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0 w-full" data-name="Characteristics">
      <Group />
      <Group2 />
      <Group4 />
      <Group3 />
    </div>
  );
}

function Logos() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="logos">
      <div className="[grid-area:1_/_1] h-[33px] mix-blend-multiply ml-[164px] mt-[5px] relative w-[59px]" data-name="image 12">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage12} />
      </div>
      <div className="[grid-area:1_/_1] h-[22px] ml-0 mt-0 relative w-[117px]" data-name="image 21">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[535.71%] left-0 max-w-none top-[-195.24%] w-full" src={imgImage21} />
        </div>
      </div>
      <div className="[grid-area:1_/_1] h-[57px] mix-blend-multiply ml-[16px] mt-[26px] relative w-[119px]" data-name="image 19">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[210.28%] left-0 max-w-none top-[-57.94%] w-full" src={imgImage19} />
        </div>
      </div>
      <div className="[grid-area:1_/_1] h-[32px] mix-blend-multiply ml-[249px] mt-0 relative w-[104px]" data-name="image 25">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[114.89%] left-[-0.14%] max-w-none top-[-14.89%] w-[100.29%]" src={imgImage25} />
        </div>
      </div>
    </div>
  );
}

function FavoriteBrands() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start overflow-clip relative shrink-0 w-full" data-name="Favorite Brands">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] text-nowrap whitespace-pre">FAVORITE BRANDS</p>
      <Logos />
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="bg-[#e5f7ed] box-border content-stretch flex flex-col gap-[54px] h-[1656px] items-center overflow-clip px-[49px] py-[38px] relative rounded-[36px] shadow-[2px_0px_6px_0px_rgba(0,0,0,0.25)] shrink-0 w-[465px]" data-name="Left Column">
      <Image />
      <Frame13 />
      <Information />
      <Characteristics />
      <FavoriteBrands />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col font-['Montserrat:Bold',_sans-serif] font-bold items-start leading-[normal] relative shrink-0 w-full">
      <p className="relative shrink-0 text-[#393939] text-[19px] w-full">“Holistic Health”</p>
      <p className="relative shrink-0 text-[#99bbe2] text-[89px] w-full">Harper</p>
      <p className="relative shrink-0 text-[#393939] text-[14px] w-full">Brand Ambassador</p>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Name">
      <p className="font-['Montserrat:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e30646] text-[19px] text-right w-full">Plexus Shopping Persona</p>
      <Frame12 />
    </div>
  );
}

function About() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start leading-[normal] not-italic overflow-clip relative shrink-0" data-name="About">
      <p className="font-['Avenir:Book',_sans-serif] relative shrink-0 text-[#669ad4] text-[25px] text-nowrap whitespace-pre">ABOUT</p>
      <p className="font-['Avenir:Roman',_sans-serif] relative shrink-0 text-[#111111] text-[22px] w-[961px]">Excelling in whole health management and active lifestyle promotion, Harper leverages community-building and recruitment for rank advancement. Earning through personal sales, downline commissions, and Plexus incentives, she draws from successful ambassadors who prioritize storytelling, social proof of the product, and consistent PV generation to scale her income.</p>
    </div>
  );
}

function Goals() {
  return (
    <div className="h-[194px] overflow-clip relative shrink-0 w-[440px]" data-name="Goals">
      <p className="absolute font-['Avenir:Book',_sans-serif] leading-[normal] left-0 not-italic right-[80.91%] text-[#669ad4] text-[25px] text-nowrap top-[calc(50%-97px)] whitespace-pre">GOALS</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[4.54%] not-italic right-0 text-[#111111] text-[22px] top-[calc(50%-43px)]">Scale business with recruitment downline growth to 7 levels.</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[4.54%] not-italic right-0 text-[#111111] text-[22px] top-[calc(50%+37px)]">Leverage Fast Start to earn higher and retain new recruits</p>
      <div className="absolute bottom-[62.37%] left-0 right-[97.73%] top-[32.47%]" data-name="Oval 2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2" r="5" />
        </svg>
      </div>
      <div className="absolute bottom-[21.13%] left-0 right-[97.73%] top-[73.71%]" data-name="Oval 2 Copy">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start px-0 py-[12px] relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame31 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Materials on whole health storytelling and healthy lifestyle integration</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start px-0 py-[12px] relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame30 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Less complicated method of integrating recruitment process in my community network.</p>
    </div>
  );
}

function Needs() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-[440px]" data-name="Needs">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#669ad4] text-[25px] w-full">NEEDS</p>
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[71px] items-center relative shrink-0">
      <Goals />
      <Needs />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame21 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Age related recovery challenges from an active family, personal, and business life.</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame22 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Lack of science backed endorsements or materials</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame23 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px] whitespace-pre-wrap">{`Friction (because of sparse product details) with sign ups when leading a  wellness program or workshop`}</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame32 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Building interest to reward downline through Plexus events and incentives.</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative self-stretch shrink-0">
      <div className="relative shrink-0 size-[10px]" data-name="Oval 2 Copy 6">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #606060)" id="Oval 2 Copy 2" r="5" />
        </svg>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame33 />
      <p className="font-['Avenir:Roman',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[22px] w-[420px]">Consistency of Plexus through social media brands.</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame34 />
    </div>
  );
}

function PainPoints() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative self-stretch shrink-0 w-[445px]" data-name="Pain Points">
      <p className="font-['Avenir:Book',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#669ad4] text-[25px] w-full">PAIN POINTS</p>
      <Frame35 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex font-['Avenir:Book',_sans-serif] gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[25px] w-full">
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#669ad4]">PERSONALITY</p>
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[#111111] text-right">85/100*</p>
    </div>
  );
}

function One() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="One">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[80.67%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Value Hunter</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">5</p>
      <div className="absolute bottom-0 left-[48.22%] right-[48.22%] top-[52.94%]" data-name="Oval">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function One1() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="One">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[83.33%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Researcher</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">8</p>
      <div className="absolute bottom-0 left-[83.33%] right-[13.11%] top-[52.94%]" data-name="Oval">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Two() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Two">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[77.11%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Brand Devoted</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[96.22%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">10</p>
      <div className="absolute bottom-0 left-[94.67%] right-[1.78%] top-[52.94%]" data-name="Oval Copy">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Two1() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Two">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[73.33%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Impulse shopping</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">2</p>
      <div className="absolute bottom-0 left-[6.22%] right-[90.22%] top-[52.94%]" data-name="Oval Copy">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Three() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Three">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy 2">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[77.56%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Social Butterfly</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[96.22%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">10</p>
      <div className="absolute bottom-0 left-[92.67%] right-[3.78%] top-[52.94%]" data-name="Oval Copy 2">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Three1() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Three">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy 2">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[82.44%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Replenisher</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[96.22%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">10</p>
      <div className="absolute bottom-0 left-[92.67%] right-[3.78%] top-[52.94%]" data-name="Oval Copy 2">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Four() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Four">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy 3">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[74%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Mobile Shopping</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">9</p>
      <div className="absolute bottom-0 left-[89.78%] right-[6.67%] top-[52.94%]" data-name="Oval Copy 3">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Four1() {
  return (
    <div className="h-[34px] overflow-clip relative shrink-0 w-[450px]" data-name="Four">
      <div className="absolute bottom-[20.59%] left-[0.67%] right-0 top-[73.53%]" data-name="Line Copy 3">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[72.22%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-17px)] whitespace-pre">Ethical Ingredients</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-17px)] whitespace-pre">9</p>
      <div className="absolute bottom-0 left-[90.22%] right-[6.22%] top-[52.94%]" data-name="Oval Copy 3">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Five() {
  return (
    <div className="h-[33px] overflow-clip relative shrink-0 w-[450px]" data-name="Five">
      <div className="absolute bottom-[18.18%] left-[0.67%] right-0 top-[75.76%]" data-name="Line Copy 4">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[91.33%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-16.5px)] whitespace-pre">Gifter</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-16.5px)] whitespace-pre">8</p>
      <div className="absolute bottom-0 left-[84%] right-[12.44%] top-[51.52%]" data-name="Oval Copy 4">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Five1() {
  return (
    <div className="h-[33px] overflow-clip relative shrink-0 w-[450px]" data-name="Five">
      <div className="absolute bottom-[18.18%] left-[0.67%] right-0 top-[75.76%]" data-name="Line Copy 4">
        <div className="absolute bottom-1/4 left-[-0.11%] right-[-0.11%] top-1/4" style={{ "--stroke-0": "rgba(96, 96, 96, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 449 2">
            <path d="M1 1H448" id="Line" stroke="var(--stroke-0, #606060)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-0 not-italic right-[83.78%] text-[#111111] text-[15px] text-nowrap top-[calc(50%-16.5px)] whitespace-pre">Tech Savvy</p>
      <p className="absolute font-['Avenir:Roman',_sans-serif] leading-[normal] left-[98%] not-italic right-0 text-[#111111] text-[15px] text-nowrap text-right top-[calc(50%-16.5px)] whitespace-pre">4</p>
      <div className="absolute bottom-0 left-[41.56%] right-[54.89%] top-[51.52%]" data-name="Oval Copy 5">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <One />
      <One1 />
      <Two />
      <Two1 />
      <Three />
      <Three1 />
      <Four />
      <Four1 />
      <Five />
      <Five1 />
    </div>
  );
}

function Personality() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[450px]" data-name="Personality">
      <Frame25 />
      <Frame24 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[66px] items-start relative shrink-0">
      <PainPoints />
      <Personality />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[25px] w-full">
      <p className="font-['Avenir:Book',_sans-serif] relative shrink-0 text-[#669ad4] text-nowrap whitespace-pre">Customer Engagement:</p>
      <p className="font-['Avenir:Heavy',_sans-serif] relative shrink-0 text-[#669ad4] text-nowrap whitespace-pre">Influential Brand Ambassador</p>
      <p className="basis-0 font-['Avenir:Book',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#111111] text-right">85/100*</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute content-stretch flex font-['Avenir:Roman',_sans-serif] items-center justify-between leading-[normal] left-0 not-italic text-[#111111] text-[15px] text-nowrap top-0 w-[961px] whitespace-pre">
      <p className="relative shrink-0">Unaware 0-35</p>
      <p className="relative shrink-0">VIP</p>
      <p className="relative shrink-0 text-right">Ambassador 75-100</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex font-['Avenir:Roman',_sans-serif] items-center justify-between leading-[normal] left-0 not-italic text-[#111111] text-[15px] text-nowrap top-[39px] w-[961px] whitespace-pre">
      <p className="relative shrink-0">0</p>
      <p className="relative shrink-0">10</p>
      <p className="relative shrink-0">20</p>
      <p className="relative shrink-0">30</p>
      <p className="relative shrink-0">40</p>
      <p className="relative shrink-0">50</p>
      <p className="relative shrink-0">60</p>
      <p className="relative shrink-0">70</p>
      <p className="relative shrink-0">80</p>
      <p className="relative shrink-0">90</p>
      <p className="relative shrink-0 text-right">100</p>
    </div>
  );
}

function One2() {
  return (
    <div className="h-[156px] overflow-clip relative shrink-0 w-full" data-name="One">
      <Frame26 />
      <Frame27 />
      <div className="absolute bottom-[79.37%] left-[0.67%] right-0 top-[14.74%]" data-name="Line">
        <div className="absolute inset-[33.65%_-0.16%]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 4">
            <path d="M2 1.58824H956.593" id="Line" stroke="var(--stroke-0, #CCCCCC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="absolute aspect-[16/16] left-[82.83%] right-[15.51%] top-[calc(50%-50px)] translate-y-[-50%]" data-name="Oval">
        <div className="absolute inset-[-6.25%]" style={{ "--fill-0": "rgba(227, 6, 70, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <circle cx="9" cy="9" fill="var(--fill-0, #E30646)" id="Oval" r="9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[59px] items-start relative shrink-0 w-full">
      <One2 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col font-['Avenir:Book',_sans-serif] gap-[4px] items-start justify-center leading-[normal] not-italic relative shrink-0 w-full">
      <p className="relative shrink-0 text-[#669ad4] text-[25px] text-nowrap whitespace-pre">What does this mean?</p>
      <p className="min-w-full relative shrink-0 text-[#111111] text-[18px] w-[min-content] whitespace-pre-wrap">{`This scale represents how likely the user will either trend up or down based on their “personality traits”.  As well, it should be used to send appropriate communications to increase engagement with Plexus.`}</p>
    </div>
  );
}

function Personality1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Personality">
      <Frame36 />
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[62px] items-start px-[64px] py-[32px] relative self-stretch shrink-0">
      <Name />
      <About />
      <Frame14 />
      <Frame15 />
      <Personality1 />
    </div>
  );
}

export default function BrandAmbassador() {
  return (
    <div className="bg-white relative rounded-[36px] w-[1554px] h-[1656px]" data-name="Brand Ambassador">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <LeftColumn />
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#f8f8f8] border-solid inset-[-2px] pointer-events-none rounded-[38px]" />
    </div>
  );
}