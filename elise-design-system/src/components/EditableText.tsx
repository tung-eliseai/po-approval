import { Tooltip } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

import { Check, Pencil } from '../icons';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

export const EditableText = ({ value, onSave, className = '' }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSave(); }
    else if (e.key === 'Escape') { handleCancel(); }
  };

  return (
    <div
      className={`relative flex-1 ${
        isEditing ? 'ring-2 ring-blue-500 ring-offset-4 rounded' : 'group'
      }`}
    >
      <span className={`${className} ${isEditing ? 'invisible' : ''}`}>
        {isEditing ? editValue || ' ' : value}
      </span>

      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancel}
            className={`absolute left-0 top-0 w-full h-full border-none bg-transparent p-0 focus:outline-none focus:ring-0 ${className}`}
          />
          <button
            onMouseDown={(e) => { e.preventDefault(); handleSave(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 mr-2 rounded bg-transparent"
          >
            <Check className="w-4 h-4 text-gray-500 hover:text-black" />
          </button>
        </>
      ) : (
        <Tooltip label="Edit title" withArrow>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 p-1.5 rounded-md bg-transparent hover:bg-gray-100 align-middle relative -top-1"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};
