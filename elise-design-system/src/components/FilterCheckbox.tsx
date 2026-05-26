import { Anchor, Checkbox, Group, Text } from '@mantine/core';
import { useState } from 'react';

export interface FilterValue {
  key: string;
  label: string;
  checked: boolean;
}

interface FilterCheckboxProps {
  value: FilterValue;
  onChange: (value: FilterValue, isChecked: boolean) => void;
  onSelectOnly?: (value: FilterValue) => void;
  onSelectAll?: () => void;
  onSelectAllExcept?: (value: FilterValue) => void;
  numTotalValues: number;
  numCheckedValues: number;
  isInverseChecked?: boolean;
  hideActions?: boolean;
}

const FilterCheckbox = ({
  value,
  onChange,
  onSelectAll,
  onSelectOnly,
  onSelectAllExcept,
  numTotalValues,
  numCheckedValues,
  isInverseChecked = false,
  hideActions = false,
}: FilterCheckboxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Checkbox
        size="xs"
        styles={() => ({
          body: { width: '100%' },
          labelWrapper: { flexGrow: 1, marginRight: '1rem', maxWidth: '195px' },
        })}
        label={
          <Group position="apart" noWrap>
            <Text style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {value.label}
            </Text>
            {!hideActions && numTotalValues > 1 && !isInverseChecked && (
              <Anchor
                style={{ display: isHovered ? 'block' : 'none' }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  numCheckedValues === 1 ? onSelectAll?.() : onSelectOnly?.(value);
                }}
              >
                {numCheckedValues === 1 ? 'All' : 'Only'}
              </Anchor>
            )}
          </Group>
        }
        checked={value.checked}
        onChange={() => {
          if (isInverseChecked && numCheckedValues === 0) {
            onChange(value, !value.checked);
          } else if (numCheckedValues === 0 && !isInverseChecked && !hideActions) {
            onSelectAllExcept?.(value);
          } else if (numCheckedValues === 1 && value.checked && !hideActions) {
            onSelectAll?.();
          } else {
            onChange(value, !value.checked);
          }
        }}
      />
    </div>
  );
};

export default FilterCheckbox;
