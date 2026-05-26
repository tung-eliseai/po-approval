import React from 'react';

import {
  ExclamationCircleFill,
  ExclamationTriangleFill,
  InfoCircle,
  XCircleFill,
} from '../icons';

type AlertType = 'neutral' | 'info' | 'warning' | 'error';

interface TailwindAlertProps {
  children: React.ReactNode;
  type?: AlertType;
  multiLine?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  actions?: React.ReactNode;
}

const DEFAULT_ICONS: Record<AlertType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  neutral: ExclamationCircleFill,
  info: InfoCircle,
  warning: ExclamationTriangleFill,
  error: XCircleFill,
};

const ALERT_STYLES: Record<AlertType, { bg: string; icon: string; text: string }> = {
  neutral: { bg: 'bg-gray-50', icon: 'text-gray-500', text: 'text-gray-700' },
  info: { bg: 'bg-blue-50', icon: 'text-blue-500', text: 'text-blue-700' },
  warning: { bg: 'bg-orange-50', icon: 'text-orange-500', text: 'text-orange-700' },
  error: { bg: 'bg-red-50', icon: 'text-red-500', text: 'text-red-700' },
};

export const TailwindAlert: React.FC<TailwindAlertProps> = ({
  children,
  type = 'neutral',
  multiLine = false,
  icon,
  actions,
}) => {
  const IconComponent = icon || DEFAULT_ICONS[type];
  const s = ALERT_STYLES[type];

  return (
    <div
      className={`flex flex-row px-3 rounded-md ${s.bg} ${
        multiLine ? 'h-auto items-start py-3' : 'h-9 items-center py-2'
      }`}
      role="alert"
    >
      <IconComponent
        className={`flex-shrink-0 mr-3 w-4 h-4 ${s.icon} ${multiLine ? 'mt-1' : ''}`}
      />
      <span className="sr-only">{type}</span>
      <div
        className={`flex-1 ${s.text} ${
          multiLine
            ? 'leading-5 flex flex-col gap-y-2 text-sm'
            : 'whitespace-nowrap overflow-hidden text-ellipsis text-sm'
        }`}
      >
        {children}
      </div>
      {actions && (
        <div
          className={`flex-shrink-0 ${
            multiLine ? 'flex flex-col gap-2 mt-1' : 'flex flex-row gap-2 ml-2'
          }`}
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export const Alert = TailwindAlert;
