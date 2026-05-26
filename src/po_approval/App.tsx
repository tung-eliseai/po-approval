import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { Sidebar } from '../shared/Sidebar';

// ── Constants & Data ──────────────────────────────────────────────────────────

const PU: Record<string, number[]> = {
  '54200':        [48,48,50,50,50,52,52,52,50,50,50,50],
  '57100_9000':   [120,120,122,122,122,124,124,124,122,122,120,120],
  '15600':        [85,85,88,88,88,90,90,90,88,88,86,86],
  '15660':        [85,85,88,88,88,90,90,90,88,88,86,86],
  '57100_8000':   [95,95,98,98,98,100,100,100,98,98,96,96],
  '57100_7000':   [60,60,62,62,62,64,64,64,62,62,60,60],
  '55400':        [48,48,50,50,50,52,52,52,50,50,50,50],
};

const PMB: Record<string, number[]> = {
  '54200':        [750,750,800,800,800,800,850,850,850,800,800,800],
  '57100_9000':   [700,700,750,750,750,800,800,800,750,750,750,750],
  '15600':        [1200,1200,1400,1500,1500,1500,1000,1000,1100,1100,1300,1300],
  '15660':        [400,400,400,500,500,500,450,450,400,400,450,500],
  '57100_8000':   [600,600,650,650,700,700,650,650,600,600,600,667],
  '57100_7000':   [500,500,550,550,550,550,500,500,500,500,550,583],
  '55400':        [740,740,740,740,740,740,740,740,740,740,740,740],
};

const MH: Record<string, number[]> = {
  '54200':        [420,610,380,720,850,490,1100,760,930,1050,820,1300],
  '57100_9000':   [550,490,620,710,480,590,830,760,620,700,580,800],
  '15600':        [900,1100,1350,1500,1200,800,600,700,1100,950,1300,1200],
  '15660':        [280,310,420,500,490,450,380,290,320,410,460,650],
  '57100_8000':   [380,420,510,490,600,550,480,520,490,530,510,600],
  '57100_7000':   [230,280,310,350,290,260,300,320,270,290,310,400],
  '55400':        [740,740,740,740,740,740,740,740,740,740,740,740],
};

const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const CUR_DATE = new Date();
const CUR_MO = CUR_DATE.toLocaleString('en-US', { month: 'short' });
const CUR_MO_NUM = CUR_DATE.getMonth() + 1;

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString();

// ── GL Row types ──────────────────────────────────────────────────────────────

interface GLRow {
  name: string;
  code: string;
  yearly: number | null;
  monthly: number | null;
  ytd: number;
  mtd: number;
  bill: number;
  children?: GLRow[];
}

// ── Data sets ──────────────────────────────────────────────────────────────────

const D: Record<string, GLRow[]> = {
  v2m: [
    { name: 'Repairs & Maintenance - Operational', code: '54200', yearly: 9600, monthly: 800, ytd: 9100, mtd: 1300, bill: 1300, children: [
      { name: 'Plumbing Repairs', code: '54210', yearly: 4800, monthly: 400, ytd: 4100, mtd: 900, bill: 800 },
    ]},
    { name: 'Trash Removal - Operational', code: '55400', yearly: null, monthly: null, ytd: 740, mtd: 740, bill: 1200 },
    { name: 'Common Area Maintenance - Operational', code: '57100', yearly: 9000, monthly: 750, ytd: 8100, mtd: 620, bill: 800 },
  ],
  v2o: [
    { name: 'Landscaping - Operational', code: '15600', yearly: 18000, monthly: 1500, ytd: 2900, mtd: 150, bill: 1200 },
    { name: 'Pool - Operational', code: '15660', yearly: 6000, monthly: 500, ytd: 4400, mtd: 50, bill: 400 },
    { name: 'Common Area Maintenance - Operational', code: '57100', yearly: 8000, monthly: 667, ytd: 4700, mtd: 30, bill: 600 },
  ],
  v2r: [
    { name: 'Common Area Maintenance - Operational', code: '57100', yearly: 7000, monthly: 583, ytd: 4900, mtd: 60, bill: 400 },
  ],
  v3o: [
    { name: 'Landscaping - Operational', code: '15600', yearly: 18000, monthly: 1500, ytd: 2800, mtd: 300, bill: 900 },
    { name: 'Pool - Operational', code: '15660', yearly: 6000, monthly: 500, ytd: 2000, mtd: 50, bill: 300 },
    { name: 'Common Area Maintenance - Operational', code: '57100', yearly: 8000, monthly: 667, ytd: 2900, mtd: 80, bill: 450 },
  ],
  v3m: [
    { name: 'Repairs & Maintenance - Operational', code: '54200', yearly: 9600, monthly: 800, ytd: 3900, mtd: 50, bill: 600 },
    { name: 'Trash Removal - Operational', code: '55400', yearly: 6000, monthly: 500, ytd: 2600, mtd: 50, bill: 350 },
  ],
  v3r: [
    { name: 'Common Area Maintenance - Operational', code: '57100', yearly: 7000, monthly: 583, ytd: 2800, mtd: 80, bill: 380 },
  ],
  v4o: [
    { name: 'Repairs & Maintenance - Operational', code: '54200', yearly: 9600, monthly: 800, ytd: 9100, mtd: 1300, bill: 1300 },
    { name: 'Landscaping - Operational', code: '15600', yearly: 18000, monthly: 1500, ytd: 3200, mtd: 480, bill: 1200 },
  ],
};

// ── Modal state type ───────────────────────────────────────────────────────────

interface ModalData {
  name: string;
  key: string;
  monthly: number;
}

// ── CalcTooltip component ─────────────────────────────────────────────────────

interface CalcTooltipProps {
  mtd: number;
  bill: number;
  monthly: number | null;
  ytd: number;
  yearly: number | null;
}

function CalcTooltipContent({ mtd, bill, monthly, ytd, yearly }: CalcTooltipProps) {
  const afterMtd = mtd + bill;
  const afterYtd = ytd + bill;
  const variance = monthly ? afterMtd - monthly : null;
  const ytdVariance = yearly ? afterYtd - yearly : null;

  const Row = ({ label, val, bold, color }: { label: string; val: string; bold?: boolean; color?: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
      <span style={{ color: '#8C8C8C' }}>{label}</span>
      <span style={{ fontWeight: bold ? 500 : undefined, color: color || undefined }}>{val}</span>
    </div>
  );
  const Divider = () => <div style={{ borderTop: '1px solid #D9D9D9', margin: '4px 0' }} />;

  return (
    <div style={{
      position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
      background: '#fff', border: '1px solid #D9D9D9', fontSize: 11, lineHeight: 2,
      padding: '8px 12px', borderRadius: 6, whiteSpace: 'nowrap', zIndex: 9999,
      pointerEvents: 'none', boxShadow: '0px 9px 16px -6px rgba(0,0,0,0.3)',
    }}>
      <Row label={`${CUR_MO} spend`} val={fmt(mtd)} />
      <Row label="This invoice" val={'+' + fmt(bill)} />
      <Divider />
      <Row label="After approval MTD" val={fmt(afterMtd)} bold />
      {monthly && <Row label={`${CUR_MO} budget`} val={fmt(monthly)} />}
      {variance !== null && (
        <>
          <Divider />
          <Row
            label={variance > 0 ? 'Over budget' : 'Remaining'}
            val={(variance > 0 ? '+' : '') + fmt(Math.abs(variance))}
            bold
            color={variance > 0 ? '#b30000' : '#278b4d'}
          />
        </>
      )}
      {yearly && (
        <>
          <Divider />
          <Row label="YTD spend" val={fmt(ytd)} />
          <Row label="This invoice" val={'+' + fmt(bill)} />
          <Divider />
          <Row label="After approval YTD" val={fmt(afterYtd)} bold />
          <Row label="Yearly budget" val={fmt(yearly)} />
          <Divider />
          <Row
            label={ytdVariance! > 0 ? 'Over YTD' : 'Left in YTD'}
            val={(ytdVariance! > 0 ? '+' : '') + fmt(Math.abs(ytdVariance!))}
            bold
            color={ytdVariance! > 0 ? '#b30000' : '#278b4d'}
          />
        </>
      )}
      <div style={{ position: 'absolute', top: '100%', right: 12, border: '5px solid transparent', borderTopColor: '#D9D9D9' }} />
    </div>
  );
}

// ── AfterApprovalCell ─────────────────────────────────────────────────────────

function AfterApprovalCell({ r, size = 12 }: { r: GLRow; size?: number }) {
  const [hovered, setHovered] = useState(false);
  const afterMtd = r.mtd + r.bill;
  const afterYtd = r.ytd + r.bill;

  if (!r.monthly) {
    return (
      <span>
        <span style={{ fontSize: size, color: '#8C8C8C' }}>{fmt(afterMtd)} MTD</span>
        <br />
        <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(afterYtd)} YTD</span>
      </span>
    );
  }

  const variance = afterMtd - r.monthly;
  const isOver = variance > 0;
  const ac = isOver ? '#b30000' : (variance > -r.monthly * 0.15 ? '#9e3d15' : '#278b4d');
  const pct = Math.round(Math.abs(variance) / r.monthly * 100);
  const label = isOver
    ? `+${fmt(variance)} over (${pct}%)`
    : `${fmt(Math.abs(variance))} remaining (${pct}%)`;
  const ytdVariance = r.yearly ? afterYtd - r.yearly : null;
  const ytdLabel = ytdVariance !== null
    ? (ytdVariance > 0 ? `+${fmt(ytdVariance)} over YTD` : `${fmt(Math.abs(ytdVariance))} left YTD`)
    : null;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <CalcTooltipContent
          mtd={r.mtd} bill={r.bill} monthly={r.monthly} ytd={r.ytd} yearly={r.yearly}
        />
      )}
      <span style={{ fontWeight: 400, color: ac, fontSize: size }}>{label}</span>
      <br />
      {ytdLabel
        ? <span style={{ fontSize: 10, color: '#8C8C8C' }}>{ytdLabel}</span>
        : <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(afterYtd)} YTD</span>
      }
    </div>
  );
}

// ── BudgetCell ────────────────────────────────────────────────────────────────

function BudgetCell({ r, onOpenModal }: { r: GLRow; onOpenModal: (data: ModalData) => void }) {
  if (!r.monthly) {
    return <span style={{ fontSize: 13, color: '#8C8C8C' }}>No budget</span>;
  }
  const ytdBudget = fmt(r.monthly * CUR_MO_NUM);
  return (
    <span>
      <span
        onClick={() => onOpenModal({ name: r.name, key: r.code, monthly: r.monthly! })}
        style={{ cursor: 'pointer', color: '#3712a0', fontSize: 13, textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 2 }}
      >
        {fmt(r.monthly)}
      </span>
      <span style={{ fontSize: 10, color: '#8C8C8C', marginLeft: 3 }}>{CUR_MO}</span>
      <br />
      <span style={{ fontSize: 10, color: '#8C8C8C' }}>{ytdBudget} YTD</span>
    </span>
  );
}

// ── GLChildRow ────────────────────────────────────────────────────────────────

function GLChildRowComponent({ r, sep, onOpenModal }: { r: GLRow; sep: boolean; onOpenModal: (data: ModalData) => void }) {
  const bs = sep ? '1px solid #D9D9D9' : 'none';
  return (
    <tr>
      <td style={{ textAlign: 'left', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ color: '#BFBFBF', fontSize: 13 }}>└</span>
          <div>
            <a
              href={`gl_account.html?code=${r.code}&name=${encodeURIComponent(r.name)}`}
              style={{ fontSize: 13, color: '#3712a0', textDecoration: 'none' }}
            >
              {r.name}
            </a>
            <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 3 }}>+{fmt(r.bill)} from this PO</div>
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'right', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
        <BudgetCell r={r} onOpenModal={onOpenModal} />
      </td>
      <td style={{ textAlign: 'right', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
        <AfterApprovalCell r={r} size={12} />
      </td>
    </tr>
  );
}

// ── GLRow ─────────────────────────────────────────────────────────────────────

function GLRowComponent({ r, last, onOpenModal }: { r: GLRow; last: boolean; onOpenModal: (data: ModalData) => void }) {
  const hasKids = r.children && r.children.length > 0;
  const bs = !hasKids && !last ? '1px solid #D9D9D9' : 'none';

  return (
    <>
      <tr>
        <td style={{ textAlign: 'left', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
          <div style={{ marginBottom: 2 }}>
            <a
              href={`gl_account.html?code=${r.code}&name=${encodeURIComponent(r.name)}`}
              style={{ fontWeight: 400, fontSize: 13, color: '#3712a0', textDecoration: 'none' }}
            >
              {r.name}
            </a>
          </div>
          <div style={{ fontSize: 11, color: '#8C8C8C' }}>+{fmt(r.bill)} from this PO</div>
        </td>
        <td style={{ textAlign: 'right', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
          <BudgetCell r={r} onOpenModal={onOpenModal} />
        </td>
        <td style={{ textAlign: 'right', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom: bs }}>
          <AfterApprovalCell r={r} size={13} />
        </td>
      </tr>
      {hasKids && r.children!.map((c, ci) => (
        <GLChildRowComponent
          key={ci}
          r={c}
          sep={ci === r.children!.length - 1 && !last}
          onOpenModal={onOpenModal}
        />
      ))}
    </>
  );
}

// ── PropertyBar ───────────────────────────────────────────────────────────────

function PropertyBar({ gls }: { gls: GLRow[] }) {
  const [hovered, setHovered] = useState(false);
  const b = gls.filter(r => r.monthly);
  if (!b.length) return null;

  const totalMonthly = b.reduce((s, r) => s + r.monthly!, 0);
  const totalYearly = gls.filter(r => r.yearly).reduce((s, r) => s + r.yearly!, 0);
  const totalMtd = b.reduce((s, r) => s + r.mtd, 0);
  const totalYtd = b.reduce((s, r) => s + r.ytd, 0);
  const totalBill = b.reduce((s, r) => s + r.bill, 0);
  const totalAfter = totalMtd + totalBill;
  const totalYtdAfter = totalYtd + totalBill;
  const isOver = totalAfter > totalMonthly;
  const isYtdOver = !!(totalYearly && totalYtdAfter > totalYearly);
  const rem = totalMonthly - totalAfter;
  const overAmt = Math.max(0, -rem);
  const pct = Math.round(Math.abs(totalAfter - totalMonthly) / totalMonthly * 100);
  const lc = isOver ? '#b30000' : (rem < totalMonthly * 0.15 ? '#9e3d15' : '#278b4d');
  const label = isOver
    ? `${fmt(overAmt)} over ${CUR_MO} after approval (${pct}%)`
    : `${fmt(rem)} left after approval (${pct}% under)`;
  const ytdOverAmt = totalYearly ? Math.abs(totalYtdAfter - totalYearly) : null;
  const ytdLabel = ytdOverAmt !== null
    ? (isYtdOver
        ? `${fmt(ytdOverAmt)} over YTD budget after approval`
        : `${fmt(ytdOverAmt)} left in YTD budget after approval`)
    : null;

  const maxVal = isOver ? totalAfter / 0.85 : totalMonthly;
  const budgetPct = (totalMonthly / maxVal * 100).toFixed(1);
  const mtdPct = (totalMtd / maxVal * 100).toFixed(1);
  const billWithin = Math.max(0, Math.min(totalBill, totalMonthly - totalMtd));
  const billWithinPct = (billWithin / maxVal * 100).toFixed(1);
  const billOverPct = isOver ? ((totalAfter - totalMonthly) / maxVal * 100).toFixed(1) : '0';

  return (
    <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #D9D9D9' }}>
      <span style={{ fontSize: 13, fontWeight: 400, color: lc }}>{label}</span>
      {ytdLabel && <><br /><span style={{ fontSize: 11, color: '#8C8C8C' }}>{ytdLabel}</span></>}
      <div
        style={{ position: 'relative', height: 8, marginTop: 10, cursor: 'default' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <div style={{
            display: 'block', position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
            transform: 'translateX(-50%)', background: '#fff', border: '1px solid #D9D9D9',
            fontSize: 11, lineHeight: 1.9, padding: '9px 12px', borderRadius: 6,
            whiteSpace: 'nowrap', zIndex: 9999, pointerEvents: 'none',
            boxShadow: '0px 9px 16px -6px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
              <span style={{ color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#D9D9D9' }} />
                {CUR_MO} budget
              </span>
              <span style={{ fontWeight: 500 }}>{fmt(totalMonthly)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
              <span style={{ color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: '#262626' }} />
                {CUR_MO} actual
              </span>
              <span style={{ fontWeight: 500 }}>{fmt(totalMtd)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
              <span style={{ color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: isOver ? '#b30000' : '#a78df3' }} />
                This invoice
              </span>
              <span style={{ fontWeight: 500 }}>{fmt(totalBill)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, borderTop: '1px solid #D9D9D9', marginTop: 4, paddingTop: 4 }}>
              <span style={{ color: '#8C8C8C', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: lc }} />
                After approval
              </span>
              <span style={{ fontWeight: 600, color: lc }}>{fmt(totalAfter)}</span>
            </div>
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', border: '5px solid transparent', borderTopColor: '#D9D9D9' }} />
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: '#EFEFEF', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: mtdPct + '%', background: '#262626' }} />
          <div style={{ position: 'absolute', left: mtdPct + '%', top: 0, height: '100%', width: billWithinPct + '%', background: '#a78df3' }} />
          {isOver && (
            <div style={{ position: 'absolute', left: budgetPct + '%', top: 0, height: '100%', width: billOverPct + '%', background: '#b30000' }} />
          )}
        </div>
        <div style={{ position: 'absolute', left: budgetPct + '%', top: -3, width: 2, height: 14, background: '#fff', borderRadius: 1, zIndex: 2, boxShadow: '0 0 0 1px #BFBFBF' }} />
      </div>
    </div>
  );
}

// ── BuildingCard ──────────────────────────────────────────────────────────────

type SummaryMode = 'bar' | 'total';

interface BuildingCardProps {
  name: string;
  badge: React.ReactNode;
  gls: GLRow[];
  collapsed?: boolean;
  summary?: SummaryMode;
  onOpenModal: (data: ModalData) => void;
}

function BuildingCard({ name, badge, gls, collapsed: initCollapsed = false, summary = 'bar', onOpenModal }: BuildingCardProps) {
  const [collapsed, setCollapsed] = useState(initCollapsed);

  const budgeted = gls.filter(r => r.monthly);
  const totMtdPre = budgeted.reduce((s, r) => s + r.mtd, 0);
  const totBill = budgeted.reduce((s, r) => s + r.bill, 0);
  const totYtdPre = budgeted.reduce((s, r) => s + r.ytd, 0);
  const totMtd = totMtdPre + totBill;
  const totYtd = totYtdPre + totBill;
  const totMonthly = budgeted.reduce((s, r) => s + r.monthly!, 0);
  const totYtdBudget = totMonthly * CUR_MO_NUM;
  const totYearly = gls.filter(r => r.yearly).reduce((s, r) => s + r.yearly!, 0);
  const totVariance = totMonthly ? totMtd - totMonthly : null;
  const totIsOver = totVariance !== null && totVariance > 0;
  const tc = totVariance === null ? '#8C8C8C' : (totIsOver ? '#b30000' : (totVariance > -totMonthly * 0.15 ? '#9e3d15' : '#278b4d'));
  const totPct = totMonthly ? Math.round(Math.abs(totVariance!) / totMonthly * 100) : 0;
  const totLabel = totVariance !== null
    ? (totIsOver ? `+${fmt(totVariance)} over (${totPct}%)` : `${fmt(Math.abs(totVariance))} remaining (${totPct}%)`)
    : null;
  const totYtdVariance = totYearly ? totYtd - totYearly : null;
  const totYtdLabel = totYtdVariance !== null
    ? (totYtdVariance > 0 ? `+${fmt(totYtdVariance)} over YTD` : `${fmt(Math.abs(totYtdVariance))} left YTD`)
    : null;

  const showTotal = summary === 'total' && gls.length > 1;

  const TotBudgetCell = () => {
    if (!totMonthly) return <span style={{ fontSize: 13, color: '#8C8C8C' }}>—</span>;
    return (
      <>
        <span style={{ fontSize: 13, color: '#262626' }}>{fmt(totMonthly)}</span>
        <span style={{ fontSize: 10, color: '#8C8C8C', marginLeft: 3 }}>{CUR_MO}</span>
        <br />
        <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(totYtdBudget)} YTD</span>
      </>
    );
  };

  const TotAfterCell = () => {
    const [hov, setHov] = useState(false);
    if (!totLabel) {
      return (
        <>
          <span style={{ fontSize: 13, color: '#8C8C8C' }}>{fmt(totMtd)} MTD</span>
          <br />
          <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(totYtd)} YTD</span>
        </>
      );
    }
    return (
      <div
        style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {hov && (
          <CalcTooltipContent
            mtd={totMtdPre} bill={totBill} monthly={totMonthly || null} ytd={totYtdPre} yearly={totYearly || null}
          />
        )}
        <span style={{ fontSize: 13, color: tc }}>{totLabel}</span>
        <br />
        <span style={{ fontSize: 10, color: '#8C8C8C' }}>{totYtdLabel || fmt(totYtd) + ' YTD'}</span>
      </div>
    );
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 10, overflow: 'visible', marginBottom: 8 }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', userSelect: 'none', borderBottom: collapsed ? 'none' : '1px solid #D9D9D9',
          borderRadius: collapsed ? 10 : '10px 10px 0 0',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
        onMouseLeave={e => (e.currentTarget.style.background = '')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transition: 'transform 0.2s', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
          >
            <path d="M3 5l4 4 4-4" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>{name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{badge}</div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div style={{ padding: 14 }}>
          {summary === 'bar' && <PropertyBar gls={gls} />}
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', overflow: 'visible' }}>
            <colgroup>
              <col style={{ width: '36%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '42%' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>Category</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>Budget</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>After approval</th>
              </tr>
            </thead>
            <tbody>
              {showTotal && (
                <tr style={{ background: '#FAFAFA' }}>
                  <td style={{ padding: 8, borderBottom: '1px solid #D9D9D9', fontSize: 11, fontWeight: 500, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total</td>
                  <td style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #D9D9D9' }}><TotBudgetCell /></td>
                  <td style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #D9D9D9' }}><TotAfterCell /></td>
                </tr>
              )}
              {gls.map((r, i) => (
                <GLRowComponent key={i} r={r} last={i === gls.length - 1} onOpenModal={onOpenModal} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Badge components ──────────────────────────────────────────────────────────

const BadgeDanger = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap', background: '#ffe2e2', color: '#b30000' }}>
    Over budget
  </span>
);
const BadgeWarning = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap', background: '#ffebe1', color: '#9e3d15' }}>
    Near limit
  </span>
);
const BadgeSuccess = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap', background: '#e3fcec', color: '#278b4d' }}>
    Within budget
  </span>
);

// ── BottomBar ─────────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 560, right: 0,
      background: '#fff', borderTop: '1px solid #D9D9D9',
      padding: '12px 24px', display: 'flex', gap: 10, justifyContent: 'flex-end', zIndex: 100,
    }}>
      <button style={{ padding: '9px 18px', border: '1px solid #b30000', borderRadius: 6, background: '#fff', color: '#b30000', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        Reject
      </button>
      <button style={{ padding: '9px 18px', border: '1px solid #cabafc', borderRadius: 6, background: '#fff', color: '#4719cd', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        Request changes
      </button>
      <button style={{ padding: '9px 18px', border: 'none', borderRadius: 6, background: '#4719cd', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        Approve
      </button>
    </div>
  );
}

// ── Banner ────────────────────────────────────────────────────────────────────

function Banner({ msg }: { msg: string }) {
  return (
    <div style={{ background: '#ffebe1', border: '1px solid #fbccb8', borderRadius: 10, padding: '11px 15px', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="7.5" cy="7.5" r="6.75" stroke="#9e3d15" strokeWidth="1.4" />
        <path d="M7.5 4.5v3.5" stroke="#9e3d15" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="7.5" cy="10.25" r=".7" fill="#9e3d15" />
      </svg>
      <span style={{ fontSize: 12, color: '#9e3d15', fontWeight: 500, lineHeight: 1.5 }}>{msg}</span>
    </div>
  );
}

// ── BudgetSection ─────────────────────────────────────────────────────────────

interface BudgetSectionProps {
  cards: React.ReactNode;
  props?: string;
}
function BudgetSection({ cards, props }: BudgetSectionProps) {
  return (
    <div style={{ background: 'none', border: 'none', overflow: 'visible' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 10 }}>
        Budget utilization
        {props && <span style={{ fontSize: 11, fontWeight: 400, color: '#8C8C8C', marginLeft: 6 }}>{props}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{cards}</div>
    </div>
  );
}

// ── POCard ────────────────────────────────────────────────────────────────────

function POCard() {
  const verifiedBadge = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 20, background: '#e3fcec', color: '#278b4d', marginLeft: 6 }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2 2 4-4" stroke="#278b4d" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );

  const cells: [string, React.ReactNode][] = [
    ['Vendor', <><span style={{ fontSize: 12 }}>Valet Living, LLC</span>{verifiedBadge}</>],
    ['PO #', <a href="po_detail.html" style={{ color: '#3712a0', textDecoration: 'none', fontWeight: 500 }}>PO-000077</a>],
    ['Amount', '$1,779.89'],
    ['Created', 'Apr 11, 2026'],
    ['Description', 'March services'],
  ];

  return (
    <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: '1px solid #D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>PO-000077</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'right' }}>$1,779.89</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'space-between', padding: '10px 18px', rowGap: 10 }}>
        {cells.map((c, i) => (
          <div key={i} style={{ paddingBottom: i < 3 ? 10 : 0, borderBottom: i < 3 ? '1px solid #D9D9D9' : 'none', paddingRight: 24 }}>
            <div style={{ fontSize: 10, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3, whiteSpace: 'nowrap' }}>{c[0]}</div>
            <div style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>{c[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ICard ─────────────────────────────────────────────────────────────────────

interface ICardProps {
  num: string;
  vendor: string;
  amt: string;
  date: string;
  po: string | null;
}

function ICard({ num, vendor, amt, date, po }: ICardProps) {
  const cells: [string, React.ReactNode][] = [
    ['PO #', <a href="po_detail.html" style={{ color: '#3712a0', textDecoration: 'none', fontWeight: 500 }}>{num}</a>],
    ['Created', date],
    ['Description', 'March services'],
  ];

  return (
    <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: '1px solid #D9D9D9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{vendor}</div>
          <div style={{ fontSize: 11, color: '#8C8C8C' }}>{date} · Verified vendor</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'right' }}>{amt}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: 'space-between', padding: '10px 18px', rowGap: 10 }}>
        {cells.map((c, i) => (
          <div key={i} style={{ paddingBottom: i < 3 ? 10 : 0, borderBottom: i < 3 ? '1px solid #D9D9D9' : 'none', paddingRight: 24 }}>
            <div style={{ fontSize: 10, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3, whiteSpace: 'nowrap' }}>{c[0]}</div>
            <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{c[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bar Chart Modal ───────────────────────────────────────────────────────────

interface BarChartModalProps {
  data: ModalData | null;
  onClose: () => void;
}

function BarChartModal({ data, onClose }: BarChartModalProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  if (!data) return null;

  const rawData = MH[data.key] || [];
  const rawBudgets = PMB[data.key] || rawData.map(() => data.monthly || 0);
  const units = PU[data.key] || null;
  const chartData = units ? rawData.map((v, i) => v / units[i]) : rawData;
  const budgets = units ? rawBudgets.map((v, i) => v / units[i]) : rawBudgets;
  const avgRaw = rawBudgets.reduce((a, b) => a + b, 0) / rawBudgets.length;
  const avgUnits = units ? units.reduce((a, b) => a + b, 0) / units.length : null;
  const avgLabel = units
    ? `$${(avgRaw / avgUnits!).toFixed(2)}/unit/mo`
    : `$${Math.round(avgRaw).toLocaleString()}/mo`;

  const W = 452, H = 170, bw = 22, gap = 17, lH = 18, cH = H - lH;
  const maxV = Math.max(...chartData, ...budgets) * 1.15;

  const bars = chartData.map((v, i) => {
    const bgt = budgets[i];
    const ov = v > bgt;
    const tbh = Math.max(2, Math.round((v / maxV) * cH));
    const bbh = Math.round((bgt / maxV) * cH);
    const bY = cH - tbh;
    const bdY = cH - bbh;
    const x = i * (bw + gap);
    const spendLbl = units ? `$${v.toFixed(2)}/unit` : fmt(rawData[i]);
    const bgtLbl = units ? `$${bgt.toFixed(2)}/unit budget` : fmt(rawBudgets[i]) + ' budget';
    const tt = ov ? `+$${(v - bgt).toFixed(units ? 2 : 0)} over budget` : `${spendLbl} · ${bgtLbl}`;
    const tw = ov ? 130 : 175;
    const tx = Math.min(Math.max(x - 20, 0), W - tw - 4);
    const tc = ov ? '#b30000' : '#4719cd';
    return { x, bY, bdY, tbh, bbh, ov, tt, tw, tx, tc };
  });

  return (
    <div
      style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 99999, alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', width: 500, position: 'relative', boxShadow: '0px 9px 16px -6px rgba(0,0,0,0.3)' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 16, fontSize: 20, color: '#8C8C8C', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ×
        </button>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 2, paddingRight: 24 }}>{data.name}</div>
        <div style={{ fontSize: 11, color: '#8C8C8C', marginBottom: 14 }}>
          {units ? 'Monthly spend per unit — last 12 months' : 'Monthly spend — last 12 months'}
        </div>
        <div style={{ marginBottom: 6, overflow: 'visible' }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {bars.map((bar, i) => (
              <g key={i}>
                {bar.ov ? (
                  <>
                    <rect x={bar.x} y={bar.bdY} width={bw} height={bar.bbh} fill="#4719cd" rx="0" />
                    <rect x={bar.x} y={bar.bY} width={bw} height={bar.tbh - bar.bbh} fill="#b30000" rx="2" />
                  </>
                ) : (
                  <rect x={bar.x} y={bar.bY} width={bw} height={bar.tbh} fill="#4719cd" rx="2" />
                )}
                <line x1={bar.x - 3} y1={bar.bdY} x2={bar.x + bw + 3} y2={bar.bdY} stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1={bar.x - 2} y1={bar.bdY} x2={bar.x + bw + 2} y2={bar.bdY} stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
                <text x={bar.x + bw / 2} y={H} textAnchor="middle" fontSize="9" fill="#737373" fontFamily="sans-serif">{MONTHS[i]}</text>
                {/* hover hit area */}
                <rect
                  x={bar.x} y={0} width={bw} height={cH}
                  fill="transparent"
                  style={{ cursor: 'default' }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                {hoveredBar === i && (
                  <g>
                    <rect x={bar.tx} y={bar.bY - 32} width={bar.tw} height={22} rx="4" fill="#fff" stroke="#D9D9D9" strokeWidth="1" />
                    <text x={bar.tx + bar.tw / 2} y={bar.bY - 17} textAnchor="middle" fontSize="10" fill={bar.tc} fontFamily="sans-serif" fontWeight="600">{bar.tt}</text>
                  </g>
                )}
              </g>
            ))}
          </svg>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 20, fontSize: 11, color: '#737373', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#4719cd', borderRadius: 2 }} />
              Within budget
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, background: '#b30000', borderRadius: 2 }} />
              Over budget
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="10">
                <line x1="0" y1="5" x2="18" y2="5" stroke="white" strokeWidth="2.5" />
                <line x1="0" y1="5" x2="18" y2="5" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
              </svg>
              Budget limit{units ? ' ($/unit)' : ''}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid #D9D9D9', fontSize: 11 }}>
          <span style={{ color: '#737373' }}>Avg. monthly budget</span>
          <span style={{ fontWeight: 500 }}>{avgLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ── Scene definitions ─────────────────────────────────────────────────────────

type SceneKey = 'po1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7';

interface SceneProps {
  onOpenModal: (data: ModalData) => void;
}

function ScenePO1({ onOpenModal }: SceneProps) {
  return (
    <>
      <POCard />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Maplewood Commons" badge={<BadgeDanger />} gls={D.v2m} collapsed={false} summary="total" onOpenModal={onOpenModal} />
          <BuildingCard name="Oakwood Apartments" badge={<BadgeWarning />} gls={D.v2o} collapsed summary="total" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v2r} collapsed summary="total" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

function SceneV2({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po="PO-4421" />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Maplewood Commons" badge={<BadgeDanger />} gls={D.v2m} collapsed={false} summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Oakwood Apartments" badge={<BadgeWarning />} gls={D.v2o} collapsed summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v2r} collapsed summary="bar" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

function SceneV3({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po="PO-4421" />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Oakwood Apartments" badge={<BadgeSuccess />} gls={D.v3o} collapsed summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Maplewood Commons" badge={<BadgeSuccess />} gls={D.v3m} collapsed summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v3r} collapsed summary="bar" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

function SceneV4({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po="PO-4421" />
      <BudgetSection props="1 property" cards={
        <BuildingCard name="Oakwood Apartments" badge={<BadgeDanger />} gls={D.v4o} collapsed={false} summary="bar" onOpenModal={onOpenModal} />
      } />
      <BottomBar />
    </>
  );
}

function SceneV5({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po={null} />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Maplewood Commons" badge={<BadgeDanger />} gls={D.v2m} collapsed={false} summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Oakwood Apartments" badge={<BadgeWarning />} gls={D.v2o} collapsed summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v2r} collapsed summary="bar" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

function SceneV6({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po="PO-4421" />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Maplewood Commons" badge={<BadgeDanger />} gls={D.v2m} collapsed={false} summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Oakwood Apartments" badge={<BadgeWarning />} gls={D.v2o} collapsed summary="bar" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v2r} collapsed summary="bar" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

function SceneV7({ onOpenModal }: SceneProps) {
  return (
    <>
      <ICard num="PO-000077" vendor="Valet Living, LLC" amt="$1,779.89" date="Apr 11, 2026" po="PO-4421" />
      <BudgetSection props="3 properties" cards={
        <>
          <BuildingCard name="Maplewood Commons" badge={<BadgeDanger />} gls={D.v2m} collapsed={false} summary="total" onOpenModal={onOpenModal} />
          <BuildingCard name="Oakwood Apartments" badge={<BadgeWarning />} gls={D.v2o} collapsed summary="total" onOpenModal={onOpenModal} />
          <BuildingCard name="Riverside Lofts" badge={<BadgeSuccess />} gls={D.v2r} collapsed summary="total" onOpenModal={onOpenModal} />
        </>
      } />
      <BottomBar />
    </>
  );
}

// ── Task Panel ────────────────────────────────────────────────────────────────

function TaskPanel() {
  return (
    <div style={{ width: 340, minWidth: 340, background: '#EFEFEF', borderRight: '1px solid #D9D9D9', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0, overflowY: 'auto', flexShrink: 0 }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', background: '#EFEFEF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#262626' }}>Tasks</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <circle cx="9" cy="9" r="7" stroke="#737373" strokeWidth="1.4" />
              <path d="M9 5v4l2.5 2" stroke="#737373" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ background: '#d99f11', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 12 }}>48+</span>
          </div>
        </div>
        {/* Filters */}
        <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
          Elise A.I. Technologies Corp.
          <span style={{ color: '#8C8C8C', fontSize: 16, marginLeft: 8 }}>×</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', flex: 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8C8C8C' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 4h5M4 6.5h5M4 9h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              All Communities
            </span>
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <div style={{ background: '#fff', border: '1px solid #cabafc', borderRadius: 6, padding: '8px 10px', cursor: 'pointer' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M2 4h10M4 7h6M6 10h2" stroke="#737373" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
          Prospects, Residents, Vendors
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12" style={{ marginLeft: 8, flexShrink: 0 }}>
            <path d="M3 5l3 3 3-3" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
          <span style={{ color: '#8C8C8C' }}>Task Types</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
        <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
          Tung Pham
          <span style={{ color: '#8C8C8C', fontSize: 16, marginLeft: 8 }}>×</span>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#8C8C8C', padding: '8px 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path d="M10 6A4 4 0 112 6M10 6V3M10 6H7" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Refreshed every minute
        </div>
      </div>

      {/* Task items */}
      <TaskItem active meta={['Needs Action', 'Apr 05']} title={<>Review purchase order <span style={{ color: '#b30000', fontSize: 14 }}>⏹</span></>} sub="Westpark Ranch Apartment Homes" />
      <TaskItem meta={['Needs Action', '10:30am']} title={<>Sign Demand Notice <span style={{ color: '#b30000', fontSize: 14 }}>⏹</span></>} sub="SFR Search (Invitation Homes)" />
      <TaskItem meta={['Needs Reply', '03:56pm']} title={<><TaskAvatar>P</TaskAvatar>Ryan 36Zhkcrmjqj…<TaskBadge>Inquiry</TaskBadge></>} sub={<>Stone Crest | Assigned to <em>DK Test</em></>} />
      <TaskItem meta={['Needs Reply', '03:55pm']} title={<><TaskAvatar>P</TaskAvatar>Pat 36Zhk8Nbaka7…<TaskBadge>Inquiry</TaskBadge></>} sub={<>Stone Crest | Assigned to <em>DK Test</em></>} />
      <TaskItem meta={['Needs Reply', '03:51pm']} title={<><TaskAvatar>P</TaskAvatar>Ryan 36Zhklpo2Jc…<TaskBadge>Inquiry</TaskBadge></>} sub={<>Cirrus | Assigned to <em>DK Test</em></>} />
      <TaskItem meta={['Needs Reply', '03:51pm']} title={<><TaskAvatar>P</TaskAvatar>Ryan 36Zhklb8Lr7E…<TaskBadge>Inquiry</TaskBadge></>} sub={<>Cirrus | Assigned to <em>DK Test</em></>} />
      <TaskItem meta={['Needs Reply', '02:49pm']} title={<><TaskAvatar>P</TaskAvatar>Ryan 36Jxij9Waiey…<TaskBadge>Inquiry</TaskBadge></>} sub={<>Cirrus | Assigned to <em>DK Test</em></>} />
    </div>
  );
}

function TaskAvatar({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#EFEFEF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#737373', flexShrink: 0 }}>
      {children}
    </span>
  );
}

function TaskBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 500, padding: '2px 9px', borderRadius: 20, background: '#eee7ff', color: '#3712a0', marginLeft: 6 }}>
      {children}
    </span>
  );
}

interface TaskItemProps {
  active?: boolean;
  meta: [string, string];
  title: React.ReactNode;
  sub: React.ReactNode;
}

function TaskItem({ active, meta, title, sub }: TaskItemProps) {
  return (
    <div style={{ background: active ? '#eee7ff' : '#fff', borderBottom: '1px solid #EFEFEF', padding: '12px 16px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#737373', marginBottom: 4 }}>
        <span>{meta[0]}</span>
        <span>{meta[1]}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: '#737373' }}>{sub}</div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

const SCENE_OPTIONS = [
  { value: 'po1', label: 'PO — Over budget' },
  { value: 'v2',  label: 'Version 2 — Table' },
  { value: 'v3',  label: 'Version 3 — All good' },
  { value: 'v4',  label: 'Version 4 — 1 property' },
  { value: 'v5',  label: 'Version 5 — No PO' },
  { value: 'v6',  label: 'Bar graph' },
  { value: 'v7',  label: 'Total row' },
];

export default function App() {
  const [scene, setScene] = useState<SceneKey>('po1');
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleOpenModal = (data: ModalData) => setModalData(data);
  const handleCloseModal = () => setModalData(null);

  const renderScene = () => {
    const props: SceneProps = { onOpenModal: handleOpenModal };
    switch (scene) {
      case 'po1': return <ScenePO1 {...props} />;
      case 'v2':  return <SceneV2 {...props} />;
      case 'v3':  return <SceneV3 {...props} />;
      case 'v4':  return <SceneV4 {...props} />;
      case 'v5':  return <SceneV5 {...props} />;
      case 'v6':  return <SceneV6 {...props} />;
      case 'v7':  return <SceneV7 {...props} />;
      default:    return <ScenePO1 {...props} />;
    }
  };

  return (
    <div style={{ fontFamily: "'SF Pro',-apple-system,BlinkMacSystemFont,sans-serif", background: '#EFEFEF', color: '#262626', fontSize: 13, letterSpacing: '0.3px', display: 'flex', minHeight: '100vh' }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>

      <Sidebar activeItem="Tasks" />
      <TaskPanel />

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #D9D9D9', padding: '10px 24px', fontSize: 13, fontWeight: 600, color: '#262626', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Review purchase order
          <Select
            value={scene}
            onChange={v => v && setScene(v as SceneKey)}
            data={SCENE_OPTIONS}
            styles={{
              input: { fontSize: 12, fontWeight: 400, color: '#737373', border: '1px solid #D9D9D9', borderRadius: 6, minWidth: 160 },
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px 80px', maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 12, margin: '0 auto', width: '100%' }}>
          {renderScene()}
        </div>
      </div>

      {/* Bar chart modal */}
      {modalData && <BarChartModal data={modalData} onClose={handleCloseModal} />}
    </div>
  );
}
