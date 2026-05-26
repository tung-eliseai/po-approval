import React, { useState, useEffect, useRef } from 'react';
import { Switch } from '@mantine/core';
import { Sidebar } from '../shared/Sidebar';

// ── Data ─────────────────────────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search);
const highlightCode = params.get('code') || '';

type RowType = 'cat' | 'sub' | 'acct';
interface Row {
  t: RowType;
  n: string;
  c: string;
  v?: number[];
  indent?: number;
  txn?: string[];
}

const ROWS: Row[] = [
  {t:'cat', n:'ASSETS', c:'10000'},
  {t:'sub', n:'CASH & BANK ACCOUNTS', c:'10050'},
  {t:'sub', n:'CURRENT ASSETS', c:'11000'},
  {t:'acct', n:'Escrow - Property Tax', c:'10600', v:[0,40426.45,0,0,0,0,0,0,0,-386602.11], txn:['PROPERTYTAX COUNTY ASSESSOR Q1 2026']},
  {t:'acct', n:'Escrow - Insurance', c:'10610', v:[0,15801.62,0,0,0,0,0,0,0,63206.48], txn:['INSURANCE ESCROW DEPOSIT APR 2026']},
  {t:'acct', n:'Escrow - Replacement Reserve', c:'10620', v:[0,4147,0,0,0,0,0,0,0,4147], txn:['NMRKCLEARI NMRK CLEARING ID1453508295, REF*V...']},
  {t:'acct', n:'Escrow - Repair Reserve', c:'10630', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'acct', n:'Interest reserve', c:'10640', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'acct', n:'Undeposited Funds', c:'11400', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'acct', n:'Cash Clearing', c:'11500', v:[0,0,0,0,0,0,0,0,0,-5909.38], txn:['ACH CLEARING BATCH 20260401']},
  {t:'acct', n:'AR Payment Processor Clearing', c:'11510', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'acct', n:'AP Payment Processor Clearing', c:'11520', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'acct', n:'Check Pay-In Clearing', c:'11530', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'sub', n:'ACCOUNTS RECEIVABLE', c:'12000'},
  {t:'acct', n:'Accounts Receivable - Rent', c:'12100', v:[0,14606.57,0,7976.29,0,0,0,0,0,26532.18], txn:['RENT PAYMENT UNIT 101 APR 2026','RENT PAYMENT UNIT 204B APR 2026']},
  {t:'acct', n:'Insurance Claim Receivable', c:'12200', v:[0,0,0,0,0,0,0,0,0,0], txn:[]},
  {t:'cat', n:'LIABILITIES', c:'20000'},
  {t:'sub', n:'CURRENT LIABILITIES', c:'21000'},
  {t:'acct', n:'Accounts Payable', c:'21100', v:[0,-1779.89,0,0,0,0,0,0,0,-1779.89], txn:['PO-000077 Valet Living, LLC']},
  {t:'acct', n:'Accrued Expenses', c:'21200', v:[0,-4200,0,0,0,0,0,0,0,-4200], txn:['Accrued maintenance contracts APR']},
  {t:'cat', n:'REVENUE', c:'30000'},
  {t:'sub', n:'Rental Revenue', c:'31000'},
  {t:'acct', n:'Gross Potential Rent', c:'31100', v:[0,187450,0,0,0,0,0,0,0,749800], txn:['Monthly rent roll APR 2026']},
  {t:'acct', n:'Vacancy Loss', c:'31200', v:[0,-12300,0,0,0,0,0,0,0,-48100], txn:['Vacancy units 205, 310, 418']},
  {t:'acct', n:'Concessions', c:'31300', v:[0,-2800,0,0,0,0,0,0,0,-9200], txn:['Move-in concessions APR 2026']},
  {t:'cat', n:'EXPENSES', c:'50000'},
  {t:'sub', n:'Operating Expenses', c:'50050'},
  {t:'acct', n:'Repairs & Maintenance - Operational', c:'54200', v:[800,1300,800,0,800,0,800,0,3200,1300], txn:['Services — PO-000077 (Valet Living, LLC)']},
  {t:'acct', n:'Plumbing Repairs', c:'54210', v:[400,800,400,0,400,0,400,0,1600,800], indent:1, txn:['Plumbing repair — PO-000077 (Valet Living, LLC)']},
  {t:'acct', n:'Trash Removal - Operational', c:'55400', v:[0,740,0,0,0,0,0,0,0,740], txn:['Trash service — PO-000077 (Valet Living, LLC)']},
  {t:'acct', n:'Landscaping - Operational', c:'15600', v:[1500,1200,1500,0,1500,0,1500,0,6000,1200], txn:['Landscaping services — PO-000077 (Valet Living, LLC)']},
  {t:'acct', n:'Common Area Maintenance - Operational', c:'57100', v:[750,800,750,0,750,0,750,0,3000,800], txn:['CAM services — PO-000077 (Valet Living, LLC)']},
  {t:'sub', n:'Maintenance Contracts', c:'56000'},
  {t:'acct', n:'HVAC Maintenance', c:'56100', v:[200,200,200,0,200,0,200,0,800,200], txn:['HVAC quarterly service contract']},
  {t:'acct', n:'Elevator Maintenance', c:'56200', v:[150,0,150,0,150,0,150,0,600,0], txn:[]},
  {t:'acct', n:'Fire Safety & Sprinkler', c:'56300', v:[100,0,100,0,100,0,100,0,400,0], txn:[]},
  {t:'sub', n:'Administrative', c:'58000'},
  {t:'acct', n:'Management Fee', c:'58100', v:[2200,2200,2200,0,2200,0,2200,0,8800,2200], txn:['Property management fee APR 2026']},
  {t:'acct', n:'Legal & Professional', c:'58200', v:[500,0,500,0,500,0,500,0,2000,0], txn:[]},
  {t:'acct', n:'Office Supplies', c:'58300', v:[75,43.18,75,0,75,0,75,0,300,43.18], txn:['Amazon supply order APR 2026']},
];

const fmt = (n: number) => {
  if (n === 0) return '$0.00';
  const abs = Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  return n < 0 ? `($${abs})` : `$${abs}`;
};

const MONTH_LABELS = ["Apr '26", "May '26", "Jun '26", "Jul '26", 'YTD'];

// ── Tooltip ───────────────────────────────────────────────────────────────────

interface TooltipState {
  row: Row;
  colPair: number;
  left: number;
  top: number;
}

// ── Table rows ────────────────────────────────────────────────────────────────

interface CellProps {
  val: number;
  isBudget: boolean;
  extraStyle?: React.CSSProperties;
  code: string;
  name: string;
  onHover: (e: React.MouseEvent<HTMLTableCellElement>, row: Row, colPair: number) => void;
  row: Row;
  colPair: number;
  isHL: boolean;
}

function ValCell({ val, isBudget, extraStyle, code, name, onHover, row, colPair, isHL }: CellProps) {
  const color = isBudget ? '#262626' : val > 0 ? '#278b4d' : val < 0 ? '#b30000' : '#262626';
  const content = val === 0
    ? (isBudget ? '$0.00' : <span style={{color:'#BFBFBF'}}>—</span>)
    : <span style={{color}}>{fmt(val)}</span>;
  const isNonZeroActual = !isBudget && val !== 0;
  const bg = isHL ? '#eee7ff' : isNonZeroActual ? '#F0FDF4' : '#fff';
  return (
    <td
      data-code={code}
      data-name={name}
      onMouseEnter={(e) => onHover(e, row, colPair)}
      style={{
        textAlign: 'right',
        whiteSpace: 'nowrap',
        minWidth: 100,
        cursor: 'pointer',
        padding: '8px 14px',
        borderBottom: '1px solid #EFEFEF',
        background: bg,
        fontSize: 13,
        ...extraStyle,
      }}
    >
      {content}
    </td>
  );
}

function TableRow({ row, onHover }: { row: Row; onHover: (e: React.MouseEvent<HTMLTableCellElement>, row: Row, colPair: number) => void }) {
  const isHL = row.c === highlightCode;

  const nameTdBase: React.CSSProperties = {
    minWidth: 270, maxWidth: 270, whiteSpace: 'nowrap', overflow: 'hidden',
    textOverflow: 'ellipsis', textAlign: 'left', borderRight: '1px solid #D9D9D9',
    position: 'sticky', left: 0, zIndex: 2,
  };

  if (row.t === 'cat') {
    return (
      <tr style={{background:'#FAFAFA'}}>
        <td style={{...nameTdBase, padding:'9px 14px', fontSize:12, fontWeight:600, color:'#262626', textTransform:'uppercase', letterSpacing:'0.05em', borderBottom:'1px solid #D9D9D9', background:'#FAFAFA'}}>
          <span style={{display:'inline-block', transition:'transform 0.15s', marginRight:5, opacity:0.5}}>
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="#737373" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          {row.n} <span style={{color:'#8C8C8C', fontWeight:400, fontSize:11, marginLeft:4}}>{row.c}</span>
        </td>
        {Array(10).fill(null).map((_, i) => (
          <td key={i} style={{background:'#FAFAFA', borderBottom:'1px solid #D9D9D9', padding:'9px 14px'}}/>
        ))}
      </tr>
    );
  }

  if (row.t === 'sub') {
    return (
      <tr style={{background:'#fff'}}>
        <td style={{...nameTdBase, padding:'8px 14px', paddingLeft:22, fontSize:12, fontWeight:600, color:'#595959', borderBottom:'1px solid #EFEFEF', background:'#fff'}}>
          {row.n} <span style={{color:'#BFBFBF', fontSize:11, marginLeft:4}}>{row.c}</span>
        </td>
        {Array(10).fill(null).map((_, i) => (
          <td key={i} style={{borderBottom:'1px solid #EFEFEF', padding:'8px 14px'}}/>
        ))}
      </tr>
    );
  }

  const baseIndent = row.indent ? 46 : 30;
  const [aBdg,aAct,mBdg,mAct,jnBdg,jnAct,jlBdg,jlAct,ytdBdg,ytdAct] = row.v!;
  const sepStyle = (sep: string): React.CSSProperties => ({ borderLeft: `1px solid ${sep}` });

  return (
    <tr data-code={row.c} style={{background: isHL ? '#eee7ff' : '#fff'}}>
      <td style={{...nameTdBase, padding:'8px 14px', paddingLeft:baseIndent, fontSize:13, color:'#262626', borderBottom:'1px solid #EFEFEF', background: isHL ? '#eee7ff' : '#fff'}}>
        {row.n} <span style={{color:'#BFBFBF', fontSize:11, marginLeft:4}}>{row.c}</span>
      </td>
      <ValCell val={aBdg}   isBudget isHL={isHL} row={row} colPair={0} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={aAct}   isBudget={false} isHL={isHL} row={row} colPair={0} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={mBdg}   isBudget isHL={isHL} extraStyle={sepStyle('#EFEFEF')} row={row} colPair={1} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={mAct}   isBudget={false} isHL={isHL} row={row} colPair={1} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={jnBdg}  isBudget isHL={isHL} extraStyle={sepStyle('#EFEFEF')} row={row} colPair={2} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={jnAct}  isBudget={false} isHL={isHL} row={row} colPair={2} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={jlBdg}  isBudget isHL={isHL} extraStyle={sepStyle('#EFEFEF')} row={row} colPair={3} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={jlAct}  isBudget={false} isHL={isHL} row={row} colPair={3} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={ytdBdg} isBudget isHL={isHL} extraStyle={sepStyle('#D9D9D9')} row={row} colPair={4} code={row.c} name={row.n} onHover={onHover}/>
      <ValCell val={ytdAct} isBudget={false} isHL={isHL} row={row} colPair={4} code={row.c} name={row.n} onHover={onHover}/>
    </tr>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [openCommitments, setOpenCommitments] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (highlightCode) {
      const hl = document.querySelector('.row-highlight');
      if (hl) setTimeout(() => (hl as HTMLElement).scrollIntoView({block:'center', behavior:'smooth'}), 150);
    }
  }, []);

  const handleCellHover = (e: React.MouseEvent<HTMLTableCellElement>, row: Row, colPair: number) => {
    if (!row.v) return;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const td = e.currentTarget;
    const rowRect = td.parentElement!.getBoundingClientRect();
    const ttW = 360;
    let left = td.getBoundingClientRect().left + td.getBoundingClientRect().width / 2 - ttW / 2;
    let top = rowRect.bottom + 6;
    if (left < 8) left = 8;
    if (left + ttW > window.innerWidth - 8) left = window.innerWidth - ttW - 8;
    if (top + 180 > window.innerHeight - 8) top = rowRect.top - 190;
    setTooltip({ row, colPair, left, top });
  };

  const handleTableLeave = () => {
    hideTimerRef.current = setTimeout(() => setTooltip(null), 120);
  };

  const ttData = tooltip ? (() => {
    const { row, colPair } = tooltip;
    const bdg = row.v![colPair * 2];
    const act = row.v![colPair * 2 + 1];
    const variance = act - bdg;
    const pct = bdg !== 0 ? (variance / Math.abs(bdg) * 100).toFixed(1) : '0.0';
    const txns = row.txn || [];
    const monthLabel = MONTH_LABELS[colPair] || "Apr '26";
    const fmtV = (n: number) => n === 0 ? '$0.00' : (n < 0 ? `($${Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2})})` : `$${n.toLocaleString('en-US',{minimumFractionDigits:2})}`);
    const vClass = variance < 0 ? '#b30000' : variance > 0 ? '#278b4d' : '#262626';
    return { bdg, act, variance, pct, txns, monthLabel, fmtV, vClass };
  })() : null;

  return (
    <div style={{fontFamily:"'SF Pro',-apple-system,BlinkMacSystemFont,sans-serif", background:'#EFEFEF', color:'#262626', fontSize:13, letterSpacing:'0.3px', display:'flex', minHeight:'100vh'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        .sticky-col{position:sticky;left:0;z-index:2;}
        table thead .sticky-col{z-index:4;background:#fff;}
        .month-sep{border-left:1px solid #EFEFEF;}
        .th-ytd{border-left:1px solid #D9D9D9;}
        .ytd-sep{border-left:1px solid #D9D9D9;}
        .val-actual-nz{background:#F0FDF4;}
        .row-highlight td{background:#eee7ff!important;}
        .row-highlight .sticky-col{background:#eee7ff!important;}
        .row-highlight:hover td{background:#cabafc!important;}
      `}</style>

      <Sidebar activeItem="Tasks" />

      <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden'}}>
        {/* Page header */}
        <div style={{background:'#fff', borderBottom:'1px solid #D9D9D9', padding:'18px 28px 14px', flexShrink:0}}>
          <a href="javascript:history.back()" style={{display:'inline-flex', alignItems:'center', gap:5, color:'#3712a0', fontSize:13, textDecoration:'none', marginBottom:14}}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Budgets
          </a>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:10}}>
                <span style={{fontSize:26, fontWeight:700, color:'#262626'}}>2026 Operating Budget</span>
                <button style={{background:'none', border:'none', cursor:'pointer', color:'#737373', padding:'4px 6px', fontSize:13, marginLeft:6, borderRadius:6}}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M9 2l2 2-7 7H2V9l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', fontSize:12, color:'#595959'}}>
                <span style={{display:'inline-flex', alignItems:'center', padding:'2px 9px', borderRadius:20, background:'#e3fcec', color:'#278b4d', fontSize:11, fontWeight:500}}>Active</span>
                <span style={{color:'#BFBFBF'}}>·</span>
                <span>FY2026</span>
                <span style={{color:'#BFBFBF'}}>·</span>
                <span>ACCRUAL</span>
                <span style={{color:'#BFBFBF'}}>·</span>
                <span>Westpark Ranch</span>
                <span style={{color:'#BFBFBF'}}>·</span>
                <a href="#" style={{color:'#3712a0', cursor:'pointer', textDecoration:'none', fontSize:12}}>Variance Settings</a>
              </div>
            </div>
            <button style={{display:'inline-flex', alignItems:'center', gap:7, border:'1px solid #D9D9D9', borderRadius:6, padding:'8px 14px', fontSize:13, cursor:'pointer', background:'#fff', color:'#262626', whiteSpace:'nowrap', flexShrink:0}}>
              Download
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Controls bar */}
        <div style={{background:'#fff', borderBottom:'1px solid #D9D9D9', padding:'10px 28px', display:'flex', alignItems:'center', gap:12, flexShrink:0}}>
          <div style={{display:'flex', alignItems:'center', gap:8, border:'1px solid #D9D9D9', borderRadius:6, padding:'7px 12px', background:'#fff', width:200, transition:'border-color .15s'}}
            onMouseEnter={e => (e.currentTarget.style.borderColor='#a78df3')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='#D9D9D9')}
            onFocus={e => (e.currentTarget.style.borderColor='#4719cd')}
            onBlur={e => (e.currentTarget.style.borderColor='#D9D9D9')}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><circle cx="5.5" cy="5.5" r="4" stroke="#8C8C8C" strokeWidth="1.3"/><path d="M9 9l2.5 2.5" stroke="#8C8C8C" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search or filter..." style={{border:'none', outline:'none', fontSize:13, color:'#595959', background:'none', width:'100%'}}/>
          </div>

          <Switch
            label="Open Commitments"
            checked={openCommitments}
            onChange={(e) => setOpenCommitments(e.currentTarget.checked)}
            styles={{ label: { fontSize: 13, color: '#595959', paddingLeft: 8 } }}
          />

          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <button style={{display:'inline-flex', alignItems:'center', gap:5, border:'1px solid #D9D9D9', borderRadius:6, padding:'6px 12px', fontSize:13, cursor:'pointer', background:'#fff', color:'#4719cd'}}>
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M7 2h3v3M10 2L6 6M5 3H3a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              View reports
            </button>
            <button style={{display:'inline-flex', alignItems:'center', gap:5, border:'1px solid #D9D9D9', borderRadius:6, padding:'6px 12px', fontSize:13, cursor:'pointer', background:'#fff', color:'#262626'}}>
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M8.5 2l1.5 1.5-6 6H2.5V8L8.5 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Edit
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{flex:1, overflow:'auto', background:'#fff'}}>
          <table style={{borderCollapse:'collapse', width:'max-content', minWidth:'100%'}}>
            <thead>
              <tr>
                <th className="sticky-col" style={{padding:'10px 14px 6px', fontSize:12, fontWeight:500, color:'#737373', textAlign:'left', borderRight:'1px solid #D9D9D9', whiteSpace:'nowrap', background:'#fff'}}>Account</th>
                <th colSpan={2} style={{padding:'10px 12px 6px', fontSize:12, fontWeight:500, color:'#737373', textAlign:'center', whiteSpace:'nowrap'}}>Apr '26</th>
                <th colSpan={2} style={{padding:'10px 12px 6px', fontSize:12, fontWeight:500, color:'#737373', borderLeft:'1px solid #EFEFEF', textAlign:'center', whiteSpace:'nowrap'}}>
                  May '26 <svg width="7" height="7" viewBox="0 0 7 7" style={{marginLeft:3, verticalAlign:'middle'}}><circle cx="3.5" cy="3.5" r="3" fill="#BFBFBF"/></svg>
                </th>
                <th colSpan={2} style={{padding:'10px 12px 6px', fontSize:12, fontWeight:500, color:'#737373', borderLeft:'1px solid #EFEFEF', textAlign:'center', whiteSpace:'nowrap'}}>
                  Jun '26 <svg width="7" height="7" viewBox="0 0 7 7" style={{marginLeft:3, verticalAlign:'middle'}}><circle cx="3.5" cy="3.5" r="3" fill="#BFBFBF"/></svg>
                </th>
                <th colSpan={2} style={{padding:'10px 12px 6px', fontSize:12, fontWeight:500, color:'#737373', borderLeft:'1px solid #EFEFEF', textAlign:'center', whiteSpace:'nowrap'}}>
                  Jul '26 <svg width="7" height="7" viewBox="0 0 7 7" style={{marginLeft:3, verticalAlign:'middle'}}><circle cx="3.5" cy="3.5" r="3" fill="#BFBFBF"/></svg>
                </th>
                <th colSpan={2} style={{padding:'10px 12px 6px', fontSize:12, fontWeight:500, color:'#737373', borderLeft:'1px solid #D9D9D9', textAlign:'center', whiteSpace:'nowrap'}}>YTD</th>
              </tr>
              <tr>
                <th className="sticky-col" style={{padding:'4px 14px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'left', borderRight:'1px solid #D9D9D9', background:'#fff'}}></th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Budget</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Actual</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', borderLeft:'1px solid #EFEFEF', textAlign:'right', whiteSpace:'nowrap'}}>Budget</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Actual</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', borderLeft:'1px solid #EFEFEF', textAlign:'right', whiteSpace:'nowrap'}}>Budget</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Actual</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', borderLeft:'1px solid #EFEFEF', textAlign:'right', whiteSpace:'nowrap'}}>Budget</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Actual</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', borderLeft:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Budget</th>
                <th style={{padding:'4px 12px 8px', fontSize:11, fontWeight:400, color:'#8C8C8C', borderBottom:'1px solid #D9D9D9', textAlign:'right', whiteSpace:'nowrap'}}>Actual</th>
              </tr>
            </thead>
            <tbody onMouseLeave={handleTableLeave}>
              {ROWS.filter(r => r.v !== undefined || r.t !== 'acct').map((row, i) => (
                <TableRow key={i} row={row} onHover={handleCellHover} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && ttData && (
        <div style={{position:'fixed', background:'#fff', border:'1px solid #D9D9D9', borderRadius:10, padding:0, width:360, boxShadow:'0px 9px 16px -6px rgba(0,0,0,0.3)', zIndex:99999, pointerEvents:'none', fontSize:12, overflow:'hidden', left:tooltip.left, top:tooltip.top}}>
          <div style={{padding:'12px 14px 10px', borderBottom:'1px solid #D9D9D9', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10}}>
            <div style={{fontWeight:600, fontSize:12, color:'#262626'}}>{tooltip.row.n} <span style={{color:'#737373', fontSize:11, marginLeft:5, fontWeight:400}}>{tooltip.row.c}</span></div>
            <span style={{fontSize:11, color:'#737373', whiteSpace:'nowrap', flexShrink:0, paddingTop:1}}>{ttData.monthLabel}</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', padding:'10px 14px', background:'#e3fcec', borderBottom:'1px solid #9be3b5'}}>
            {[['Budget', ttData.bdg, ''], ['Actual', ttData.act, ttData.act > 0 ? '#278b4d' : ttData.act < 0 ? '#b30000' : ''], ['Variance', ttData.variance, ttData.vClass], ['%', `${ttData.pct}%`, ttData.vClass]].map(([label, val, color]) => (
              <div key={label as string}>
                <label style={{display:'block', fontSize:10, color:'#8C8C8C', fontWeight:500, marginBottom:3}}>{label}</label>
                <div style={{fontSize:12, fontWeight:500, color: (color as string) || '#262626'}}>{typeof val === 'number' ? ttData.fmtV(val) : val}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 14px 12px'}}>
            <div style={{fontSize:11, color:'#737373', marginBottom:6}}>{ttData.txns.length} Transaction{ttData.txns.length !== 1 ? 's' : ''}</div>
            {ttData.txns.length === 0
              ? <div style={{fontSize:11, color:'#8C8C8C'}}>No transactions</div>
              : ttData.txns.map((t, i) => (
                <div key={i} style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'#595959', padding:'3px 0', gap:12}}>
                  <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{t}</span>
                  <span style={{flexShrink:0, fontWeight:500}}>{ttData.fmtV(ttData.act)}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
