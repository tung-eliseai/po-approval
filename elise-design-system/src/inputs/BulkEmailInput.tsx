import {
  Badge,
  Box,
  CloseButton,
  Group,
  Input,
  InputWrapperBaseProps,
  MantineTheme,
  Text,
  Textarea,
} from '@mantine/core';
import uniq from 'lodash/uniq';
import { useState } from 'react';

import { disabledStyles, labelStyles } from '../theme';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type BulkEmailInputProps = InputWrapperBaseProps & {
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

const BulkEmailInput = ({
  defaultValue,
  value,
  onChange,
  disabled,
  placeholder,
  ...props
}: BulkEmailInputProps) => {
  const [emails, setEmails] = useState<string[]>(value ?? defaultValue ?? []);
  const [textValue, setTextValue] = useState('');

  const addEmail = () => {
    const email = textValue.trim();
    if (!email || emails.includes(email)) { setTextValue(''); return; }
    const next = [...emails, email];
    setEmails(next);
    onChange?.(next);
    setTextValue('');
  };

  const removeEmail = (email: string) => {
    const next = emails.filter((e) => e !== email);
    setEmails(next);
    onChange?.(next);
  };

  const removeLastEmail = () => {
    const next = emails.slice(0, -1);
    setEmails(next);
    onChange?.(next);
  };

  return (
    <Input.Wrapper
      {...props}
      labelProps={{
        ...props.labelProps,
        styles: (theme: MantineTheme) => ({ label: labelStyles(theme) }),
      }}
    >
      <Input.Description>
        You can enter multiple emails at once by separating them with a comma, space, or newline.
      </Input.Description>
      <Box
        sx={(theme) => ({
          fontSize: theme.fontSizes.sm,
          padding: '6px 10px',
          backgroundColor: theme.white,
          borderWidth: '1px',
          borderColor: props.error ? '#b30100' : theme.colors.dark[1],
          ':hover': { borderColor: !disabled ? theme.colors.purple[2] : undefined },
          outline: 'none',
          ':focus-within': { borderColor: theme.colors.purple[5] },
          borderStyle: 'solid',
          borderRadius: theme.radius.sm,
          ...(disabled ? disabledStyles(theme) : {}),
        })}
      >
        {!!emails.length && (
          <Group spacing="xs" mb="xs">
            {emails.map((email) => {
              const valid = isValidEmail(email);
              const color = valid ? 'purple' : 'red';
              return (
                <Badge
                  key={email}
                  variant={disabled ? 'filled' : 'light'}
                  color={disabled ? 'dark.4' : color}
                  rightSection={
                    <CloseButton
                      color={color}
                      variant="transparent"
                      size="xs"
                      disabled={disabled}
                      onClick={() => removeEmail(email)}
                    />
                  }
                >
                  <Text transform="none">{email}</Text>
                </Badge>
              );
            })}
          </Group>
        )}
        <Textarea
          placeholder={placeholder}
          disabled={disabled}
          styles={() => ({ input: { border: 'none' } })}
          value={textValue}
          onKeyDown={(e) => {
            if (e.key === ',' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              addEmail();
            }
            if (e.key === 'Backspace' && !textValue.length) removeLastEmail();
          }}
          onBlur={addEmail}
          onChange={(e) => setTextValue(e.currentTarget.value)}
          onPasteCapture={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('Text').split(/[\s,]+/);
            const valid = pasted.filter(isValidEmail);
            const next = uniq([...emails, ...valid]);
            setEmails(next);
            onChange?.(next);
          }}
        />
      </Box>
    </Input.Wrapper>
  );
};

export default BulkEmailInput;
