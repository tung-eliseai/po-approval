import { Tabs, TabsProps } from '@mantine/core';

const ButtonGroupTabs = (props: TabsProps) => (
  <Tabs
    unstyled
    styles={(theme, p) => ({
      tab: {
        ...theme.fn.focusStyles(),
        backgroundColor: theme.white,
        color: theme.colors.gray[9],
        border: `1px solid ${theme.colors.gray[4]}`,
        cursor: 'pointer',
        fontSize: theme.fontSizes.md,
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
        '&:not(:first-of-type)': { borderLeft: 0 },
        '&:first-of-type': {
          borderTopLeftRadius: theme.radius.md,
          borderBottomLeftRadius: theme.radius.md,
        },
        '&:last-of-type': {
          borderTopRightRadius: theme.radius.md,
          borderBottomRightRadius: theme.radius.md,
        },
        '&[data-active]': {
          backgroundColor: p.color ? theme.colors[p.color][5] : theme.colors.purple[5],
          borderColor: p.color ? theme.colors[p.color][5] : theme.colors.purple[5],
          color: theme.white,
        },
      },
      tabIcon: { marginRight: theme.spacing.xs, display: 'flex', alignItems: 'center' },
      tabsList: { display: 'flex' },
    })}
    {...props}
  />
);

export default ButtonGroupTabs;
