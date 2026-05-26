import { MantineThemeOverride, MantineTheme, TabsProps as TabsProps$1, NumberInputProps, TextInputProps, InputWrapperBaseProps } from '@mantine/core';
import React$1, { FC, SVGProps, ReactNode, FunctionComponent, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const labelStyles: (theme: MantineTheme) => {
    fontSize: number;
    color: string;
    fontWeight: number;
};
declare const disabledStyles: (theme: MantineTheme) => {
    color: string;
    backgroundColor: string;
    opacity: number;
};
declare const EliseTheme: MantineThemeOverride;

type IconProps = SVGProps<SVGSVGElement>;
declare const Check: FC<IconProps>;
declare const X: FC<IconProps>;
declare const Search: FC<IconProps>;
declare const ChevronDown: FC<IconProps>;
declare const ChevronUp: FC<IconProps>;
declare const Plus: FC<IconProps>;
declare const Filter: FC<IconProps>;
declare const Bell: FC<IconProps>;
declare const Building: FC<IconProps>;
declare const Trash: FC<IconProps>;
declare const Pencil: FC<IconProps>;
declare const Settings: FC<IconProps>;
declare const ExclamationCircleFill: FC<IconProps>;
declare const InfoCircle: FC<IconProps>;
declare const ExclamationTriangleFill: FC<IconProps>;
declare const XCircleFill: FC<IconProps>;

declare const appNotification: {
    clear: () => void;
    info: ({ title, message, autoClose, autoCloseMs, icon, showMultiple, }: {
        title: string;
        message?: ReactNode;
        autoClose?: boolean;
        autoCloseMs?: number;
        icon?: ReactNode;
        showMultiple?: boolean;
    }) => void;
    success: ({ title, message, autoClose, compact, icon, showMultiple, }: {
        title?: ReactNode;
        message?: ReactNode;
        autoClose?: boolean;
        compact?: boolean;
        icon?: ReactNode;
        showMultiple?: boolean;
    }) => void;
    error: ({ error, title, autoClose, showMultiple, }: {
        error: unknown;
        title?: string;
        autoClose?: boolean;
        showMultiple?: boolean;
    }) => void;
};

interface CardSectionProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    action?: ReactNode;
    children?: ReactNode;
    className?: string;
}
declare const CardSection: ({ icon, title, subtitle, action, children, className, }: CardSectionProps) => react_jsx_runtime.JSX.Element;

declare const ButtonGroupTabs: (props: TabsProps$1) => react_jsx_runtime.JSX.Element;

type AlertType = 'neutral' | 'info' | 'warning' | 'error';
interface TailwindAlertProps {
    children: React$1.ReactNode;
    type?: AlertType;
    multiLine?: boolean;
    icon?: React$1.ComponentType<React$1.SVGProps<SVGSVGElement>>;
    actions?: React$1.ReactNode;
}
declare const TailwindAlert: React$1.FC<TailwindAlertProps>;
declare const Alert: React$1.FC<TailwindAlertProps>;

interface DropdownOption {
    key: string;
    label: string;
    icon?: ReactNode;
    onClick: () => void;
}
interface DropdownButtonProps {
    label: string;
    options: DropdownOption[];
    variant?: 'outline' | 'filled' | 'light' | 'subtle';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    leftIcon?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}
declare const DropdownButton: ({ label, options, variant, size, leftIcon, loading, disabled, className, }: DropdownButtonProps) => react_jsx_runtime.JSX.Element;

interface CustomRadioCardProps {
    value: string;
    title: string;
    description?: string;
    className?: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}
declare const CustomRadioCard: ({ value, title, description, className, checked, onChange, }: CustomRadioCardProps) => react_jsx_runtime.JSX.Element;

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
}
declare const EditableText: ({ value, onSave, className }: EditableTextProps) => react_jsx_runtime.JSX.Element;

interface FormGroupProps {
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
declare const FormGroup: FunctionComponent<FormGroupProps>;

interface NotificationBadgeProps {
    notificationNumber: number;
    className?: string;
}
declare const NotificationBadge: FunctionComponent<NotificationBadgeProps>;

interface NonIdealStateProps {
    action?: ReactNode;
    description?: ReactNode;
    attentionGrabber?: ReactNode;
    title?: ReactNode;
    className?: string;
    children?: ReactNode;
}
declare const NonIdealState: FunctionComponent<NonIdealStateProps>;

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
declare const HoldButton: ({ holdTime, text, color, onConfirm, disabled, unclickedTextColor, inProgressTextColor, startTimerOn, submitAfterTime, }: HoldButtonProps) => react_jsx_runtime.JSX.Element;

interface TabProps {
    className?: string;
    component: ReactElement;
    children?: React$1.ReactNode;
    disabled?: boolean;
    id: string | number;
    title: React$1.ReactNode;
    numNotifications?: number;
}
declare const Tab: FunctionComponent<TabProps>;
interface TabsProps {
    defaultSelectedTabId?: string | number;
    id: string | number;
    selectedTabId?: string | number;
    className?: string;
    onChange?: (newTabId: string | number, prevTabId: string | number | undefined, event: React$1.MouseEvent<HTMLElement>) => void;
    children?: React$1.ReactNode;
    isSticky?: boolean;
    rightElement?: React$1.ReactNode;
}
declare const Tabs: FunctionComponent<TabsProps>;

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxHeight: string | number;
}
declare const FilterSidebar: ({ isOpen, onClose, children, title, maxHeight }: FilterSidebarProps) => react_jsx_runtime.JSX.Element;

interface FilterValue {
    key: string;
    label: string;
    checked: boolean;
}
interface FilterCheckboxProps {
    value: FilterValue;
    onChange: (value: FilterValue, isChecked: boolean) => void;
    onSelectOnly?: (value: FilterValue) => void;
    onSelectAll?: () => void;
    onSelectAllExcept?: (value: FilterValue) => void;
    numTotalValues: number;
    numCheckedValues: number;
    isInverseChecked?: boolean;
    hideActions?: boolean;
}
declare const FilterCheckbox: ({ value, onChange, onSelectAll, onSelectOnly, onSelectAllExcept, numTotalValues, numCheckedValues, isInverseChecked, hideActions, }: FilterCheckboxProps) => react_jsx_runtime.JSX.Element;

interface FilterGroupProps {
    title: string;
    values: FilterValue[];
    onChange: (value: FilterValue, isChecked: boolean) => void;
    isLoading: boolean;
    onSelectOnly?: (value: FilterValue) => void;
    onSelectAll?: () => void;
    onSelectAllExcept?: (value: FilterValue) => void;
    onClearAll?: () => void;
    searchable?: boolean;
    sortSelectedFirst?: boolean;
    footer?: React.ReactNode;
    isInverseChecked?: boolean;
    customBadgeValue?: React.ReactNode;
    hideActions?: boolean;
    customSearchProps?: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
}
declare const FilterGroup: ({ values, onChange, title, isLoading, onSelectAll, onSelectOnly, onSelectAllExcept, onClearAll, searchable, sortSelectedFirst, footer, isInverseChecked, customBadgeValue, hideActions, customSearchProps, }: FilterGroupProps) => react_jsx_runtime.JSX.Element;

declare const CurrencyInput: (props: Omit<NumberInputProps, "parser" | "formatter">) => react_jsx_runtime.JSX.Element;

type PhoneInputProps = Omit<TextInputProps, 'onChange'> & {
    onChange: (value: string) => void;
};
declare const PhoneInput: ({ onChange, ...props }: PhoneInputProps) => react_jsx_runtime.JSX.Element;

type BulkEmailInputProps = InputWrapperBaseProps & {
    defaultValue?: string[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
};
declare const BulkEmailInput: ({ defaultValue, value, onChange, disabled, placeholder, ...props }: BulkEmailInputProps) => react_jsx_runtime.JSX.Element;

type TextDebouncedInputProps = Omit<TextInputProps, 'value' | 'onChange'> & React.RefAttributes<HTMLInputElement> & {
    initialValue: string;
    onDebouncedSearch?: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    includeSearchIcon?: boolean;
    maxLength?: number;
};
declare const TextDebouncedInput: ({ initialValue, onDebouncedSearch, inputRef, includeSearchIcon, maxLength, ...props }: TextDebouncedInputProps) => react_jsx_runtime.JSX.Element;

export { Alert, Bell, Building, BulkEmailInput, ButtonGroupTabs, CardSection, Check, ChevronDown, ChevronUp, CurrencyInput, CustomRadioCard, DropdownButton, type DropdownOption, EditableText, EliseTheme, ExclamationCircleFill, ExclamationTriangleFill, Filter, FilterCheckbox, FilterGroup, FilterSidebar, type FilterValue, FormGroup, type FormGroupProps, HoldButton, InfoCircle, NonIdealState, type NonIdealStateProps, NotificationBadge, Pencil, PhoneInput, Plus, Search, Settings, Tab, type TabProps, Tabs, TailwindAlert, TextDebouncedInput, Trash, X, XCircleFill, appNotification, disabledStyles, labelStyles };
