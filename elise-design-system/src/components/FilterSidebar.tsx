import { CloseButton, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxHeight: string | number;
}

const FilterSidebar = ({ isOpen, onClose, children, title, maxHeight }: FilterSidebarProps) => {
  if (!isOpen) return <></>;

  return (
    <Paper sx={(theme) => ({ width: '256px', minWidth: '250px', padding: theme.spacing.sm })}>
      <Group position="apart">
        <Text size="md" fw={600}>{title ?? 'Filter'}</Text>
        <CloseButton onClick={onClose} />
      </Group>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ScrollArea.Autosize maxHeight={maxHeight} offsetScrollbars {...({} as any)}>
        {children}
      </ScrollArea.Autosize>
    </Paper>
  );
};

export default FilterSidebar;
