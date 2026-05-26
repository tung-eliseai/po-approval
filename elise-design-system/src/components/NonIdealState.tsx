import { FunctionComponent, ReactNode } from 'react';

export interface NonIdealStateProps {
  action?: ReactNode;
  description?: ReactNode;
  attentionGrabber?: ReactNode;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const NonIdealState: FunctionComponent<NonIdealStateProps> = ({
  action,
  description,
  attentionGrabber,
  title,
  className,
  children,
}) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    }}
  >
    {attentionGrabber && (
      <div style={{ color: '#8C8C8C', fontSize: 60, maxWidth: 400, marginBottom: 20 }}>
        {attentionGrabber}
      </div>
    )}
    {title && (
      <h4 style={{ fontSize: 18, lineHeight: '21px', maxWidth: 400, marginBottom: 20 }}>
        {title}
      </h4>
    )}
    {description && (
      <div style={{ maxWidth: 400, marginBottom: 20 }}>{description}</div>
    )}
    {action && <div style={{ maxWidth: 400, marginBottom: 20 }}>{action}</div>}
    {children}
  </div>
);
