import { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  maxLength?: number;
}

export function EditableText({ value, onChange, className = '', multiline = false, maxLength }: EditableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isUserInput = useRef(false);

  // Set initial content only once on mount
  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, []);

  // Update content only when value changes externally (not from user typing)
  useEffect(() => {
    if (ref.current && !isUserInput.current && ref.current.textContent !== value) {
      const selection = window.getSelection();
      const cursorPosition = selection?.anchorOffset || 0;
      
      ref.current.textContent = value;
      
      // Restore cursor position if element is focused
      if (document.activeElement === ref.current && ref.current.firstChild) {
        try {
          const range = document.createRange();
          range.setStart(ref.current.firstChild, Math.min(cursorPosition, value.length));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        } catch (e) {
          // Ignore errors
        }
      }
    }
    isUserInput.current = false;
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    isUserInput.current = true;
    let newValue = e.currentTarget.textContent || '';
    
    // Enforce maxLength if specified
    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      e.currentTarget.textContent = newValue;
      
      // Move cursor to end
      const range = document.createRange();
      const selection = window.getSelection();
      if (e.currentTarget.firstChild) {
        range.setStart(e.currentTarget.firstChild, newValue.length);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    
    onChange(newValue);
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      className={`${className} outline-none`}
      style={{ minWidth: '20px' }}
      {...(maxLength && { 'data-maxlength': maxLength })}
    />
  );
}
