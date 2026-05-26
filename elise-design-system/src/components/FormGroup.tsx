import clsx from 'clsx';
import { FunctionComponent, ReactNode } from 'react';

export interface FormGroupProps {
  className?: string;
  contentClassName?: string;
  isDisabled?: boolean;
  helperText?: ReactNode;
  isInline?: boolean;
  label?: ReactNode;
  labelInfo?: ReactNode;
  removeBottomMargin?: boolean;
  children?: ReactNode;
}

export const FormGroup: FunctionComponent<FormGroupProps> = ({
  children,
  className,
  contentClassName,
  isDisabled,
  isInline,
  label,
  labelInfo,
  helperText,
  removeBottomMargin,
}) => (
  <div
    className={clsx(
      'flex flex-col',
      isInline && 'flex-row items-start',
      isDisabled && 'text-gray-400',
      !removeBottomMargin && 'mb-4',
      className
    )}
  >
    {label && (
      <label
        className={clsx('mb-1 font-normal text-sm', isDisabled && 'text-gray-400')}
      >
        {label}
      </label>
    )}
    {labelInfo && (
      <div className="text-[10px] mb-2.5 text-gray-500 font-normal">{labelInfo}</div>
    )}
    <div className={clsx(contentClassName)}>
      {children}
      {helperText && (
        <div className="text-[10px] mt-1 text-gray-500 font-normal">{helperText}</div>
      )}
    </div>
  </div>
);
