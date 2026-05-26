import { MantineThemeOverride, MantineTheme } from '@mantine/core';

export const labelStyles = (theme: MantineTheme) => ({
  fontSize: theme.fontSizes.xs,
  color: theme.colors.dark[9],
  fontWeight: 400,
});

export const disabledStyles = (theme: MantineTheme) => ({
  color: theme.colors.dark[5],
  backgroundColor: theme.colors.dark[0],
  opacity: 1,
});

const inputStyles = (theme: MantineTheme) => ({
  fontSize: theme.fontSizes.sm,
  padding: '6px 10px',
  backgroundColor: '#FFFFFF',
  borderWidth: '1px',
  borderColor: theme.colors.dark[1],
  ':disabled': disabledStyles(theme),
  ':hover&:not(:disabled)&:not(:focus)': { borderColor: theme.colors.purple[2] },
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  outline: 'none',
  ':focus': { borderColor: theme.colors.purple[5] },
});

const dropdownStyles = (theme: MantineTheme) => ({
  display: 'inline-block',
  padding: '0px',
  marginTop: '4px',
  minWidth: '140px',
  width: 'fit-content',
  maxWidth: '400px',
  background: '#FFFFFF',
  border: `1px solid ${theme.colors.dark[1]}`,
  boxShadow: '0px 9px 16px -6px rgba(0, 0, 0, 0.3)',
  borderRadius: '2px',
});

export const EliseTheme: MantineThemeOverride = {
  globalStyles() {
    return { body: { letterSpacing: '0.3px' } };
  },
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 },
  colors: {
    purple: ['#eee7ff', '#cabafc', '#a78df3', '#8460ed', '#6032e6', '#4719cd', '#3712a0', '#260d74', '#170747', '#09011d'],
    yellow: ['#fff7dd', '#fce8b3', '#f8d886', '#f5c856', '#f2b929', '#d99f11', '#a97c0a', '#785904', '#493500', '#1b1200'],
    orange: ['#ffebe1', '#fbccb8', '#f2ab8d', '#ea8b61', '#e36935', '#ca501c', '#9e3d15', '#712b0d', '#451904', '#1d0500'],
    teal:   ['#e1f8ff', '#bee4f1', '#9ad1e4', '#75bfd9', '#50accd', '#3993b4', '#29728c', '#1b5265', '#09313f', '#001219'],
    green:  ['#e3fcec', '#bfefd1', '#9be3b5', '#74d899', '#4ecc7d', '#36b364', '#278b4d', '#1a6336', '#0b3d1f', '#001605'],
    red:    ['#ffe2e2', '#ffb1b2', '#ff7f7f', '#ff4d4d', '#fe1d1b', '#e50501', '#b30000', '#810000', '#4f0000', '#200000'],
    blue:   ['#e5ebff', '#b6c2fe', '#8699f8', '#5770f5', '#2a47f1', '#142fd7', '#0c23a8', '#071979', '#020f4a', '#00051d'],
    dark:   ['#EFEFEF', '#D9D9D9', '#BFBFBF', '#A6A6A6', '#8C8C8C', '#737373', '#595959', '#404040', '#262626', '#000000'],
  },
  primaryColor: 'purple',
  black: '#000000',
  white: '#FFFFFF',
  loader: 'dots',
  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
  radius: { xs: 2, sm: 6, md: 10, lg: 16 },
  components: {
    Title: { styles: () => ({ root: { fontWeight: 600 } }) },
    InputBase: { styles: (t) => ({ input: inputStyles(t), label: labelStyles(t) }) },
    Input: { styles: (t) => ({ input: inputStyles(t) }) },
    NumberInput: { styles: (t) => ({ input: inputStyles(t), label: labelStyles(t) }) },
    TextInput: { styles: (t) => ({ label: labelStyles(t) }) },
    Textarea: { styles: (t) => ({ label: labelStyles(t), input: { ...inputStyles(t), overflowY: 'scroll' } }) },
    Button: {
      defaultProps: { radius: 'sm' },
      styles: () => ({ inner: { fontWeight: 'normal' }, root: { padding: '3px 10px' } }),
    },
    Select: { styles: (t) => ({ label: labelStyles(t), input: inputStyles(t) }) },
    MultiSelect: {
      styles: (t) => ({
        label: labelStyles(t),
        wrapper: { padding: 0 },
        input: { ...inputStyles(t), paddingTop: 0, paddingBottom: 0, maxHeight: 100, overflowY: 'scroll' },
        searchInput: { ':focus': { outline: 'none' }, ':focus-within': { outline: 'none' } },
      }),
    },
    Badge: {
      defaultProps: { radius: 'xl' },
      styles: (_t: MantineTheme, params: { variant: string }) => ({
        root: { ...(params.variant !== 'outline' && { border: 'none' }) },
        inner: { textTransform: 'none', fontWeight: 'normal', padding: 0, fontSize: 10 },
      }),
    },
    Modal: { styles: () => ({ header: { fontWeight: 600, fontSize: '14px' } }) },
    Switch: {
      styles: () => ({
        root: { display: 'flex', alignItems: 'center' },
        label: { margin: 0 },
        track: { cursor: 'pointer' },
        body: { cursor: 'pointer' },
      }),
    },
    Menu: {
      styles: (t) => ({
        label: { fontSize: t.fontSizes.sm, paddingBottom: 0 },
        item: { paddingTop: 6, paddingBottom: 6, paddingLeft: t.spacing.md },
        dropdown: { maxHeight: '400px', overflowY: 'auto' },
      }),
    },
    Autocomplete: {
      styles: (t) => ({
        input: inputStyles(t),
        label: labelStyles(t),
        dropdown: dropdownStyles(t),
        item: { fontSize: 12, padding: '2px 8px', ':hover': { background: t.colors.gray[1] } },
      }),
    },
    Radio: { styles: (t) => ({ label: labelStyles(t) }) },
    RadioGroup: { styles: (t) => ({ label: labelStyles(t) }) },
    SegmentedControl: { styles: () => ({ label: { marginBottom: 0 } }) },
    Anchor: {
      styles: (t) => ({
        root: { color: t.colors.purple[6], '&:hover': { color: t.colors.purple[6] } },
      }),
    },
  },
};
