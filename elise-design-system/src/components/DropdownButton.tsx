import { Button, Divider, Group, Menu } from '@mantine/core';
import { ReactNode } from 'react';

import { ChevronDown } from '../icons';

export interface DropdownOption {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownButtonProps {
  label: string;
  options: DropdownOption[];
  variant?: 'outline' | 'filled' | 'light' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DropdownButton = ({
  label,
  options,
  variant = 'outline',
  size = 'sm',
  leftIcon,
  loading = false,
  disabled = false,
  className,
}: DropdownButtonProps) => (
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <Button
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        loading={loading}
        disabled={disabled}
        className={className}
      >
        <Group spacing="xs">
          {label}
          <Divider orientation="vertical" />
          <ChevronDown />
        </Group>
      </Button>
    </Menu.Target>
    <Menu.Dropdown>
      {options.map((opt) => (
        <Menu.Item key={opt.key} icon={opt.icon} onClick={opt.onClick} disabled={disabled}>
          {opt.label}
        </Menu.Item>
      ))}
    </Menu.Dropdown>
  </Menu>
);
