import { tooltipContent } from "../config/tooltipContent";
import { useRef, useEffect, useState } from "react";

interface TooltipState {
  isVisible: boolean;
  position: { top: number; left: number };
}

interface TooltipRendererProps {
  tooltips: Record<string, TooltipState>;
  personaData?: any;
  activeTooltipId?: string | null;
  onTooltipMouseEnter?: (key: string) => void;
  onTooltipMouseLeave?: (key: string) => void;
  onContentEdit?: (key: string, html: string) => void;
}

// Map tooltip keys to personaData field names
const tooltipFieldMap: Record<string, string> = {
  age: 'ageTooltip',
  gender: 'genderTooltip',
  income: 'incomeTooltip',
  education: 'educationTooltip',
  location: 'locationTooltip',
  occupation: 'occupationTooltip',
  family: 'familyTooltip',
  spouseOccupation: 'spouseOccupationTooltip',
  ambassadorRank: 'ambassadorRankTooltip',
  vip: 'vipTooltip',
  time: 'timeTooltip',
  revenue: 'revenueTooltip',
  cxRequirementsTooltip: 'cxRequirementsTooltip'
};

export function TooltipRenderer({ 
  tooltips, 
  personaData, 
  activeTooltipId,
  onTooltipMouseEnter, 
  onTooltipMouseLeave,
  onContentEdit
}: TooltipRendererProps) {
  return (
    <>
      {Object.entries(tooltips).map(([key, state]) => {
        if (!state.isVisible || !tooltipContent[key]) return null;
        
        let { width } = tooltipContent[key];
        
        // Get the corresponding personaData field for this tooltip
        const personaDataField = tooltipFieldMap[key];
        const editedContent = personaDataField && personaData?.[personaDataField] !== "N/A" 
          ? personaData[personaDataField] 
          : null;
        
        // Default content is "N/A" if no edited content
        const defaultContent = <p className="text-[16px] text-[#333333] leading-[1.5]">N/A</p>;
        
        return (
          <EditableTooltip
            key={key}
            tooltipKey={key}
            position={state.position}
            width={width}
            content={defaultContent}
            editedContent={editedContent}
            isActive={activeTooltipId === key}
            onMouseEnter={() => onTooltipMouseEnter?.(key)}
            onMouseLeave={() => onTooltipMouseLeave?.(key)}
            onContentEdit={onContentEdit}
          />
        );
      })}
    </>
  );
}

interface EditableTooltipProps {
  tooltipKey: string;
  position: { top: number; left: number };
  width: number;
  content: React.ReactNode;
  editedContent?: string | null;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onContentEdit?: (key: string, html: string) => void;
}

// Helper function to save and restore cursor position
function saveCursorPosition(element: HTMLElement): (() => void) | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const caretOffset = preCaretRange.toString().length;

  return () => {
    let charIndex = 0;
    const nodeStack: Node[] = [element];
    let node: Node | undefined;
    let foundStart = false;
    const newRange = document.createRange();
    newRange.setStart(element, 0);
    newRange.collapse(true);

    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + (node.textContent?.length || 0);
        if (caretOffset >= charIndex && caretOffset <= nextCharIndex) {
          newRange.setStart(node, caretOffset - charIndex);
          newRange.setEnd(node, caretOffset - charIndex);
          foundStart = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  };
}

function EditableTooltip({
  tooltipKey,
  position,
  width,
  content,
  editedContent,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onContentEdit
}: EditableTooltipProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [localContent, setLocalContent] = useState<string>("");
  const isInitializedRef = useRef(false);
  const isTypingRef = useRef(false);

  // Initialize content once when tooltip first appears
  useEffect(() => {
    if (!isInitializedRef.current && contentRef.current) {
      isInitializedRef.current = true;
      
      if (editedContent) {
        // Use edited content if available
        setLocalContent(editedContent);
      } else {
        // Capture initial HTML from React render
        const initialHtml = contentRef.current.innerHTML;
        setLocalContent(initialHtml);
      }
    }
  }, [editedContent]);

  // Update contentEditable div when localContent changes (but preserve cursor)
  useEffect(() => {
    if (contentRef.current && localContent && !isTypingRef.current) {
      const restoreCursor = saveCursorPosition(contentRef.current);
      contentRef.current.innerHTML = localContent;
      if (restoreCursor) {
        restoreCursor();
      }
    }
  }, [localContent]);

  // Handle input - update local state only, don't trigger parent updates
  const handleInput = () => {
    isTypingRef.current = true;
    if (contentRef.current) {
      setLocalContent(contentRef.current.innerHTML);
    }
    // Reset typing flag after a brief delay
    setTimeout(() => {
      isTypingRef.current = false;
    }, 100);
  };

  // Save to parent on blur
  const handleBlur = () => {
    if (contentRef.current && onContentEdit) {
      const html = contentRef.current.innerHTML;
      if (html) {
        onContentEdit(tooltipKey, html);
      }
    }
  };

  // Save when tooltip unmounts
  useEffect(() => {
    return () => {
      if (contentRef.current && onContentEdit) {
        const html = contentRef.current.innerHTML;
        if (html) {
          onContentEdit(tooltipKey, html);
        }
      }
    };
  }, [tooltipKey, onContentEdit]);

  return (
    <div
      className={`fixed px-5 py-4 bg-[#f5f5f5] rounded-xl shadow-lg cursor-text transition-shadow hover:shadow-xl ${
        isActive ? 'z-[10000]' : 'z-[9999]'
      }`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${width}px`,
        pointerEvents: 'auto',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleBlur}
        className="outline-none focus:outline-none"
      >
        {!isInitializedRef.current && !editedContent && content}
      </div>
    </div>
  );
}