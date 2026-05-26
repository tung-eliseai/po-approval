import { TextInput, TextInputProps } from '@mantine/core';
import { useEffect, useState } from 'react';

type PhoneInputProps = Omit<TextInputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

const formatUS = (digits: string): string => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const formatDisplay = (raw: string): string => {
  if (!raw) return '';
  if (raw.startsWith('+') && !raw.startsWith('+1')) return raw;
  const digits = raw.replace(/^\+1/, '').replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  return formatUS(digits);
};

const PhoneInput = ({ onChange, ...props }: PhoneInputProps) => {
  const [display, setDisplay] = useState(() =>
    typeof props.value === 'string' ? formatDisplay(props.value) : ''
  );

  useEffect(() => {
    if (typeof props.value === 'string') {
      setDisplay(formatDisplay(props.value));
    }
  }, [props.value]);

  return (
    <TextInput
      {...props}
      value={display}
      onChange={(e) => {
        const raw = e.currentTarget.value.replace(/[^\d+]/g, '');
        setDisplay(formatDisplay(raw));
        onChange(raw.length >= 2 && !raw.startsWith('+') ? '+1' + raw : raw);
      }}
    />
  );
};

export default PhoneInput;
