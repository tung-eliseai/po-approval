// src/theme.ts
var labelStyles = (theme) => ({
  fontSize: theme.fontSizes.xs,
  color: theme.colors.dark[9],
  fontWeight: 400
});
var disabledStyles = (theme) => ({
  color: theme.colors.dark[5],
  backgroundColor: theme.colors.dark[0],
  opacity: 1
});
var inputStyles = (theme) => ({
  fontSize: theme.fontSizes.sm,
  padding: "6px 10px",
  backgroundColor: "#FFFFFF",
  borderWidth: "1px",
  borderColor: theme.colors.dark[1],
  ":disabled": disabledStyles(theme),
  ":hover&:not(:disabled)&:not(:focus)": { borderColor: theme.colors.purple[2] },
  overflow: "hidden",
  textOverflow: "ellipsis",
  outline: "none",
  ":focus": { borderColor: theme.colors.purple[5] }
});
var dropdownStyles = (theme) => ({
  display: "inline-block",
  padding: "0px",
  marginTop: "4px",
  minWidth: "140px",
  width: "fit-content",
  maxWidth: "400px",
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.dark[1]}`,
  boxShadow: "0px 9px 16px -6px rgba(0, 0, 0, 0.3)",
  borderRadius: "2px"
});
var EliseTheme = {
  globalStyles() {
    return { body: { letterSpacing: "0.3px" } };
  },
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 },
  colors: {
    purple: ["#eee7ff", "#cabafc", "#a78df3", "#8460ed", "#6032e6", "#4719cd", "#3712a0", "#260d74", "#170747", "#09011d"],
    yellow: ["#fff7dd", "#fce8b3", "#f8d886", "#f5c856", "#f2b929", "#d99f11", "#a97c0a", "#785904", "#493500", "#1b1200"],
    orange: ["#ffebe1", "#fbccb8", "#f2ab8d", "#ea8b61", "#e36935", "#ca501c", "#9e3d15", "#712b0d", "#451904", "#1d0500"],
    teal: ["#e1f8ff", "#bee4f1", "#9ad1e4", "#75bfd9", "#50accd", "#3993b4", "#29728c", "#1b5265", "#09313f", "#001219"],
    green: ["#e3fcec", "#bfefd1", "#9be3b5", "#74d899", "#4ecc7d", "#36b364", "#278b4d", "#1a6336", "#0b3d1f", "#001605"],
    red: ["#ffe2e2", "#ffb1b2", "#ff7f7f", "#ff4d4d", "#fe1d1b", "#e50501", "#b30000", "#810000", "#4f0000", "#200000"],
    blue: ["#e5ebff", "#b6c2fe", "#8699f8", "#5770f5", "#2a47f1", "#142fd7", "#0c23a8", "#071979", "#020f4a", "#00051d"],
    dark: ["#EFEFEF", "#D9D9D9", "#BFBFBF", "#A6A6A6", "#8C8C8C", "#737373", "#595959", "#404040", "#262626", "#000000"]
  },
  primaryColor: "purple",
  black: "#000000",
  white: "#FFFFFF",
  loader: "dots",
  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
  radius: { xs: 2, sm: 6, md: 10, lg: 16 },
  components: {
    Title: { styles: () => ({ root: { fontWeight: 600 } }) },
    InputBase: { styles: (t) => ({ input: inputStyles(t), label: labelStyles(t) }) },
    Input: { styles: (t) => ({ input: inputStyles(t) }) },
    NumberInput: { styles: (t) => ({ input: inputStyles(t), label: labelStyles(t) }) },
    TextInput: { styles: (t) => ({ label: labelStyles(t) }) },
    Textarea: { styles: (t) => ({ label: labelStyles(t), input: { ...inputStyles(t), overflowY: "scroll" } }) },
    Button: {
      defaultProps: { radius: "sm" },
      styles: () => ({ inner: { fontWeight: "normal" }, root: { padding: "3px 10px" } })
    },
    Select: { styles: (t) => ({ label: labelStyles(t), input: inputStyles(t) }) },
    MultiSelect: {
      styles: (t) => ({
        label: labelStyles(t),
        wrapper: { padding: 0 },
        input: { ...inputStyles(t), paddingTop: 0, paddingBottom: 0, maxHeight: 100, overflowY: "scroll" },
        searchInput: { ":focus": { outline: "none" }, ":focus-within": { outline: "none" } }
      })
    },
    Badge: {
      defaultProps: { radius: "xl" },
      styles: (_t, params) => ({
        root: { ...params.variant !== "outline" && { border: "none" } },
        inner: { textTransform: "none", fontWeight: "normal", padding: 0, fontSize: 10 }
      })
    },
    Modal: { styles: () => ({ header: { fontWeight: 600, fontSize: "14px" } }) },
    Switch: {
      styles: () => ({
        root: { display: "flex", alignItems: "center" },
        label: { margin: 0 },
        track: { cursor: "pointer" },
        body: { cursor: "pointer" }
      })
    },
    Menu: {
      styles: (t) => ({
        label: { fontSize: t.fontSizes.sm, paddingBottom: 0 },
        item: { paddingTop: 6, paddingBottom: 6, paddingLeft: t.spacing.md },
        dropdown: { maxHeight: "400px", overflowY: "auto" }
      })
    },
    Autocomplete: {
      styles: (t) => ({
        input: inputStyles(t),
        label: labelStyles(t),
        dropdown: dropdownStyles(t),
        item: { fontSize: 12, padding: "2px 8px", ":hover": { background: t.colors.gray[1] } }
      })
    },
    Radio: { styles: (t) => ({ label: labelStyles(t) }) },
    RadioGroup: { styles: (t) => ({ label: labelStyles(t) }) },
    SegmentedControl: { styles: () => ({ label: { marginBottom: 0 } }) },
    Anchor: {
      styles: (t) => ({
        root: { color: t.colors.purple[6], "&:hover": { color: t.colors.purple[6] } }
      })
    }
  }
};

// src/icons.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var icon = (path) => ({ width = 16, height = 16, className, style, ...rest }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width,
    height,
    viewBox: "0 0 16 16",
    fill: "currentColor",
    className,
    style,
    ...rest,
    children: /* @__PURE__ */ jsx("path", { d: path })
  }
);
var icon2 = (p1, p2) => ({ width = 16, height = 16, className, style, ...rest }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width,
    height,
    viewBox: "0 0 16 16",
    fill: "currentColor",
    className,
    style,
    ...rest,
    children: [
      /* @__PURE__ */ jsx("path", { d: p1 }),
      /* @__PURE__ */ jsx("path", { d: p2 })
    ]
  }
);
var Check = icon("M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z");
var X = icon("M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z");
var Search = icon("M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z");
var ChevronDown = icon("M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
var ChevronUp = icon("M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z");
var Plus = icon("M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z");
var Filter = icon("M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z");
var Bell = icon("M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z");
var Building = icon2(
  "M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z",
  "M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1z"
);
var Trash = icon2(
  "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z",
  "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
);
var Pencil = icon2(
  "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5z",
  "M4.053 9.052-.106.106-1.528 3.821l3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
);
var Settings = icon2(
  "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z",
  "M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.892 3.433-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.892-1.64-.901-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"
);
var ExclamationCircleFill = icon("M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z");
var InfoCircle = icon2(
  "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z",
  "M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
);
var ExclamationTriangleFill = icon("M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z");
var XCircleFill = icon("M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z");

// src/notification.tsx
import { ActionIcon } from "@mantine/core";
import { showNotification, cleanNotificationsQueue } from "@mantine/notifications";
import { jsx as jsx2 } from "react/jsx-runtime";
var AUTO_CLOSE = 1e4;
var GATEWAY_TIMEOUT = /504 Gateway Timeout/i;
var isGatewayTimeout = (v) => {
  if (typeof v === "string") return GATEWAY_TIMEOUT.test(v);
  if (v && typeof v === "object") {
    const o = v;
    if (typeof o.message === "string" && GATEWAY_TIMEOUT.test(o.message)) return true;
    if (typeof o.detail === "string" && GATEWAY_TIMEOUT.test(o.detail)) return true;
  }
  return false;
};
var active = {};
var appNotification = {
  clear: () => {
    cleanNotificationsQueue();
    active = {};
  },
  info: ({
    title,
    message,
    autoClose = true,
    autoCloseMs,
    icon: icon3 = null,
    showMultiple = true
  }) => {
    const id = `info-${title}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id,
      title,
      message,
      autoClose: autoCloseMs != null ? autoCloseMs : autoClose ? AUTO_CLOSE : false,
      icon: icon3,
      radius: "lg",
      onClose: () => {
        delete active[id];
      }
    });
  },
  success: ({
    title = "Success",
    message,
    autoClose = true,
    compact = false,
    icon: icon3,
    showMultiple = true
  }) => {
    const id = `success-${typeof title === "string" ? title : "notification"}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id,
      title,
      message,
      autoClose: autoClose ? compact ? 2e3 : AUTO_CLOSE : false,
      radius: compact ? "xs" : "lg",
      icon: icon3 != null ? icon3 : /* @__PURE__ */ jsx2(ActionIcon, { bg: "green", radius: "xl", children: /* @__PURE__ */ jsx2(Check, { width: compact ? 16 : 28, height: compact ? 16 : 28, color: "white" }) }),
      styles: () => ({
        root: {
          "&::before": { backgroundColor: "#00AC11" },
          ...compact && { padding: "6px", fontSize: "0.4em" }
        }
      }),
      onClose: () => {
        delete active[id];
      }
    });
  },
  error: ({
    error,
    title = "Error",
    autoClose = true,
    showMultiple = true
  }) => {
    const timeout = isGatewayTimeout(title) || isGatewayTimeout(error);
    const displayTitle = timeout ? "An error occurred" : title;
    const id = `error-${displayTitle}`;
    if (!showMultiple && active[id]) return;
    active[id] = true;
    showNotification({
      id,
      title: displayTitle,
      message: timeout ? null : extractMsg(error),
      autoClose: autoClose ? AUTO_CLOSE : false,
      radius: "lg",
      styles: () => ({ root: { "&::before": { backgroundColor: "#B90000" } } }),
      onClose: () => {
        delete active[id];
      }
    });
  }
};
var extractMsg = (e) => {
  var _a, _b;
  if (!e) return "An unknown error occurred.";
  const err = e;
  const data = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data;
  if (!data) return String((_b = err == null ? void 0 : err.message) != null ? _b : "An unknown error occurred.");
  if (typeof data === "object" && data !== null) {
    const d = data;
    if (typeof d.message === "string") return d.message;
    if (typeof d.detail === "string") return d.detail;
  }
  return JSON.stringify(data, null, 2);
};

// src/components/CardSection.tsx
import { Title } from "@mantine/core";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var CardSection = ({
  icon: icon3,
  title,
  subtitle,
  action,
  children,
  className = ""
}) => /* @__PURE__ */ jsxs2(
  "div",
  {
    className: `flex flex-col gap-4 p-[20px] border border-gray-200 bg-white rounded-lg w-full ${className}`,
    children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-start gap-4", children: [
        icon3 && /* @__PURE__ */ jsx3("div", { className: "w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center", children: icon3 }),
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx3(Title, { order: 5, className: "text-gray-900", children: title }),
          subtitle && /* @__PURE__ */ jsx3("span", { className: "text-sm text-gray-500", children: subtitle })
        ] }),
        action && /* @__PURE__ */ jsx3("div", { className: "ml-auto", children: action })
      ] }),
      children
    ]
  }
);

// src/components/ButtonGroupTabs.tsx
import { Tabs } from "@mantine/core";
import { jsx as jsx4 } from "react/jsx-runtime";
var ButtonGroupTabs = (props) => /* @__PURE__ */ jsx4(
  Tabs,
  {
    unstyled: true,
    styles: (theme, p) => ({
      tab: {
        ...theme.fn.focusStyles(),
        backgroundColor: theme.white,
        color: theme.colors.gray[9],
        border: `1px solid ${theme.colors.gray[4]}`,
        cursor: "pointer",
        fontSize: theme.fontSizes.md,
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
        "&:not(:first-of-type)": { borderLeft: 0 },
        "&:first-of-type": {
          borderTopLeftRadius: theme.radius.md,
          borderBottomLeftRadius: theme.radius.md
        },
        "&:last-of-type": {
          borderTopRightRadius: theme.radius.md,
          borderBottomRightRadius: theme.radius.md
        },
        "&[data-active]": {
          backgroundColor: p.color ? theme.colors[p.color][5] : theme.colors.purple[5],
          borderColor: p.color ? theme.colors[p.color][5] : theme.colors.purple[5],
          color: theme.white
        }
      },
      tabIcon: { marginRight: theme.spacing.xs, display: "flex", alignItems: "center" },
      tabsList: { display: "flex" }
    }),
    ...props
  }
);
var ButtonGroupTabs_default = ButtonGroupTabs;

// src/components/TailwindAlert.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var DEFAULT_ICONS = {
  neutral: ExclamationCircleFill,
  info: InfoCircle,
  warning: ExclamationTriangleFill,
  error: XCircleFill
};
var ALERT_STYLES = {
  neutral: { bg: "bg-gray-50", icon: "text-gray-500", text: "text-gray-700" },
  info: { bg: "bg-blue-50", icon: "text-blue-500", text: "text-blue-700" },
  warning: { bg: "bg-orange-50", icon: "text-orange-500", text: "text-orange-700" },
  error: { bg: "bg-red-50", icon: "text-red-500", text: "text-red-700" }
};
var TailwindAlert = ({
  children,
  type = "neutral",
  multiLine = false,
  icon: icon3,
  actions
}) => {
  const IconComponent = icon3 || DEFAULT_ICONS[type];
  const s = ALERT_STYLES[type];
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `flex flex-row px-3 rounded-md ${s.bg} ${multiLine ? "h-auto items-start py-3" : "h-9 items-center py-2"}`,
      role: "alert",
      children: [
        /* @__PURE__ */ jsx5(
          IconComponent,
          {
            className: `flex-shrink-0 mr-3 w-4 h-4 ${s.icon} ${multiLine ? "mt-1" : ""}`
          }
        ),
        /* @__PURE__ */ jsx5("span", { className: "sr-only", children: type }),
        /* @__PURE__ */ jsx5(
          "div",
          {
            className: `flex-1 ${s.text} ${multiLine ? "leading-5 flex flex-col gap-y-2 text-sm" : "whitespace-nowrap overflow-hidden text-ellipsis text-sm"}`,
            children
          }
        ),
        actions && /* @__PURE__ */ jsx5(
          "div",
          {
            className: `flex-shrink-0 ${multiLine ? "flex flex-col gap-2 mt-1" : "flex flex-row gap-2 ml-2"}`,
            children: actions
          }
        )
      ]
    }
  );
};
var Alert = TailwindAlert;

// src/components/DropdownButton.tsx
import { Button, Divider, Group, Menu } from "@mantine/core";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var DropdownButton = ({
  label,
  options,
  variant = "outline",
  size = "sm",
  leftIcon,
  loading = false,
  disabled = false,
  className
}) => /* @__PURE__ */ jsxs4(Menu, { shadow: "md", width: 200, children: [
  /* @__PURE__ */ jsx6(Menu.Target, { children: /* @__PURE__ */ jsx6(
    Button,
    {
      variant,
      size,
      leftIcon,
      loading,
      disabled,
      className,
      children: /* @__PURE__ */ jsxs4(Group, { spacing: "xs", children: [
        label,
        /* @__PURE__ */ jsx6(Divider, { orientation: "vertical" }),
        /* @__PURE__ */ jsx6(ChevronDown, {})
      ] })
    }
  ) }),
  /* @__PURE__ */ jsx6(Menu.Dropdown, { children: options.map((opt) => /* @__PURE__ */ jsx6(Menu.Item, { icon: opt.icon, onClick: opt.onClick, disabled, children: opt.label }, opt.key)) })
] });

// src/components/CustomRadioCard.tsx
import { Box, Radio, UnstyledButton, createStyles } from "@mantine/core";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
    backgroundColor: theme.white,
    transition: "background-color 150ms ease",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.colors.gray[0] }
  },
  radio: { marginTop: 2 },
  content: { flex: 1, marginLeft: theme.spacing.md },
  title: { fontSize: theme.fontSizes.lg, fontWeight: 500, lineHeight: 1, marginBottom: theme.spacing.xs },
  description: { fontSize: theme.fontSizes.sm, color: theme.colors.gray[6] }
}));
var CustomRadioCard = ({
  value,
  title,
  description,
  className,
  checked,
  onChange
}) => {
  const { classes, cx } = useStyles();
  return /* @__PURE__ */ jsxs5(UnstyledButton, { className: cx(classes.card, className), onClick: () => onChange == null ? void 0 : onChange(value), children: [
    /* @__PURE__ */ jsx7(Radio, { checked, readOnly: true, tabIndex: -1, className: classes.radio }),
    /* @__PURE__ */ jsxs5(Box, { className: classes.content, children: [
      /* @__PURE__ */ jsx7(Box, { className: classes.title, children: title }),
      description && /* @__PURE__ */ jsx7(Box, { className: classes.description, children: description })
    ] })
  ] });
};

// src/components/EditableText.tsx
import { Tooltip } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var EditableText = ({ value, onSave, className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  useEffect(() => {
    setEditValue(value);
  }, [value]);
  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `relative flex-1 ${isEditing ? "ring-2 ring-blue-500 ring-offset-4 rounded" : "group"}`,
      children: [
        /* @__PURE__ */ jsx8("span", { className: `${className} ${isEditing ? "invisible" : ""}`, children: isEditing ? editValue || "\xA0" : value }),
        isEditing ? /* @__PURE__ */ jsxs6(Fragment, { children: [
          /* @__PURE__ */ jsx8(
            "input",
            {
              ref: inputRef,
              type: "text",
              value: editValue,
              onChange: (e) => setEditValue(e.target.value),
              onKeyDown: handleKeyDown,
              onBlur: handleCancel,
              className: `absolute left-0 top-0 w-full h-full border-none bg-transparent p-0 focus:outline-none focus:ring-0 ${className}`
            }
          ),
          /* @__PURE__ */ jsx8(
            "button",
            {
              onMouseDown: (e) => {
                e.preventDefault();
                handleSave();
              },
              className: "absolute right-0 top-1/2 -translate-y-1/2 p-1 mr-2 rounded bg-transparent",
              children: /* @__PURE__ */ jsx8(Check, { className: "w-4 h-4 text-gray-500 hover:text-black" })
            }
          )
        ] }) : /* @__PURE__ */ jsx8(Tooltip, { label: "Edit title", withArrow: true, children: /* @__PURE__ */ jsx8(
          "button",
          {
            onClick: () => setIsEditing(true),
            className: "ml-2 p-1.5 rounded-md bg-transparent hover:bg-gray-100 align-middle relative -top-1",
            children: /* @__PURE__ */ jsx8(Pencil, { className: "w-3.5 h-3.5 text-gray-500 hover:text-gray-700" })
          }
        ) })
      ]
    }
  );
};

// src/components/FormGroup.tsx
import clsx from "clsx";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var FormGroup = ({
  children,
  className,
  contentClassName,
  isDisabled,
  isInline,
  label,
  labelInfo,
  helperText,
  removeBottomMargin
}) => /* @__PURE__ */ jsxs7(
  "div",
  {
    className: clsx(
      "flex flex-col",
      isInline && "flex-row items-start",
      isDisabled && "text-gray-400",
      !removeBottomMargin && "mb-4",
      className
    ),
    children: [
      label && /* @__PURE__ */ jsx9(
        "label",
        {
          className: clsx("mb-1 font-normal text-sm", isDisabled && "text-gray-400"),
          children: label
        }
      ),
      labelInfo && /* @__PURE__ */ jsx9("div", { className: "text-[10px] mb-2.5 text-gray-500 font-normal", children: labelInfo }),
      /* @__PURE__ */ jsxs7("div", { className: clsx(contentClassName), children: [
        children,
        helperText && /* @__PURE__ */ jsx9("div", { className: "text-[10px] mt-1 text-gray-500 font-normal", children: helperText })
      ] })
    ]
  }
);

// src/components/NotificationBadge.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var NotificationBadge = ({
  notificationNumber,
  className
}) => {
  const digits = notificationNumber.toString().length;
  const fontSize = digits >= 4 ? 7 : digits === 3 ? 9 : 12;
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className,
      style: {
        fontFamily: "SF Pro, -apple-system, sans-serif",
        fontWeight: 700,
        fontSize,
        color: "#ffffff",
        lineHeight: "18px",
        backgroundColor: "#B90000",
        height: 20,
        aspectRatio: "1",
        borderRadius: "50%",
        display: "inline-flex",
        marginLeft: 6,
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none"
      },
      children: notificationNumber
    }
  );
};

// src/components/NonIdealState.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var NonIdealState = ({
  action,
  description,
  attentionGrabber,
  title,
  className,
  children
}) => /* @__PURE__ */ jsxs8(
  "div",
  {
    className,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      textAlign: "center",
      width: "100%"
    },
    children: [
      attentionGrabber && /* @__PURE__ */ jsx11("div", { style: { color: "#8C8C8C", fontSize: 60, maxWidth: 400, marginBottom: 20 }, children: attentionGrabber }),
      title && /* @__PURE__ */ jsx11("h4", { style: { fontSize: 18, lineHeight: "21px", maxWidth: 400, marginBottom: 20 }, children: title }),
      description && /* @__PURE__ */ jsx11("div", { style: { maxWidth: 400, marginBottom: 20 }, children: description }),
      action && /* @__PURE__ */ jsx11("div", { style: { maxWidth: 400, marginBottom: 20 }, children: action }),
      children
    ]
  }
);

// src/components/HoldButton.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var HoldButton = ({
  holdTime,
  text,
  color,
  onConfirm,
  disabled,
  unclickedTextColor = "white",
  inProgressTextColor = "black",
  startTimerOn,
  submitAfterTime
}) => {
  const [isHolding, setIsHolding] = useState2(startTimerOn === "mount");
  const [progress, setProgress] = useState2(0);
  const [isComplete, setIsComplete] = useState2(false);
  useEffect2(() => {
    if (progress >= holdTime) {
      setIsHolding(false);
      setProgress(0);
      if (startTimerOn === "click") {
        onConfirm();
      } else {
        setIsComplete(true);
        if (submitAfterTime) onConfirm();
      }
      return;
    }
    let timeout;
    if (progress < holdTime && isHolding) {
      timeout = setTimeout(() => setProgress(progress + 10), 10);
    } else {
      setProgress(0);
    }
    return () => clearTimeout(timeout);
  }, [progress, isHolding, holdTime, onConfirm, startTimerOn, submitAfterTime]);
  const clickProps = startTimerOn === "click" ? {
    onMouseDownCapture: () => {
      if (!disabled) setIsHolding(true);
    },
    onMouseUpCapture: () => setIsHolding(false),
    onMouseLeave: () => setIsHolding(false)
  } : {
    onClick: () => {
      if (isComplete) onConfirm();
    }
  };
  const pct = progress ? progress / holdTime * 100 : 0;
  return /* @__PURE__ */ jsx12(
    "div",
    {
      style: {
        display: "inline-flex",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none"
      },
      children: /* @__PURE__ */ jsxs9(
        "div",
        {
          style: {
            position: "relative",
            border: `1px solid ${color}`,
            borderRadius: 6,
            overflow: "hidden",
            minWidth: 120,
            height: 36,
            display: "flex",
            alignItems: "center",
            background: progress ? void 0 : color
          },
          ...clickProps,
          children: [
            pct > 0 && /* @__PURE__ */ jsx12(
              "div",
              {
                style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${pct}%`,
                  background: color,
                  transition: "width 10ms linear"
                }
              }
            ),
            /* @__PURE__ */ jsx12(
              "div",
              {
                style: {
                  position: "relative",
                  zIndex: 1,
                  padding: "0 16px",
                  color: progress ? inProgressTextColor : unclickedTextColor,
                  fontWeight: 500,
                  fontSize: 14,
                  whiteSpace: "nowrap"
                },
                children: text
              }
            )
          ]
        }
      )
    }
  );
};
var HoldButton_default = HoldButton;

// src/components/Tabs.tsx
import clsx2 from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect as useEffect3,
  useState as useState3
} from "react";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
import { createElement } from "react";
var Tab = ({ className, component }) => /* @__PURE__ */ jsx13("div", { children: /* @__PURE__ */ jsx13("div", { style: { marginTop: 20, display: "flex" }, className, children: component }) });
Tab.displayName = "MeetElise.Tab";
var generateTabComponentId = (parentId, tabId) => `tab-component_${parentId}_${tabId}`;
var generateTabTitleId = (parentId, tabId) => `tab-title_${parentId}_${tabId}`;
var TabTitle = forwardRef(
  ({ className, children, disabled, id, parentId, isSelected, title, onClick, numNotifications }, ref) => /* @__PURE__ */ jsxs10(
    "div",
    {
      "aria-controls": generateTabComponentId(parentId, id),
      "aria-disabled": disabled,
      "aria-expanded": isSelected,
      "aria-selected": isSelected,
      "data-tab-id": id,
      id: generateTabTitleId(parentId, id),
      onClick: (e) => {
        if (!disabled) onClick(id, e);
      },
      role: "tab",
      tabIndex: disabled ? void 0 : 0,
      ref,
      className: clsx2("tab-title", className),
      style: {
        display: "flex",
        alignItems: "center",
        fontFamily: "SF Pro, -apple-system, sans-serif",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        position: "relative",
        flex: "0 0 auto",
        verticalAlign: "top",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        userSelect: "none",
        color: disabled ? "#BFBFBF" : isSelected ? "#202020" : void 0
      },
      children: [
        title,
        !!numNotifications && /* @__PURE__ */ jsx13(NotificationBadge, { notificationNumber: numNotifications }),
        children
      ]
    }
  )
);
function isTabElement(child) {
  return child != null && child.type != null && child.type.displayName != null && child.type.displayName === Tab.displayName;
}
function getTabChildren(props) {
  return React.Children.toArray(props.children).filter(isTabElement);
}
function getInitialSelectedTabId(props) {
  if (props.selectedTabId !== void 0) return props.selectedTabId;
  if (props.defaultSelectedTabId !== void 0) return props.defaultSelectedTabId;
  const tabs = getTabChildren(props);
  return tabs.length === 0 ? void 0 : tabs[0].props.id;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var Tabs2 = (props) => {
  const [selectedTabId, setSelectedTabId] = useState3(getInitialSelectedTabId(props));
  const [animate, setAnimate] = useState3(false);
  const [indicatorStyle, setIndicatorStyle] = useState3({ display: "none" });
  const selectedTabRefCallback = useCallback(
    async (node) => {
      if (!node) return;
      while (node.clientWidth === 0) await sleep(10);
      const { clientHeight, clientWidth, offsetLeft, offsetHeight } = node;
      const style = {
        top: clientHeight,
        transform: `translateX(${Math.floor(offsetLeft)}px) translateY(${Math.floor(offsetHeight - 16)}px)`,
        width: clientWidth
      };
      if (!animate) {
        style.transition = "none";
        style.transitionTimingFunction = "unset";
        style.transitionDuration = "unset";
      }
      setIndicatorStyle(style);
      setAnimate(true);
    },
    [animate]
  );
  useEffect3(() => {
    if (props.selectedTabId) setSelectedTabId(props.selectedTabId);
  }, [props.selectedTabId]);
  const handleTabClick = (newTabId, event) => {
    var _a;
    (_a = props.onChange) == null ? void 0 : _a.call(props, newTabId, selectedTabId, event);
    if (props.selectedTabId === void 0) setSelectedTabId(newTabId);
  };
  const tabTitles = React.Children.map(props.children, (child) => {
    if (!isTabElement(child)) return child;
    const { id } = child.props;
    return /* @__PURE__ */ createElement(
      TabTitle,
      {
        ...child.props,
        key: id,
        parentId: props.id,
        onClick: handleTabClick,
        isSelected: id === selectedTabId,
        ref: id === selectedTabId ? selectedTabRefCallback : null
      }
    );
  });
  const tabComponents = getTabChildren(props).filter((tab) => tab.props.id === selectedTabId).map((tab) => {
    if (!tab.props.component) return void 0;
    const { className, component, id } = tab.props;
    return /* @__PURE__ */ jsx13(
      "div",
      {
        "aria-labelledby": generateTabTitleId(props.id, id),
        "aria-hidden": id !== selectedTabId,
        className: clsx2(className),
        id: generateTabComponentId(props.id, id),
        role: "tabpanel",
        style: { marginTop: 20, display: id !== selectedTabId ? "none" : void 0 },
        children: component
      },
      id
    );
  });
  return /* @__PURE__ */ jsxs10("div", { className: props.className, children: [
    /* @__PURE__ */ jsxs10("div", { style: props.isSticky ? { position: "sticky", top: 0, background: "#fff" } : void 0, children: [
      /* @__PURE__ */ jsxs10(
        "div",
        {
          role: "tablist",
          style: {
            alignItems: "flex-end",
            border: "none",
            display: "flex",
            flex: "0 0 auto",
            listStyle: "none",
            margin: 0,
            paddingRight: 20,
            position: "relative",
            gap: 40
          },
          children: [
            tabTitles,
            /* @__PURE__ */ jsx13(
              "div",
              {
                style: {
                  left: 0,
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  transition: "height, transform, width, color",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 1, 0.75, 0.9)",
                  ...indicatorStyle
                },
                children: /* @__PURE__ */ jsx13(
                  "div",
                  {
                    style: {
                      background: "#202020",
                      height: 4,
                      width: "100%",
                      position: "absolute",
                      transition: "height, transform, width, color",
                      transitionDuration: "200ms",
                      transitionTimingFunction: "cubic-bezier(0.4, 1, 0.75, 0.9)",
                      top: 0
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx13("div", { style: { position: "absolute", right: 0, color: "#595959", fontSize: 6 }, children: props.rightElement })
          ]
        }
      ),
      /* @__PURE__ */ jsx13("div", { style: { width: "100%", height: 1, backgroundColor: "#D9D9D9", marginTop: 12 } })
    ] }),
    tabComponents
  ] });
};

// src/components/FilterSidebar.tsx
import { CloseButton, Group as Group2, Paper, ScrollArea, Text } from "@mantine/core";
import { Fragment as Fragment2, jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var FilterSidebar = ({ isOpen, onClose, children, title, maxHeight }) => {
  if (!isOpen) return /* @__PURE__ */ jsx14(Fragment2, {});
  return /* @__PURE__ */ jsxs11(Paper, { sx: (theme) => ({ width: "256px", minWidth: "250px", padding: theme.spacing.sm }), children: [
    /* @__PURE__ */ jsxs11(Group2, { position: "apart", children: [
      /* @__PURE__ */ jsx14(Text, { size: "md", fw: 600, children: title != null ? title : "Filter" }),
      /* @__PURE__ */ jsx14(CloseButton, { onClick: onClose })
    ] }),
    /* @__PURE__ */ jsx14(ScrollArea.Autosize, { maxHeight, offsetScrollbars: true, ...{}, children })
  ] });
};
var FilterSidebar_default = FilterSidebar;

// src/components/FilterGroup.tsx
import {
  Badge,
  Box as Box2,
  Button as Button2,
  Center,
  ChevronIcon,
  Collapse,
  Divider as Divider2,
  Group as Group4,
  Loader,
  ScrollArea as ScrollArea2,
  Text as Text3,
  TextInput
} from "@mantine/core";
import sortBy from "lodash/sortBy";
import { useMemo, useState as useState5 } from "react";
import { FixedSizeList } from "react-window";

// src/components/FilterCheckbox.tsx
import { Anchor, Checkbox, Group as Group3, Text as Text2 } from "@mantine/core";
import { useState as useState4 } from "react";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var FilterCheckbox = ({
  value,
  onChange,
  onSelectAll,
  onSelectOnly,
  onSelectAllExcept,
  numTotalValues,
  numCheckedValues,
  isInverseChecked = false,
  hideActions = false
}) => {
  const [isHovered, setIsHovered] = useState4(false);
  return /* @__PURE__ */ jsx15("div", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: /* @__PURE__ */ jsx15(
    Checkbox,
    {
      size: "xs",
      styles: () => ({
        body: { width: "100%" },
        labelWrapper: { flexGrow: 1, marginRight: "1rem", maxWidth: "195px" }
      }),
      label: /* @__PURE__ */ jsxs12(Group3, { position: "apart", noWrap: true, children: [
        /* @__PURE__ */ jsx15(Text2, { style: { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }, children: value.label }),
        !hideActions && numTotalValues > 1 && !isInverseChecked && /* @__PURE__ */ jsx15(
          Anchor,
          {
            style: { display: isHovered ? "block" : "none" },
            onClick: (e) => {
              e.preventDefault();
              numCheckedValues === 1 ? onSelectAll == null ? void 0 : onSelectAll() : onSelectOnly == null ? void 0 : onSelectOnly(value);
            },
            children: numCheckedValues === 1 ? "All" : "Only"
          }
        )
      ] }),
      checked: value.checked,
      onChange: () => {
        if (isInverseChecked && numCheckedValues === 0) {
          onChange(value, !value.checked);
        } else if (numCheckedValues === 0 && !isInverseChecked && !hideActions) {
          onSelectAllExcept == null ? void 0 : onSelectAllExcept(value);
        } else if (numCheckedValues === 1 && value.checked && !hideActions) {
          onSelectAll == null ? void 0 : onSelectAll();
        } else {
          onChange(value, !value.checked);
        }
      }
    }
  ) });
};
var FilterCheckbox_default = FilterCheckbox;

// src/components/FilterGroup.tsx
import { Fragment as Fragment3, jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var FilterGroup = ({
  values,
  onChange,
  title,
  isLoading,
  onSelectAll,
  onSelectOnly,
  onSelectAllExcept,
  onClearAll,
  searchable,
  sortSelectedFirst,
  footer,
  isInverseChecked = false,
  customBadgeValue,
  hideActions = false,
  customSearchProps
}) => {
  const [isOpen, setIsOpen] = useState5(true);
  const [searchStr, setSearchStr] = useState5("");
  const checkedCount = values.filter((v) => v.checked).length;
  const ITEM_HEIGHT = 27;
  const hasCustomSearch = !!customSearchProps;
  const searchedValues = useMemo(() => {
    const sorted = sortBy(values, (v) => v.label.trim()).filter(
      (v) => hasCustomSearch ? true : v.label.toLowerCase().includes(searchStr.toLowerCase())
    );
    return sortSelectedFirst ? sortBy(sorted, (v) => v.checked ? -1 : 0) : sorted;
  }, [hasCustomSearch, searchStr, sortSelectedFirst, values]);
  const sectionHeight = useMemo(
    () => Math.min(300, searchedValues.length * ITEM_HEIGHT),
    [searchedValues.length]
  );
  const badgeValue = customBadgeValue !== void 0 ? customBadgeValue : checkedCount === 0 ? values.length : checkedCount;
  return /* @__PURE__ */ jsxs13(Fragment3, { children: [
    /* @__PURE__ */ jsxs13(Group4, { position: "apart", style: { cursor: "pointer", margin: ".5rem 0" }, noWrap: true, align: "center", children: [
      /* @__PURE__ */ jsxs13(
        Group4,
        {
          onClick: () => setIsOpen(!isOpen),
          spacing: "xs",
          noWrap: true,
          align: "center",
          sx: { flexGrow: 1 },
          children: [
            /* @__PURE__ */ jsxs13(Text3, { fw: 600, children: [
              title,
              " "
            ] }),
            /* @__PURE__ */ jsx16(Badge, { size: "sm", children: badgeValue })
          ]
        }
      ),
      /* @__PURE__ */ jsxs13(Group4, { spacing: "xs", noWrap: true, align: "center", children: [
        checkedCount > 0 && onClearAll && /* @__PURE__ */ jsx16(
          Button2,
          {
            variant: "subtle",
            size: "xs",
            compact: true,
            color: "gray",
            onClick: (e) => {
              e.stopPropagation();
              onClearAll();
            },
            sx: { height: 20, minHeight: 20, fontSize: 11 },
            children: "Clear"
          }
        ),
        /* @__PURE__ */ jsx16(
          Box2,
          {
            onClick: () => setIsOpen(!isOpen),
            sx: isOpen ? { transform: "rotate(180deg)", transition: "1sec" } : {},
            children: /* @__PURE__ */ jsx16(ChevronIcon, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs13(Collapse, { in: isOpen, children: [
      searchable && customSearchProps && /* @__PURE__ */ jsx16(
        TextInput,
        {
          size: "xs",
          placeholder: customSearchProps.placeholder || "Search...",
          style: { marginBottom: ".5rem" },
          value: customSearchProps.value,
          onChange: (e) => customSearchProps.onChange(e.currentTarget.value)
        }
      ),
      searchable && !customSearchProps && /* @__PURE__ */ jsx16(
        TextInput,
        {
          size: "xs",
          placeholder: "Search...",
          style: { marginBottom: ".5rem" },
          value: searchStr,
          onChange: (e) => setSearchStr(e.currentTarget.value)
        }
      ),
      isLoading ? /* @__PURE__ */ jsx16(Center, { my: "lg", children: /* @__PURE__ */ jsx16(Loader, {}) }) : /* @__PURE__ */ jsxs13(Fragment3, { children: [
        /* @__PURE__ */ jsx16(ScrollArea2, { styles: () => ({ root: { height: `${sectionHeight}px` } }), children: /* @__PURE__ */ jsx16(
          FixedSizeList,
          {
            height: sectionHeight,
            width: 226,
            itemData: searchedValues,
            itemCount: searchedValues.length,
            itemSize: ITEM_HEIGHT,
            children: ({ style, index }) => {
              const value = searchedValues[index];
              return /* @__PURE__ */ jsx16("div", { style, children: /* @__PURE__ */ jsx16(
                FilterCheckbox_default,
                {
                  numCheckedValues: checkedCount,
                  value,
                  numTotalValues: values.length,
                  onChange,
                  onSelectAll,
                  onSelectAllExcept,
                  onSelectOnly,
                  isInverseChecked,
                  hideActions
                }
              ) }, value.key);
            }
          }
        ) }),
        footer && /* @__PURE__ */ jsx16(Box2, { mb: "sm", children: footer })
      ] })
    ] }),
    /* @__PURE__ */ jsx16(Divider2, {})
  ] });
};
var FilterGroup_default = FilterGroup;

// src/inputs/CurrencyInput.tsx
import { NumberInput } from "@mantine/core";
import { jsx as jsx17 } from "react/jsx-runtime";
var CurrencyInput = (props) => /* @__PURE__ */ jsx17(
  NumberInput,
  {
    ...props,
    parser: (value) => (value == null ? void 0 : value.replace(/\$\s?|(,*)/g, "")) || "",
    formatter: (value) => value && !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
  }
);
var CurrencyInput_default = CurrencyInput;

// src/inputs/PhoneInput.tsx
import { TextInput as TextInput2 } from "@mantine/core";
import { useEffect as useEffect4, useState as useState6 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var formatUS = (digits) => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};
var formatDisplay = (raw) => {
  if (!raw) return "";
  if (raw.startsWith("+") && !raw.startsWith("+1")) return raw;
  const digits = raw.replace(/^\+1/, "").replace(/\D/g, "");
  if (digits.length <= 5) return digits;
  return formatUS(digits);
};
var PhoneInput = ({ onChange, ...props }) => {
  const [display, setDisplay] = useState6(
    () => typeof props.value === "string" ? formatDisplay(props.value) : ""
  );
  useEffect4(() => {
    if (typeof props.value === "string") {
      setDisplay(formatDisplay(props.value));
    }
  }, [props.value]);
  return /* @__PURE__ */ jsx18(
    TextInput2,
    {
      ...props,
      value: display,
      onChange: (e) => {
        const raw = e.currentTarget.value.replace(/[^\d+]/g, "");
        setDisplay(formatDisplay(raw));
        onChange(raw.length >= 2 && !raw.startsWith("+") ? "+1" + raw : raw);
      }
    }
  );
};
var PhoneInput_default = PhoneInput;

// src/inputs/BulkEmailInput.tsx
import {
  Badge as Badge2,
  Box as Box3,
  CloseButton as CloseButton2,
  Group as Group5,
  Input,
  Text as Text4,
  Textarea
} from "@mantine/core";
import uniq from "lodash/uniq";
import { useState as useState7 } from "react";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
var isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
var BulkEmailInput = ({
  defaultValue,
  value,
  onChange,
  disabled,
  placeholder,
  ...props
}) => {
  var _a;
  const [emails, setEmails] = useState7((_a = value != null ? value : defaultValue) != null ? _a : []);
  const [textValue, setTextValue] = useState7("");
  const addEmail = () => {
    const email = textValue.trim();
    if (!email || emails.includes(email)) {
      setTextValue("");
      return;
    }
    const next = [...emails, email];
    setEmails(next);
    onChange == null ? void 0 : onChange(next);
    setTextValue("");
  };
  const removeEmail = (email) => {
    const next = emails.filter((e) => e !== email);
    setEmails(next);
    onChange == null ? void 0 : onChange(next);
  };
  const removeLastEmail = () => {
    const next = emails.slice(0, -1);
    setEmails(next);
    onChange == null ? void 0 : onChange(next);
  };
  return /* @__PURE__ */ jsxs14(
    Input.Wrapper,
    {
      ...props,
      labelProps: {
        ...props.labelProps,
        styles: (theme) => ({ label: labelStyles(theme) })
      },
      children: [
        /* @__PURE__ */ jsx19(Input.Description, { children: "You can enter multiple emails at once by separating them with a comma, space, or newline." }),
        /* @__PURE__ */ jsxs14(
          Box3,
          {
            sx: (theme) => ({
              fontSize: theme.fontSizes.sm,
              padding: "6px 10px",
              backgroundColor: theme.white,
              borderWidth: "1px",
              borderColor: props.error ? "#b30100" : theme.colors.dark[1],
              ":hover": { borderColor: !disabled ? theme.colors.purple[2] : void 0 },
              outline: "none",
              ":focus-within": { borderColor: theme.colors.purple[5] },
              borderStyle: "solid",
              borderRadius: theme.radius.sm,
              ...disabled ? disabledStyles(theme) : {}
            }),
            children: [
              !!emails.length && /* @__PURE__ */ jsx19(Group5, { spacing: "xs", mb: "xs", children: emails.map((email) => {
                const valid = isValidEmail(email);
                const color = valid ? "purple" : "red";
                return /* @__PURE__ */ jsx19(
                  Badge2,
                  {
                    variant: disabled ? "filled" : "light",
                    color: disabled ? "dark.4" : color,
                    rightSection: /* @__PURE__ */ jsx19(
                      CloseButton2,
                      {
                        color,
                        variant: "transparent",
                        size: "xs",
                        disabled,
                        onClick: () => removeEmail(email)
                      }
                    ),
                    children: /* @__PURE__ */ jsx19(Text4, { transform: "none", children: email })
                  },
                  email
                );
              }) }),
              /* @__PURE__ */ jsx19(
                Textarea,
                {
                  placeholder,
                  disabled,
                  styles: () => ({ input: { border: "none" } }),
                  value: textValue,
                  onKeyDown: (e) => {
                    if (e.key === "," || e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      addEmail();
                    }
                    if (e.key === "Backspace" && !textValue.length) removeLastEmail();
                  },
                  onBlur: addEmail,
                  onChange: (e) => setTextValue(e.currentTarget.value),
                  onPasteCapture: (e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("Text").split(/[\s,]+/);
                    const valid = pasted.filter(isValidEmail);
                    const next = uniq([...emails, ...valid]);
                    setEmails(next);
                    onChange == null ? void 0 : onChange(next);
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
};
var BulkEmailInput_default = BulkEmailInput;

// src/inputs/TextDebouncedInput.tsx
import { ActionIcon as ActionIcon2, TextInput as TextInput3 } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect as useEffect5, useRef as useRef2, useState as useState8 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var MAX_CONSECUTIVE = 5;
var CONSECUTIVE_RE = new RegExp(`(.)\\1{${MAX_CONSECUTIVE},}`, "g");
var TextDebouncedInput = ({
  initialValue,
  onDebouncedSearch,
  inputRef,
  includeSearchIcon = false,
  maxLength,
  ...props
}) => {
  var _a;
  const [value, setValue] = useState8(initialValue);
  const [debounced] = useDebouncedValue(value, 500);
  const initialMount = useRef2(true);
  useEffect5(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    onDebouncedSearch == null ? void 0 : onDebouncedSearch(debounced);
  }, [debounced]);
  return /* @__PURE__ */ jsx20(
    TextInput3,
    {
      ...props,
      maxLength,
      icon: includeSearchIcon ? /* @__PURE__ */ jsx20(Search, {}) : void 0,
      rightSection: includeSearchIcon ? /* @__PURE__ */ jsx20(ActionIcon2, { onClick: () => setValue(""), children: /* @__PURE__ */ jsx20(X, {}) }) : void 0,
      value,
      onChange: (e) => {
        const sanitized = e.currentTarget.value.replace(
          CONSECUTIVE_RE,
          (_, ch) => ch.repeat(MAX_CONSECUTIVE)
        );
        setValue(sanitized);
      },
      ref: (_a = props.ref) != null ? _a : inputRef
    }
  );
};
var TextDebouncedInput_default = TextDebouncedInput;
export {
  Alert,
  Bell,
  Building,
  BulkEmailInput_default as BulkEmailInput,
  ButtonGroupTabs_default as ButtonGroupTabs,
  CardSection,
  Check,
  ChevronDown,
  ChevronUp,
  CurrencyInput_default as CurrencyInput,
  CustomRadioCard,
  DropdownButton,
  EditableText,
  EliseTheme,
  ExclamationCircleFill,
  ExclamationTriangleFill,
  Filter,
  FilterCheckbox_default as FilterCheckbox,
  FilterGroup_default as FilterGroup,
  FilterSidebar_default as FilterSidebar,
  FormGroup,
  HoldButton_default as HoldButton,
  InfoCircle,
  NonIdealState,
  NotificationBadge,
  Pencil,
  PhoneInput_default as PhoneInput,
  Plus,
  Search,
  Settings,
  Tab,
  Tabs2 as Tabs,
  TailwindAlert,
  TextDebouncedInput_default as TextDebouncedInput,
  Trash,
  X,
  XCircleFill,
  appNotification,
  disabledStyles,
  labelStyles
};
//# sourceMappingURL=index.mjs.map