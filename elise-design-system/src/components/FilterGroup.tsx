import {
  Badge,
  Box,
  Button,
  Center,
  ChevronIcon,
  Collapse,
  Divider,
  Group,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';

import FilterCheckbox, { FilterValue } from './FilterCheckbox';

interface FilterGroupProps {
  title: string;
  values: FilterValue[];
  onChange: (value: FilterValue, isChecked: boolean) => void;
  isLoading: boolean;
  onSelectOnly?: (value: FilterValue) => void;
  onSelectAll?: () => void;
  onSelectAllExcept?: (value: FilterValue) => void;
  onClearAll?: () => void;
  searchable?: boolean;
  sortSelectedFirst?: boolean;
  footer?: React.ReactNode;
  isInverseChecked?: boolean;
  customBadgeValue?: React.ReactNode;
  hideActions?: boolean;
  customSearchProps?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
}

const FilterGroup = ({
  values,
  onChange,
  title,
  isLoading,
  onSelectAll,
  onSelectOnly,
  onSelectAllExcept,
  onClearAll,
  searchable,
  sortSelectedFirst,
  footer,
  isInverseChecked = false,
  customBadgeValue,
  hideActions = false,
  customSearchProps,
}: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchStr, setSearchStr] = useState('');

  const checkedCount = values.filter((v) => v.checked).length;
  const ITEM_HEIGHT = 27;
  const hasCustomSearch = !!customSearchProps;

  const searchedValues = useMemo(() => {
    const sorted = sortBy(values, (v) => v.label.trim()).filter((v) =>
      hasCustomSearch ? true : v.label.toLowerCase().includes(searchStr.toLowerCase())
    );
    return sortSelectedFirst ? sortBy(sorted, (v) => (v.checked ? -1 : 0)) : sorted;
  }, [hasCustomSearch, searchStr, sortSelectedFirst, values]);

  const sectionHeight = useMemo(
    () => Math.min(300, searchedValues.length * ITEM_HEIGHT),
    [searchedValues.length]
  );

  const badgeValue =
    customBadgeValue !== undefined
      ? customBadgeValue
      : checkedCount === 0
        ? values.length
        : checkedCount;

  return (
    <>
      <Group position="apart" style={{ cursor: 'pointer', margin: '.5rem 0' }} noWrap align="center">
        <Group
          onClick={() => setIsOpen(!isOpen)}
          spacing="xs"
          noWrap
          align="center"
          sx={{ flexGrow: 1 }}
        >
          <Text fw={600}>{title} </Text>
          <Badge size="sm">{badgeValue}</Badge>
        </Group>
        <Group spacing="xs" noWrap align="center">
          {checkedCount > 0 && onClearAll && (
            <Button
              variant="subtle"
              size="xs"
              compact
              color="gray"
              onClick={(e) => { e.stopPropagation(); onClearAll(); }}
              sx={{ height: 20, minHeight: 20, fontSize: 11 }}
            >
              Clear
            </Button>
          )}
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={isOpen ? { transform: 'rotate(180deg)', transition: '1sec' } : {}}
          >
            <ChevronIcon />
          </Box>
        </Group>
      </Group>

      <Collapse in={isOpen}>
        {searchable && customSearchProps && (
          <TextInput
            size="xs"
            placeholder={customSearchProps.placeholder || 'Search...'}
            style={{ marginBottom: '.5rem' }}
            value={customSearchProps.value}
            onChange={(e) => customSearchProps.onChange(e.currentTarget.value)}
          />
        )}
        {searchable && !customSearchProps && (
          <TextInput
            size="xs"
            placeholder="Search..."
            style={{ marginBottom: '.5rem' }}
            value={searchStr}
            onChange={(e) => setSearchStr(e.currentTarget.value)}
          />
        )}

        {isLoading ? (
          <Center my="lg"><Loader /></Center>
        ) : (
          <>
            <ScrollArea styles={() => ({ root: { height: `${sectionHeight}px` } })}>
              <FixedSizeList
                height={sectionHeight}
                width={226}
                itemData={searchedValues}
                itemCount={searchedValues.length}
                itemSize={ITEM_HEIGHT}
              >
                {({ style, index }) => {
                  const value = searchedValues[index];
                  return (
                    <div style={style} key={value.key}>
                      <FilterCheckbox
                        numCheckedValues={checkedCount}
                        value={value}
                        numTotalValues={values.length}
                        onChange={onChange}
                        onSelectAll={onSelectAll}
                        onSelectAllExcept={onSelectAllExcept}
                        onSelectOnly={onSelectOnly}
                        isInverseChecked={isInverseChecked}
                        hideActions={hideActions}
                      />
                    </div>
                  );
                }}
              </FixedSizeList>
            </ScrollArea>
            {footer && <Box mb="sm">{footer}</Box>}
          </>
        )}
      </Collapse>
      <Divider />
    </>
  );
};

export default FilterGroup;
