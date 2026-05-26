import { Box, Radio, UnstyledButton, createStyles } from '@mantine/core';

interface CustomRadioCardProps {
  value: string;
  title: string;
  description?: string;
  className?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
    backgroundColor: theme.white,
    transition: 'background-color 150ms ease',
    cursor: 'pointer',
    '&:hover': { backgroundColor: theme.colors.gray[0] },
  },
  radio: { marginTop: 2 },
  content: { flex: 1, marginLeft: theme.spacing.md },
  title: { fontSize: theme.fontSizes.lg, fontWeight: 500, lineHeight: 1, marginBottom: theme.spacing.xs },
  description: { fontSize: theme.fontSizes.sm, color: theme.colors.gray[6] },
}));

export const CustomRadioCard = ({
  value,
  title,
  description,
  className,
  checked,
  onChange,
}: CustomRadioCardProps) => {
  const { classes, cx } = useStyles();

  return (
    <UnstyledButton className={cx(classes.card, className)} onClick={() => onChange?.(value)}>
      <Radio checked={checked} readOnly tabIndex={-1} className={classes.radio} />
      <Box className={classes.content}>
        <Box className={classes.title}>{title}</Box>
        {description && <Box className={classes.description}>{description}</Box>}
      </Box>
    </UnstyledButton>
  );
};
