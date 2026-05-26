import { ActionIcon } from '@mantine/core';
import { showNotification, cleanNotificationsQueue } from '@mantine/notifications';
import { ReactNode } from 'react';

import { Check } from './icons';

const AUTO_CLOSE = 10000;
const GATEWAY_TIMEOUT = /504 Gateway Timeout/i;

const isGatewayTimeout = (v: unknown): boolean => {
  if (typeof v === 'string') return GATEWAY_TIMEOUT.test(v);
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o.message === 'string' && GATEWAY_TIMEOUT.test(o.message)) return true;
    if (typeof o.detail === 'string' && GATEWAY_TIMEOUT.test(o.detail)) return true;
  }
  return false;
};

let active: Record<string, boolean> = {};

export const appNotification = {
  clear: () => {
    cleanNotificationsQueue();
    active = {};
  },

  info: ({
    title,
    message,
    autoClose = true,
    autoCloseMs,
    icon = null,
    showMultiple = true,
  }: {
    title: string;
    message?: ReactNode;
    autoClose?: boolean;
    autoCloseMs?: number;
    icon?: ReactNode;
    showMultiple?: boolean;
  }) => {
    const id = `info-${title}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id, title, message,
      autoClose: autoCloseMs ?? (autoClose ? AUTO_CLOSE : false),
      icon,
      radius: 'lg',
      onClose: () => { delete active[id]; },
    });
  },

  success: ({
    title = 'Success',
    message,
    autoClose = true,
    compact = false,
    icon,
    showMultiple = true,
  }: {
    title?: ReactNode;
    message?: ReactNode;
    autoClose?: boolean;
    compact?: boolean;
    icon?: ReactNode;
    showMultiple?: boolean;
  }) => {
    const id = `success-${typeof title === 'string' ? title : 'notification'}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id, title, message,
      autoClose: autoClose ? (compact ? 2000 : AUTO_CLOSE) : false,
      radius: compact ? 'xs' : 'lg',
      icon: icon ?? (
        <ActionIcon bg="green" radius="xl">
          <Check width={compact ? 16 : 28} height={compact ? 16 : 28} color="white" />
        </ActionIcon>
      ),
      styles: () => ({
        root: {
          '&::before': { backgroundColor: '#00AC11' },
          ...(compact && { padding: '6px', fontSize: '0.4em' }),
        },
      }),
      onClose: () => { delete active[id]; },
    });
  },

  error: ({
    error,
    title = 'Error',
    autoClose = true,
    showMultiple = true,
  }: {
    error: unknown;
    title?: string;
    autoClose?: boolean;
    showMultiple?: boolean;
  }) => {
    const timeout = isGatewayTimeout(title) || isGatewayTimeout(error);
    const displayTitle = timeout ? 'An error occurred' : title;
    const id = `error-${displayTitle}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id,
      title: displayTitle,
      message: timeout ? null : extractMsg(error),
      autoClose: autoClose ? AUTO_CLOSE : false,
      radius: 'lg',
      styles: () => ({ root: { '&::before': { backgroundColor: '#B90000' } } }),
      onClose: () => { delete active[id]; },
    });
  },
};

const extractMsg = (e: unknown): string => {
  if (!e) return 'An unknown error occurred.';
  const err = e as Record<string, unknown>;
  const data = (err?.response as Record<string, unknown>)?.data;
  if (!data) return String(err?.message ?? 'An unknown error occurred.');
  if (typeof data === 'object' && data !== null) {
    const d = data as Record<string, unknown>;
    if (typeof d.message === 'string') return d.message;
    if (typeof d.detail === 'string') return d.detail;
  }
  return JSON.stringify(data, null, 2);
};
