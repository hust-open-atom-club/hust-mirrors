import React, { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  className,
  ariaLabel = 'Search mirrors',
  placeholder = '按下 / 开始搜索',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key == 'Escape') {
          inputRef.current?.blur();
          onChange("");
        }
      }}
      aria-label={ariaLabel}
      className={className}
      placeholder={placeholder}
    />
  );
}