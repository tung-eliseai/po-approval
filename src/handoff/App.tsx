import React, { useState } from 'react';
import {
  Switch, TextInput, Select, Button, Badge, Tabs,
  NumberInput, Anchor, Menu,
} from '@mantine/core';
import {
  EliseTheme,
  TailwindAlert,
  ButtonGroupTabs,
  NotificationBadge,
  NonIdealState,
  EditableText,
  DropdownButton,
  HoldButton,
  Tabs as EliseTabs,
  Tab as EliseTab,
  FormGroup,
  CardSection,
} from '@elise/design-system';

// ── Helpers ───────────────────────────────────────────────────────────────────

function highlight(raw: string): string {
  return raw
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(`[^`]*`|"[^"]*"|'[^']*')/g, '<em class="str">$1</em>')
    .replace(/\b(import|from|export|const|let|function|return|interface|type|default|as|true|false|null|undefined|useState|useEffect)\b/g, '<em class="kw">$1</em>')
    .replace(/\b([A-Z][A-Za-z0-9]+)\b/g, '<em class="comp">$1</em>')
    .replace(/(\/\/[^\n]*)/g, '<em class="cmt">$1</em>');
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: 'relative', marginTop: 10 }}>
      <style>{`
        .cb em { font-style: normal; }
        .cb .str { color: #a3be8c; }
        .cb .kw  { color: #81a1c1; }
        .cb .comp{ color: #88c0d0; }
        .cb .cmt { color: #616e88; }
      `}</style>
      <pre className="cb" style={{ background: '#2e3440', color: '#d8dee9', padding: '14px 16px', borderRadius: 8, fontSize: 12, lineHeight: 1.65, overflow: 'auto', fontFamily: "'SF Mono','Fira Code',monospace", margin: 0 }}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        style={{ position: 'absolute', top: 8, right: 8, padding: '3px 10px', fontSize: 11, background: copied ? '#a3be8c22' : '#ffffff18', color: copied ? '#a3be8c' : '#d8dee9', border: '1px solid #ffffff28', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit' }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  );
}

interface SectionProps { title: string; description?: string; source: string; children: React.ReactNode; }
function Section({ title, description, source, children }: SectionProps) {
  return (
    <section style={{ marginBottom: 64 }} id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#262626', margin: 0 }}>{title}</h2>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: source === '@elise/design-system' ? '#eee7ff' : '#e5ebff', color: source === '@elise/design-system' ? '#3712a0' : '#0c23a8', fontFamily: "'SF Mono','Fira Code',monospace" }}>{source}</span>
      </div>
      {description && <p style={{ fontSize: 13, color: '#595959', marginBottom: 16, lineHeight: 1.6, marginTop: 0 }}>{description}</p>}
      {children}
    </section>
  );
}

function Preview({ children, bg = '#f8f8f8' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ background: bg, border: '1px solid #E8E8E8', borderRadius: 10, padding: '28px 24px', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: '#8C8C8C', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</div>;
}

// ── Color token grid ──────────────────────────────────────────────────────────

const COLOR_SCALES: [string, string[]][] = [
  ['purple', EliseTheme.colors!.purple as string[]],
  ['dark',   EliseTheme.colors!.dark   as string[]],
  ['green',  EliseTheme.colors!.green  as string[]],
  ['red',    EliseTheme.colors!.red    as string[]],
  ['orange', EliseTheme.colors!.orange as string[]],
  ['yellow', EliseTheme.colors!.yellow as string[]],
  ['blue',   EliseTheme.colors!.blue   as string[]],
];

function ColorRow({ name, shades }: { name: string; shades: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8 }}>
      <div style={{ width: 80, fontSize: 12, color: '#595959', fontWeight: 500 }}>{name}</div>
      {shades.map((hex, i) => (
        <div
          key={i}
          title={`${name}[${i}] = ${hex}`}
          onClick={() => navigator.clipboard.writeText(hex)}
          style={{ width: 52, height: 36, background: hex, cursor: 'pointer', borderRadius: i === 0 ? '6px 0 0 6px' : i === shades.length - 1 ? '0 6px 6px 0' : 0, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 3 }}
        >
          <span style={{ fontSize: 9, color: i < 5 ? '#26262666' : '#ffffff88', fontFamily: "'SF Mono',monospace" }}>{i}</span>
        </div>
      ))}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Setup', id: 'setup' },
  { label: 'Design Tokens', id: 'design-tokens' },
  { label: '—', id: '' },
  { label: 'Switch', id: 'switch' },
  { label: 'TextInput', id: 'textinput' },
  { label: 'Select', id: 'select' },
  { label: 'Button', id: 'button' },
  { label: 'Badge', id: 'badge' },
  { label: 'Anchor', id: 'anchor' },
  { label: '—', id: '' },
  { label: 'Tabs', id: 'tabs' },
  { label: 'ButtonGroupTabs', id: 'buttongrouptabs' },
  { label: 'Alert', id: 'alert' },
  { label: 'NotificationBadge', id: 'notificationbadge' },
  { label: 'NonIdealState', id: 'non-ideal-state' },
  { label: 'EditableText', id: 'editabletext' },
  { label: 'DropdownButton', id: 'dropdownbutton' },
  { label: 'HoldButton', id: 'holdbutton' },
  { label: 'FormGroup', id: 'formgroup' },
  { label: 'CardSection', id: 'cardsection' },
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [editableVal, setEditableVal] = useState('Click to edit me');
  const [switchOn, setSwitchOn] = useState(false);
  const [selectVal, setSelectVal] = useState<string | null>('option1');
  const [eliseTab, setEliseTab] = useState<string | number>('tab1');
  const [mantineTab, setMantineTab] = useState('tab1');

  return (
    <div style={{ fontFamily: "'SF Pro',-apple-system,BlinkMacSystemFont,sans-serif", fontSize: 13, color: '#262626', letterSpacing: '0.3px', display: 'flex', minHeight: '100vh', background: '#fff' }}>
      {/* Sidebar nav */}
      <nav style={{ width: 200, flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', borderRight: '1px solid #EFEFEF', padding: '24px 0', background: '#FAFAFA' }}>
        <div style={{ padding: '0 16px 20px', fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Components</div>
        {NAV_ITEMS.map((item, i) =>
          item.label === '—'
            ? <div key={i} style={{ height: 1, background: '#E8E8E8', margin: '8px 16px' }} />
            : <a key={i} href={`#${item.id}`} style={{ display: 'block', padding: '6px 16px', fontSize: 13, color: '#595959', textDecoration: 'none', borderRadius: 4, margin: '1px 8px' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#EFEFEF')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >{item.label}</a>
        )}
      </nav>

      {/* Content */}
      <main style={{ flex: 1, padding: '48px 64px', maxWidth: 900 }}>
        {/* Hero */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4719cd' }} />
            <span style={{ fontSize: 12, color: '#8C8C8C' }}>@elise/design-system · Mantine v5</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#262626', margin: '0 0 12px' }}>Component Handoff</h1>
          <p style={{ fontSize: 14, color: '#595959', margin: '0 0 20px', lineHeight: 1.7, maxWidth: 580 }}>
            Reference guide for every component used in the Purchase Order UI. Each section shows a live preview, import path, and copy-ready code.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['GL Account', 'gl_account.html'], ['PO Approval', 'po_approval.html'], ['PO Detail', 'po_detail.html']].map(([label, href]) => (
              <a key={href} href={`/${href}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid #D9D9D9', borderRadius: 6, fontSize: 12, color: '#3712a0', textDecoration: 'none', background: '#fff' }}>
                {label}
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M2 8l6-6M4 2h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Setup ── */}
        <section style={{ marginBottom: 64 }} id="setup">
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#262626', margin: '0 0 6px' }}>Setup</h2>
          <p style={{ fontSize: 13, color: '#595959', marginBottom: 16, lineHeight: 1.6, marginTop: 0 }}>
            Wrap your app in <code style={{ fontFamily: "'SF Mono',monospace", background: '#F0EDF9', color: '#4719cd', padding: '1px 5px', borderRadius: 4 }}>MantineProvider</code> with <code style={{ fontFamily: "'SF Mono',monospace", background: '#F0EDF9', color: '#4719cd', padding: '1px 5px', borderRadius: 4 }}>EliseTheme</code>. All Mantine components will automatically inherit Elise's colors, typography, and component overrides.
          </p>
          <CodeBlock code={`import { MantineProvider } from '@mantine/core';
import { EliseTheme } from '@elise/design-system';

// Required peer deps: @mantine/core @mantine/hooks @mantine/notifications
// Optional Tailwind: components like FormGroup, CardSection, TailwindAlert
//   need Tailwind CSS loaded. See tailwind.config.js in @elise/design-system.

function Root() {
  return (
    <MantineProvider theme={EliseTheme}>
      <App />
    </MantineProvider>
  );
}`} />
        </section>

        {/* ── Design Tokens ── */}
        <section style={{ marginBottom: 64 }} id="design-tokens">
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#262626', margin: '0 0 16px' }}>Design Tokens</h2>

          <div style={{ marginBottom: 28 }}>
            <Label>Colors · click a swatch to copy hex</Label>
            <div style={{ background: '#FAFAFA', border: '1px solid #E8E8E8', borderRadius: 10, padding: '20px 24px' }}>
              {COLOR_SCALES.map(([name, shades]) => (
                <ColorRow key={name} name={name} shades={shades} />
              ))}
            </div>
            <CodeBlock code={`// EliseTheme.colors — access via theme.colors.purple[5]
purple[5]  = '#4719cd'  // primary actions, active states
purple[6]  = '#3712a0'  // links (Anchor), hover
dark[1]    = '#D9D9D9'  // borders
dark[2]    = '#BFBFBF'  // muted / disabled
dark[4]    = '#8C8C8C'  // placeholder text
dark[6]    = '#595959'  // secondary text
dark[8]    = '#262626'  // primary text
green[0]   = '#e3fcec'  // success bg
green[6]   = '#278b4d'  // success text
red[0]     = '#ffe2e2'  // error bg
red[6]     = '#b30000'  // error text
orange[0]  = '#ffebe1'  // warning bg
orange[6]  = '#9e3d15'  // warning text
blue[0]    = '#e5ebff'  // info bg
blue[1]    = '#b6c2fe'  // info border`} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <Label>Typography</Label>
              <CodeBlock code={`fontFamily: 'SF Pro, -apple-system,
  BlinkMacSystemFont, sans-serif'
letterSpacing: '0.3px'  // global body

fontSizes:
  xs: 12   sm: 14   md: 16
  lg: 18   xl: 22`} />
            </div>
            <div>
              <Label>Radius &amp; Shadow</Label>
              <CodeBlock code={`radius:
  xs: 2px   // dropdowns
  sm: 6px   // buttons, inputs, cards
  md: 10px  // cards, modals
  lg: 16px  // large cards

shadow: '0px 9px 16px -6px rgba(0,0,0,0.3)'`} />
            </div>
          </div>
        </section>

        {/* ── Switch ── */}
        <Section title="Switch" source="@mantine/core" description="Controlled toggle. Uses Elise purple[6] for the on-state via the primary color.">
          <Preview>
            <div>
              <Label>Off</Label>
              <Switch checked={false} onChange={() => {}} label="Label" />
            </div>
            <div>
              <Label>On</Label>
              <Switch checked={true} onChange={() => {}} label="Label" />
            </div>
            <div>
              <Label>Controlled</Label>
              <Switch checked={switchOn} onChange={e => setSwitchOn(e.currentTarget.checked)} label="Open Commitments" />
            </div>
            <div>
              <Label>Disabled</Label>
              <Switch disabled label="Disabled" />
            </div>
          </Preview>
          <CodeBlock code={`import { Switch } from '@mantine/core';

const [checked, setChecked] = useState(false);

<Switch
  label="Open Commitments"
  checked={checked}
  onChange={(e) => setChecked(e.currentTarget.checked)}
/>

// Size variants: 'xs' | 'sm' (default) | 'md' | 'lg' | 'xl'
// <Switch size="md" label="Larger" checked={checked} onChange={...} />`} />
        </Section>

        {/* ── TextInput ── */}
        <Section title="TextInput" source="@mantine/core" description="Standard text input. Hover → purple[2] border, focus → purple[5] border (applied via EliseTheme inputStyles).">
          <Preview>
            <div style={{ width: 220 }}>
              <Label>Default</Label>
              <TextInput placeholder="Search or filter…" />
            </div>
            <div style={{ width: 220 }}>
              <Label>With label</Label>
              <TextInput label="Vendor name" placeholder="Valet Living, LLC" />
            </div>
            <div style={{ width: 220 }}>
              <Label>Disabled</Label>
              <TextInput disabled value="Read-only value" label="PO Number" />
            </div>
          </Preview>
          <CodeBlock code={`import { TextInput } from '@mantine/core';

// Basic
<TextInput placeholder="Search or filter…" />

// With label
<TextInput label="Vendor name" placeholder="Valet Living, LLC" />

// Controlled
const [value, setValue] = useState('');
<TextInput
  value={value}
  onChange={(e) => setValue(e.currentTarget.value)}
  label="Amount"
/>`} />
        </Section>

        {/* ── Select ── */}
        <Section title="Select" source="@mantine/core" description="Dropdown selector. Used in PO Approval for switching between PO versions.">
          <Preview>
            <div style={{ width: 220 }}>
              <Label>Default</Label>
              <Select
                value={selectVal}
                onChange={setSelectVal}
                data={[
                  { value: 'option1', label: 'PO — Over budget' },
                  { value: 'option2', label: 'Version 2 — Table' },
                  { value: 'option3', label: 'Version 3 — All good' },
                ]}
              />
            </div>
            <div style={{ width: 220 }}>
              <Label>With label</Label>
              <Select label="Community" defaultValue="westpark" data={[{ value: 'westpark', label: 'Westpark Ranch' }, { value: 'oakwood', label: 'Oakwood Apartments' }]} />
            </div>
          </Preview>
          <CodeBlock code={`import { Select } from '@mantine/core';

const [value, setValue] = useState<string | null>('po1');

<Select
  value={value}
  onChange={setValue}
  data={[
    { value: 'po1', label: 'PO — Over budget' },
    { value: 'v2',  label: 'Version 2 — Table' },
    { value: 'v3',  label: 'Version 3 — All good' },
  ]}
/>`} />
        </Section>

        {/* ── Button ── */}
        <Section title="Button" source="@mantine/core" description="Primary action button. EliseTheme sets radius='sm' and removes font-weight bold by default.">
          <Preview>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <Label>Variants</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button variant="filled">Approve</Button>
                  <Button variant="outline">Request changes</Button>
                  <Button variant="light">View reports</Button>
                  <Button variant="subtle">Cancel</Button>
                </div>
              </div>
              <div>
                <Label>Colors</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button variant="filled" color="purple">Purple</Button>
                  <Button variant="outline" color="red">Reject</Button>
                  <Button variant="outline" color="purple">Changes</Button>
                  <Button variant="filled" color="gray">Download</Button>
                </div>
              </div>
              <div>
                <Label>Sizes</Label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button size="xs">xs</Button>
                  <Button size="sm">sm</Button>
                  <Button size="md">md (default)</Button>
                  <Button size="lg">lg</Button>
                </div>
              </div>
              <div>
                <Label>States</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button loading>Saving…</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Preview>
          <CodeBlock code={`import { Button } from '@mantine/core';

// Variants: 'filled' | 'outline' | 'light' | 'subtle' | 'default' | 'white'
// Colors: 'purple' (primary) | 'red' | 'green' | 'orange' | 'gray'

<Button variant="filled" color="purple">Approve</Button>
<Button variant="outline" color="red">Reject</Button>
<Button variant="outline" color="purple">Request changes</Button>

// With icon
<Button variant="outline" leftIcon={<DownloadIcon />}>Download</Button>

// Loading / disabled
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>`} />
        </Section>

        {/* ── Badge ── */}
        <Section title="Badge" source="@mantine/core" description="Status pill. EliseTheme removes textTransform uppercase and sets fontWeight normal.">
          <Preview>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <Label>Filled (default)</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Badge color="green">Active</Badge>
                  <Badge color="purple">Pending</Badge>
                  <Badge color="red">Over budget</Badge>
                  <Badge color="orange">Near limit</Badge>
                  <Badge color="gray">Draft</Badge>
                </div>
              </div>
              <div>
                <Label>Light (semantic pairing used in PO pages)</Label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Badge variant="light" color="green">Within budget</Badge>
                  <Badge variant="light" color="orange">Near limit</Badge>
                  <Badge variant="light" color="red">Over budget</Badge>
                  <Badge variant="light" color="purple">Inquiry</Badge>
                </div>
              </div>
              <div>
                <Label>Outline</Label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Badge variant="outline" color="purple">Approved</Badge>
                  <Badge variant="outline" color="gray">Inactive</Badge>
                </div>
              </div>
            </div>
          </Preview>
          <CodeBlock code={`import { Badge } from '@mantine/core';

// EliseTheme: radius='xl', no text-transform, fontWeight normal

// Semantic usage in this project:
<Badge color="green">Within budget</Badge>     // success
<Badge color="orange">Near limit</Badge>        // warning
<Badge color="red">Over budget</Badge>          // danger

// Variants
<Badge variant="filled" color="purple">Active</Badge>
<Badge variant="light"  color="green">Active</Badge>
<Badge variant="outline" color="gray">Draft</Badge>`} />
        </Section>

        {/* ── Anchor ── */}
        <Section title="Anchor" source="@mantine/core" description="Hyperlink styled to purple[6] = #3712a0 via EliseTheme.">
          <Preview>
            <Anchor href="#">Variance Settings</Anchor>
            <Anchor href="#" style={{ fontSize: 12 }}>View GL Account →</Anchor>
          </Preview>
          <CodeBlock code={`import { Anchor } from '@mantine/core';

// EliseTheme sets color: purple[6] = '#3712a0' automatically
<Anchor href="/gl_account.html">View GL Account</Anchor>

// As a React Router link
import { Link } from 'react-router-dom';
<Anchor component={Link} to="/gl-account">View GL Account</Anchor>`} />
        </Section>

        {/* ── Tabs (Elise) ── */}
        <Section title="Tabs" source="@elise/design-system" description="Custom tab component with an animated bottom indicator. Used for primary page navigation.">
          <Preview bg="#fff">
            <div style={{ width: '100%' }}>
              <EliseTabs id="handoff-tabs" selectedTabId={eliseTab} onChange={(id) => setEliseTab(id)}>
                <EliseTab id="tab1" title="Overview" component={<div style={{ padding: '12px 0', fontSize: 13, color: '#595959' }}>Overview content</div>} />
                <EliseTab id="tab2" title="Documents" component={<div style={{ padding: '12px 0', fontSize: 13, color: '#595959' }}>Documents content</div>} />
                <EliseTab id="tab3" title="History" component={<div style={{ padding: '12px 0', fontSize: 13, color: '#595959' }}>History content</div>} />
                <EliseTab id="tab4" title="Disabled" disabled component={<div />} />
              </EliseTabs>
            </div>
          </Preview>
          <CodeBlock code={`import { Tabs, Tab } from '@elise/design-system';

const [activeTab, setActiveTab] = useState<string | number>('overview');

<Tabs
  id="page-tabs"
  selectedTabId={activeTab}
  onChange={(id) => setActiveTab(id)}
  isSticky               // position:sticky so tabs stay on scroll
  rightElement={<Button size="xs">Action</Button>}
>
  <Tab id="overview"  title="Overview"  component={<OverviewPanel />} />
  <Tab id="documents" title="Documents" component={<DocsPanel />} />
  <Tab id="history"   title="History"   component={<HistoryPanel />} />
  <Tab id="settings"  title="Disabled"  disabled component={<div />} />
</Tabs>`} />
        </Section>

        {/* ── ButtonGroupTabs ── */}
        <Section title="ButtonGroupTabs" source="@elise/design-system" description="Pill-style segmented control built on Mantine Tabs. Good for view-switcher controls.">
          <Preview>
            <Tabs defaultValue="bar">
              <ButtonGroupTabs defaultValue="bar">
                <Tabs.List>
                  <Tabs.Tab value="bar">Bar</Tabs.Tab>
                  <Tabs.Tab value="table">Table</Tabs.Tab>
                  <Tabs.Tab value="list">List</Tabs.Tab>
                </Tabs.List>
              </ButtonGroupTabs>
            </Tabs>
          </Preview>
          <CodeBlock code={`import { Tabs } from '@mantine/core';
import { ButtonGroupTabs } from '@elise/design-system';

// Wraps Mantine Tabs with unstyled pill styling
<Tabs defaultValue="bar">
  <ButtonGroupTabs defaultValue="bar">
    <Tabs.List>
      <Tabs.Tab value="bar">Bar</Tabs.Tab>
      <Tabs.Tab value="table">Table</Tabs.Tab>
      <Tabs.Tab value="list">List</Tabs.Tab>
    </Tabs.List>
  </ButtonGroupTabs>
</Tabs>`} />
        </Section>

        {/* ── Alert ── */}
        <Section title="Alert / TailwindAlert" source="@elise/design-system" description="Banner alert in four semantic types. Requires Tailwind CSS in the consuming app.">
          <Preview bg="#fff">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              <TailwindAlert type="info">This PO has been submitted for approval.</TailwindAlert>
              <TailwindAlert type="warning">Approval will put this GL account over the monthly budget.</TailwindAlert>
              <TailwindAlert type="error">This PO has been rejected. Please revise and resubmit.</TailwindAlert>
              <TailwindAlert type="neutral">No PO is attached to this invoice.</TailwindAlert>
            </div>
          </Preview>
          <CodeBlock code={`import { Alert } from '@elise/design-system';
// also exported as TailwindAlert (same component)

// Types: 'neutral' | 'info' | 'warning' | 'error'
<Alert type="info">This PO has been submitted for approval.</Alert>
<Alert type="warning">Approval will put this GL over the monthly budget.</Alert>
<Alert type="error">This PO has been rejected.</Alert>
<Alert type="neutral">No PO is attached to this invoice.</Alert>

// Multi-line with action button
<Alert type="warning" multiLine actions={<Button size="xs">View budget</Button>}>
  Approving this PO will put the Landscaping GL account $240 over
  the monthly budget of $1,500.
</Alert>

// ⚠️  Requires Tailwind CSS — add to tailwind.config.js:
// content: ['./node_modules/@elise/design-system/dist/**/*.js']`} />
        </Section>

        {/* ── NotificationBadge ── */}
        <Section title="NotificationBadge" source="@elise/design-system" description="Circular count badge in Elise red. Adjusts font size automatically for 1–4 digit counts.">
          <Preview>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {[1, 12, 48, 128, 9999].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#8C8C8C' }}>{n}</span>
                  <NotificationBadge notificationNumber={n} />
                </div>
              ))}
            </div>
          </Preview>
          <CodeBlock code={`import { NotificationBadge } from '@elise/design-system';

// Inline — used next to a tab title or nav item
<span>Tasks</span>
<NotificationBadge notificationNumber={48} />

// Renders a circular red badge (background: #B90000)
// Font size scales: 12px (1-2 digits), 9px (3), 7px (4+)`} />
        </Section>

        {/* ── NonIdealState ── */}
        <Section title="NonIdealState" source="@elise/design-system" description="Centered empty-state layout with optional icon, title, description, and action.">
          <Preview bg="#fff">
            <div style={{ height: 220, width: '100%', border: '1px solid #E8E8E8', borderRadius: 8 }}>
              <NonIdealState
                attentionGrabber={<span>📋</span>}
                title="No purchase orders"
                description="Once a PO is created it will appear here."
                action={<Button size="sm">Create PO</Button>}
              />
            </div>
          </Preview>
          <CodeBlock code={`import { NonIdealState } from '@elise/design-system';

<NonIdealState
  attentionGrabber={<YourIcon style={{ fontSize: 48 }} />}
  title="No purchase orders"
  description="Once a PO is created it will appear here."
  action={<Button size="sm" onClick={onCreate}>Create PO</Button>}
/>`} />
        </Section>

        {/* ── EditableText ── */}
        <Section title="EditableText" source="@elise/design-system" description="Click-to-edit inline text. Enter saves, Escape cancels.">
          <Preview>
            <div style={{ fontSize: 13, color: '#595959', marginRight: 8 }}>Click the text below:</div>
            <EditableText value={editableVal} onSave={setEditableVal} />
          </Preview>
          <CodeBlock code={`import { EditableText } from '@elise/design-system';

const [title, setTitle] = useState('2026 Operating Budget');

// Shows text + pencil icon. Click → inline input.
// Enter = save,  Escape = cancel
<EditableText value={title} onSave={(newValue) => setTitle(newValue)} />`} />
        </Section>

        {/* ── DropdownButton ── */}
        <Section title="DropdownButton" source="@elise/design-system" description="Button with a dropdown menu. Built on Mantine Menu.">
          <Preview>
            <DropdownButton
              label="Download"
              options={[
                { key: 'csv', label: 'Export as CSV', onClick: () => {} },
                { key: 'pdf', label: 'Export as PDF', onClick: () => {} },
                { key: 'xlsx', label: 'Export as Excel', onClick: () => {} },
              ]}
            />
            <DropdownButton
              label="Actions"
              variant="filled"
              options={[
                { key: 'approve', label: 'Approve PO', onClick: () => {} },
                { key: 'reject',  label: 'Reject PO', onClick: () => {} },
              ]}
            />
          </Preview>
          <CodeBlock code={`import { DropdownButton } from '@elise/design-system';
import type { DropdownOption } from '@elise/design-system';

const options: DropdownOption[] = [
  { key: 'csv',  label: 'Export as CSV',   onClick: () => handleExport('csv') },
  { key: 'pdf',  label: 'Export as PDF',   onClick: () => handleExport('pdf') },
  { key: 'xlsx', label: 'Export as Excel', onClick: () => handleExport('xlsx') },
];

// variant: 'outline' (default) | 'filled' | 'light' | 'subtle'
// size:    'xs' | 'sm' (default) | 'md' | 'lg' | 'xl'
<DropdownButton label="Download" options={options} variant="outline" />`} />
        </Section>

        {/* ── HoldButton ── */}
        <Section title="HoldButton" source="@elise/design-system" description="Confirmation button that requires holding for a set duration. Used for destructive or irreversible actions.">
          <Preview>
            <HoldButton
              text="Hold to delete"
              holdTime={2000}
              color="#b30000"
              startTimerOn="click"
              onConfirm={() => alert('Confirmed!')}
            />
            <HoldButton
              text="Hold to approve"
              holdTime={1500}
              color="#4719cd"
              startTimerOn="click"
              onConfirm={() => alert('Approved!')}
            />
          </Preview>
          <CodeBlock code={`import { HoldButton } from '@elise/design-system';

// startTimerOn: 'click' — timer starts when user holds mouse down
// startTimerOn: 'mount' — timer starts immediately on render

<HoldButton
  text="Hold to delete"
  holdTime={2000}           // milliseconds to hold
  color="#b30000"           // fill color
  startTimerOn="click"
  onConfirm={() => handleDelete()}
/>

// With submitAfterTime: auto-submits when timer completes
<HoldButton
  text="Auto-approving in 3s…"
  holdTime={3000}
  color="#4719cd"
  startTimerOn="mount"
  submitAfterTime
  onConfirm={() => handleApprove()}
/>`} />
        </Section>

        {/* ── FormGroup ── */}
        <Section title="FormGroup" source="@elise/design-system" description="Form field wrapper providing consistent label, helper text, and inline layout. Requires Tailwind CSS.">
          <Preview bg="#fff">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 400 }}>
              <FormGroup label="Vendor name" helperText="Must be an approved vendor">
                <TextInput placeholder="Valet Living, LLC" style={{ width: '100%' }} />
              </FormGroup>
              <FormGroup label="Amount" labelInfo="Displayed in USD">
                <NumberInput placeholder="0.00" style={{ width: '100%' }} />
              </FormGroup>
            </div>
          </Preview>
          <CodeBlock code={`import { FormGroup } from '@elise/design-system';
import { TextInput, Select } from '@mantine/core';

// ⚠️  Requires Tailwind CSS

<FormGroup
  label="Vendor name"
  helperText="Must match an approved vendor in the system"
>
  <TextInput placeholder="Valet Living, LLC" />
</FormGroup>

// Inline layout (label left, input right)
<FormGroup label="Status" isInline>
  <Select data={['Active', 'Inactive']} defaultValue="Active" />
</FormGroup>

// Disabled state
<FormGroup label="PO Number" isDisabled>
  <TextInput disabled value="PO-000077" />
</FormGroup>`} />
        </Section>

        {/* ── CardSection ── */}
        <Section title="CardSection" source="@elise/design-system" description="Bordered card with icon, title, subtitle, and optional action slot. Requires Tailwind CSS.">
          <Preview bg="#fff">
            <div style={{ width: '100%' }}>
              <CardSection
                icon={<span style={{ fontSize: 20 }}>📄</span>}
                title="Purchase Order Details"
                subtitle="PO-000077 · Valet Living, LLC"
                action={<Button size="xs" variant="outline">Edit</Button>}
              >
                <div style={{ fontSize: 13, color: '#595959' }}>Card content goes here.</div>
              </CardSection>
            </div>
          </Preview>
          <CodeBlock code={`import { CardSection } from '@elise/design-system';

// ⚠️  Requires Tailwind CSS

<CardSection
  icon={<POIcon />}
  title="Purchase Order Details"
  subtitle="PO-000077 · Valet Living, LLC"
  action={<Button size="xs" variant="outline">Edit</Button>}
>
  {/* Card content */}
  <div>...</div>
</CardSection>`} />
        </Section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #EFEFEF', paddingTop: 32, marginTop: 32, fontSize: 12, color: '#8C8C8C', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>@elise/design-system · Mantine v5 · Purchase Order UI</span>
          <span style={{ fontFamily: "'SF Mono',monospace" }}>EliseTheme · primaryColor: purple · primaryShade: 6</span>
        </div>
      </main>
    </div>
  );
}
