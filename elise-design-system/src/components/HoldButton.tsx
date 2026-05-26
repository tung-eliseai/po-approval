import { useEffect, useState } from 'react';

interface HoldButtonProps {
  holdTime: number;
  text: string;
  color: string;
  onConfirm: () => void;
  disabled?: boolean;
  unclickedTextColor?: string;
  inProgressTextColor?: string;
  startTimerOn: 'mount' | 'click';
  submitAfterTime?: boolean;
}

const HoldButton = ({
  holdTime,
  text,
  color,
  onConfirm,
  disabled,
  unclickedTextColor = 'white',
  inProgressTextColor = 'black',
  startTimerOn,
  submitAfterTime,
}: HoldButtonProps) => {
  const [isHolding, setIsHolding] = useState(startTimerOn === 'mount');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress >= holdTime) {
      setIsHolding(false);
      setProgress(0);
      if (startTimerOn === 'click') {
        onConfirm();
      } else {
        setIsComplete(true);
        if (submitAfterTime) onConfirm();
      }
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    if (progress < holdTime && isHolding) {
      timeout = setTimeout(() => setProgress(progress + 10), 10);
    } else {
      setProgress(0);
    }
    return () => clearTimeout(timeout);
  }, [progress, isHolding, holdTime, onConfirm, startTimerOn, submitAfterTime]);

  const clickProps =
    startTimerOn === 'click'
      ? {
          onMouseDownCapture: () => { if (!disabled) setIsHolding(true); },
          onMouseUpCapture: () => setIsHolding(false),
          onMouseLeave: () => setIsHolding(false),
        }
      : {
          onClick: () => { if (isComplete) onConfirm(); },
        };

  const pct = progress ? (progress / holdTime) * 100 : 0;

  return (
    <div
      style={{
        display: 'inline-flex',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          border: `1px solid ${color}`,
          borderRadius: 6,
          overflow: 'hidden',
          minWidth: 120,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          background: progress ? undefined : color,
        }}
        {...clickProps}
      >
        {pct > 0 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${pct}%`,
              background: color,
              transition: 'width 10ms linear',
            }}
          />
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 16px',
            color: progress ? inProgressTextColor : unclickedTextColor,
            fontWeight: 500,
            fontSize: 14,
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default HoldButton;
