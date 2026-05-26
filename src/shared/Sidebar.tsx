import React from 'react';

const S = {
  sidebar: { width: 220, minWidth: 220, background: '#000', display: 'flex', flexDirection: 'column' as const, height: '100vh', position: 'sticky' as const, top: 0, overflowY: 'auto' as const, flexShrink: 0 },
  logo: { padding: '18px 16px 14px', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: -0.5 },
  logoSpan: { color: '#6032e6' },
  nav: { flex: 1, padding: '0 8px' },
  item: (active?: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', color: active ? '#fff' : '#8C8C8C', fontSize: 13, marginBottom: 1, userSelect: 'none', background: active ? '#4719cd' : 'transparent' }),
  chev: { marginLeft: 'auto', opacity: 0.4 },
  badge: { marginLeft: 'auto', background: '#4719cd', color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 10 },
  dot: { width: 7, height: 7, borderRadius: '50%', background: '#d99f11', marginLeft: 'auto', flexShrink: 0 },
  div: { borderTop: '1px solid rgba(255,255,255,0.08)', margin: '6px 8px' },
  bottom: { padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 10, alignItems: 'center' },
  botBtn: { width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8C8C8C' },
  avatar: { width: 34, height: 34, borderRadius: '50%', background: '#4719cd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', marginLeft: 'auto' },
};

const ChevRight = () => <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevDown = () => <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'Tasks' }: SidebarProps) {
  return (
    <nav style={S.sidebar}>
      <div style={S.logo}>Elise<span style={S.logoSpan}>AI</span></div>
      <div style={S.nav}>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Search</div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7.5 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Recent</div>
        <div style={S.div}/>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M2 7.5L7.5 2 13 7.5V13H9.5v-3h-4v3H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>Home</div>
        <div style={S.item(activeItem === 'Tasks')}>
          <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 7.5h5M5 5h5M5 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          Tasks
          <div style={S.dot}/>
        </div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 13c0-3 2.5-4.5 5.5-4.5S13 10 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Contacts<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M4 2v2M11 2v2M2 6h11M2 4h11v9H2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Applications<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="2" y="3" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7h11M5 2v2M10 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Calendar</div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M2 13V9m3 4V7m3 6V5m3 8V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Reports<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M3 13V8l4.5-5.5L12 8v5H9v-3H6v3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>Affordable<span style={S.badge}>New</span></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="1.5" y="6" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="4" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M4 6V4a2 2 0 014 0v.5" stroke="currentColor" strokeWidth="1.3"/></svg>Communities<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M7.5 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM7.5 5v3.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Knowledge<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="10.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5M8.5 10c1-.5 2-.5 2.5 0 1 .5 2 1.5 2 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Users<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M10.5 4.5l-6 6M3 9.5l2.5 2.5 7-7L10 2.5 3 9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Maintenance<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M2 8c0-3 2.5-5.5 5.5-5.5S13 5 13 8M2 8l2.5 2M13 8l-2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Renewals<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="3" y="2" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6 5h3M6 7.5h3M6 10h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Onboarding<div style={S.chev}><ChevRight/></div></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="2" y="4" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 4V3a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1.4"/></svg>SentimentAI</div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M7.5 2.5a5 5 0 010 10M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Product Updates<div style={S.dot}/></div>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3 3l1.5 1.5M10.5 10.5L12 12M3 12l1.5-1.5M10.5 4.5L12 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Settings<div style={S.chev}><ChevRight/></div></div>
        <div style={S.div}/>
        <div style={S.item()}><svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M2 4h11M2 7.5h7M2 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>Internal Tools<div style={{ ...S.chev, transform: 'rotate(90deg)' }}><ChevDown/></div></div>
      </div>
      <div style={S.bottom}>
        <div style={S.botBtn}><svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1a6 6 0 100 12A6 6 0 007 1zM4.5 6C4.5 4.6 5.6 3.5 7 3.5S9.5 4.6 9.5 6c0 1-.6 1.8-1.5 2.2V10H6V8.2C5.1 7.8 4.5 7 4.5 6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="11.5" r=".7" fill="currentColor"/></svg></div>
        <div style={S.botBtn}><svg width="14" height="14" fill="none" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 10V7M7 4.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
        <div style={S.avatar}>TP</div>
      </div>
    </nav>
  );
}
