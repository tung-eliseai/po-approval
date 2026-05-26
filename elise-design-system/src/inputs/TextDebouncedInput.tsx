import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

import { Search, X } from '../icons';

const MAX_CONSECUTIVE = 5;
const CONSECUTIVE_RE = new RegExp(`(.)\\1{${MAX_CONSECUTIVE},}`, 'g');

type TextDebouncedInputProps = Omit<TextInputProps, 'value' | 'onChange'> &
  React.RefAttributes<HTMLInputElement> & {
    initialValue: string;
    onDebouncedSearch?: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    includeSearchIcon?: boolean;
    maxLength?: number;
  };

const TextDebouncedInput = ({
  initialValue,
  onDebouncedSearch,
  inputRef,
  includeSearchIcon = false,
  maxLength,
  ...props
}: TextDebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [debounced] = useDebouncedValue(value, 500);
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) { initialMount.current = false; return; }
    onDebouncedSearch?.(debounced);
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TextInput
      {...props}
      maxLength={maxLength}
      icon={includeSearchIcon ? <Search /> : undefined}
      rightSection={
        includeSearchIcon ? (
          <ActionIcon onClick={() => setValue('')}><X /></ActionIcon>
        ) : undefined
      }
      value={value}
      onChange={(e) => {
        const sanitized = e.currentTarget.value.replace(
          CONSECUTIVE_RE,
          (_, ch) => ch.repeat(MAX_CONSECUTIVE)
        );
        setValue(sanitized);
      }}
      ref={props.ref ?? inputRef}
    />
  );
};

export default TextDebouncedInput;
