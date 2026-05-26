import { NumberInput, NumberInputProps } from '@mantine/core';

const CurrencyInput = (props: Omit<NumberInputProps, 'parser' | 'formatter'>) => (
  <NumberInput
    {...props}
    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ''}
    formatter={(value) =>
      value && !Number.isNaN(parseFloat(value))
        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : ''
    }
  />
);

export default CurrencyInput;
