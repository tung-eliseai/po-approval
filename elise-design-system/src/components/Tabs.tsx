import clsx from 'clsx';
import React, {
  FunctionComponent,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { NotificationBadge } from './NotificationBadge';

// ─── Tab ────────────────────────────────────────────────────────────────────

export interface TabProps {
  className?: string;
  component: ReactElement;
  children?: React.ReactNode;
  disabled?: boolean;
  id: string | number;
  title: React.ReactNode;
  numNotifications?: number;
}

export const Tab: FunctionComponent<TabProps> = ({ className, component }) => (
  <div>
    <div style={{ marginTop: 20, display: 'flex' }} className={className}>
      {component}
    </div>
  </div>
);

Tab.displayName = 'MeetElise.Tab';

// ─── TabTitle ────────────────────────────────────────────────────────────────

interface TabTitleProps extends TabProps {
  onClick: (id: string | number, event: React.MouseEvent<HTMLElement>) => void;
  parentId: string | number;
  isSelected: boolean;
}

const generateTabComponentId = (parentId: string | number, tabId: string | number) =>
  `tab-component_${parentId}_${tabId}`;

const generateTabTitleId = (parentId: string | number, tabId: string | number) =>
  `tab-title_${parentId}_${tabId}`;

const TabTitle = forwardRef<HTMLDivElement, TabTitleProps>(
  ({ className, children, disabled, id, parentId, isSelected, title, onClick, numNotifications }, ref) => (
    <div
      aria-controls={generateTabComponentId(parentId, id)}
      aria-disabled={disabled}
      aria-expanded={isSelected}
      aria-selected={isSelected}
      data-tab-id={id}
      id={generateTabTitleId(parentId, id)}
      onClick={(e) => { if (!disabled) onClick(id, e); }}
      role="tab"
      tabIndex={disabled ? undefined : 0}
      ref={ref}
      className={clsx('tab-title', className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'SF Pro, -apple-system, sans-serif',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
        flex: '0 0 auto',
        verticalAlign: 'top',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        userSelect: 'none',
        color: disabled ? '#BFBFBF' : isSelected ? '#202020' : undefined,
      }}
    >
      {title}
      {!!numNotifications && <NotificationBadge notificationNumber={numNotifications} />}
      {children}
    </div>
  )
);

// ─── Tabs ────────────────────────────────────────────────────────────────────

type TabElement = React.ReactElement<TabProps & { children: React.ReactNode }>;

interface TabsProps {
  defaultSelectedTabId?: string | number;
  id: string | number;
  selectedTabId?: string | number;
  className?: string;
  onChange?: (
    newTabId: string | number,
    prevTabId: string | number | undefined,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  children?: React.ReactNode;
  isSticky?: boolean;
  rightElement?: React.ReactNode;
}

function isTabElement(child: any): child is TabElement {
  return (
    child != null &&
    child.type != null &&
    child.type.displayName != null &&
    child.type.displayName === Tab.displayName
  );
}

function getTabChildren(props: TabsProps) {
  return React.Children.toArray(props.children).filter(isTabElement);
}

function getInitialSelectedTabId(props: TabsProps) {
  if (props.selectedTabId !== undefined) return props.selectedTabId;
  if (props.defaultSelectedTabId !== undefined) return props.defaultSelectedTabId;
  const tabs = getTabChildren(props);
  return tabs.length === 0 ? undefined : tabs[0].props.id;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Tabs: FunctionComponent<TabsProps> = (props) => {
  const [selectedTabId, setSelectedTabId] = useState(getInitialSelectedTabId(props));
  const [animate, setAnimate] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ display: 'none' });

  const selectedTabRefCallback = useCallback(
    async (node: HTMLDivElement | null) => {
      if (!node) return;
      while (node.clientWidth === 0) await sleep(10);
      const { clientHeight, clientWidth, offsetLeft, offsetHeight } = node;
      const style: React.CSSProperties = {
        top: clientHeight,
        transform: `translateX(${Math.floor(offsetLeft)}px) translateY(${Math.floor(offsetHeight - 16)}px)`,
        width: clientWidth,
      };
      if (!animate) {
        style.transition = 'none';
        style.transitionTimingFunction = 'unset';
        style.transitionDuration = 'unset';
      }
      setIndicatorStyle(style);
      setAnimate(true);
    },
    [animate]
  );

  useEffect(() => {
    if (props.selectedTabId) setSelectedTabId(props.selectedTabId);
  }, [props.selectedTabId]);

  const handleTabClick = (newTabId: string | number, event: React.MouseEvent<HTMLElement>) => {
    props.onChange?.(newTabId, selectedTabId, event);
    if (props.selectedTabId === undefined) setSelectedTabId(newTabId);
  };

  const tabTitles = React.Children.map(props.children, (child) => {
    if (!isTabElement(child)) return child;
    const { id } = child.props;
    return (
      <TabTitle
        {...child.props}
        key={id}
        parentId={props.id}
        onClick={handleTabClick}
        isSelected={id === selectedTabId}
        ref={id === selectedTabId ? selectedTabRefCallback : null}
      />
    );
  });

  const tabComponents = getTabChildren(props)
    .filter((tab) => tab.props.id === selectedTabId)
    .map((tab) => {
      if (!tab.props.component) return undefined;
      const { className, component, id } = tab.props;
      return (
        <div
          aria-labelledby={generateTabTitleId(props.id, id)}
          aria-hidden={id !== selectedTabId}
          className={clsx(className)}
          id={generateTabComponentId(props.id, id)}
          key={id}
          role="tabpanel"
          style={{ marginTop: 20, display: id !== selectedTabId ? 'none' : undefined }}
        >
          {component}
        </div>
      );
    });

  return (
    <div className={props.className}>
      <div style={props.isSticky ? { position: 'sticky', top: 0, background: '#fff' } : undefined}>
        <div
          role="tablist"
          style={{
            alignItems: 'flex-end',
            border: 'none',
            display: 'flex',
            flex: '0 0 auto',
            listStyle: 'none',
            margin: 0,
            paddingRight: 20,
            position: 'relative',
            gap: 40,
          }}
        >
          {tabTitles}
          <div
            style={{
              left: 0,
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              transition: 'height, transform, width, color',
              transitionDuration: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 1, 0.75, 0.9)',
              ...indicatorStyle,
            }}
          >
            <div
              style={{
                background: '#202020',
                height: 4,
                width: '100%',
                position: 'absolute',
                transition: 'height, transform, width, color',
                transitionDuration: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 1, 0.75, 0.9)',
                top: 0,
              }}
            />
          </div>
          <div style={{ position: 'absolute', right: 0, color: '#595959', fontSize: 6 }}>
            {props.rightElement}
          </div>
        </div>
        <div style={{ width: '100%', height: 1, backgroundColor: '#D9D9D9', marginTop: 12 }} />
      </div>
      {tabComponents}
    </div>
  );
};
