import { FunctionComponent } from 'react';

interface NotificationBadgeProps {
  notificationNumber: number;
  className?: string;
}

export const NotificationBadge: FunctionComponent<NotificationBadgeProps> = ({
  notificationNumber,
  className,
}) => {
  const digits = notificationNumber.toString().length;
  const fontSize = digits >= 4 ? 7 : digits === 3 ? 9 : 12;

  return (
    <div
      className={className}
      style={{
        fontFamily: 'SF Pro, -apple-system, sans-serif',
        fontWeight: 700,
        fontSize,
        color: '#ffffff',
        lineHeight: '18px',
        backgroundColor: '#B90000',
        height: 20,
        aspectRatio: '1',
        borderRadius: '50%',
        display: 'inline-flex',
        marginLeft: 6,
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {notificationNumber}
    </div>
  );
};
