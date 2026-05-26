import { Title } from '@mantine/core';
import { ReactNode } from 'react';

interface CardSectionProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const CardSection = ({
  icon,
  title,
  subtitle,
  action,
  children,
  className = '',
}: CardSectionProps) => (
  <div
    className={`flex flex-col gap-4 p-[20px] border border-gray-200 bg-white rounded-lg w-full ${className}`}
  >
    <div className="flex items-start gap-4">
      {icon && (
        <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <Title order={5} className="text-gray-900">
          {title}
        </Title>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </div>
    {children}
  </div>
);
