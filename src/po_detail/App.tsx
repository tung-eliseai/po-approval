import React, { useState } from 'react';
import { Badge } from '@mantine/core';
import { Sidebar } from '../shared/Sidebar';

// ─── Types ───────────────────────────────────────────────────────────────────

interface GlRow {
  name: string;
  code: string;
  yearly: number | null;
  monthly: number | null;
  ytd: number;
  mtd: number;
  bill: number;
  children?: GlRow[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PU: Record<string, number[]> = {
  '54200': [48,48,50,50,50,52,52,52,50,50,50,50],
  '57100_9000': [120,120,122,122,122,124,124,124,122,122,120,120],
  '15600': [85,85,88,88,88,90,90,90,88,88,86,86],
  '15660': [85,85,88,88,88,90,90,90,88,88,86,86],
  '57100_8000': [95,95,98,98,98,100,100,100,98,98,96,96],
  '57100_7000': [60,60,62,62,62,64,64,64,62,62,60,60],
  '55400': [48,48,50,50,50,52,52,52,50,50,50,50],
};

const PMB: Record<string, number[]> = {
  '54200': [750,750,800,800,800,800,850,850,850,800,800,800],
  '57100_9000': [700,700,750,750,750,800,800,800,750,750,750,750],
  '15600': [1200,1200,1400,1500,1500,1500,1000,1000,1100,1100,1300,1300],
  '15660': [400,400,400,500,500,500,450,450,400,400,450,500],
  '57100_8000': [600,600,650,650,700,700,650,650,600,600,600,667],
  '57100_7000': [500,500,550,550,550,550,500,500,500,500,550,583],
  '55400': [740,740,740,740,740,740,740,740,740,740,740,740],
};

const MH: Record<string, number[]> = {
  '54200': [420,610,380,720,850,490,1100,760,930,1050,820,1300],
  '57100_9000': [550,490,620,710,480,590,830,760,620,700,580,800],
  '15600': [900,1100,1350,1500,1200,800,600,700,1100,950,1300,1200],
  '15660': [280,310,420,500,490,450,380,290,320,410,460,650],
  '57100_8000': [380,420,510,490,600,550,480,520,490,530,510,600],
  '57100_7000': [230,280,310,350,290,260,300,320,270,290,310,400],
  '55400': [740,740,740,740,740,740,740,740,740,740,740,740],
};

const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const D: { v2m: GlRow[]; v2o: GlRow[]; v2r: GlRow[] } = {
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
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CUR_MO = new Date().toLocaleString('en-US', { month: 'short' });
const CUR_MO_NUM = new Date().getMonth() + 1;
const fmt = (n: number) => '$' + Math.abs(n).toLocaleString();

// ─── Tooltip content builder (returns JSX) ───────────────────────────────────

interface TooltipProps {
  mtd: number;
  bill: number;
  monthly: number | null;
  ytd: number;
  yearly: number | null;
}

function TooltipContent({ mtd, bill, monthly, ytd, yearly }: TooltipProps) {
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
      display: 'none',
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      right: 0,
      background: '#fff',
      border: '1px solid #D9D9D9',
      fontSize: 11,
      lineHeight: 2,
      padding: '8px 12px',
      borderRadius: 6,
      whiteSpace: 'nowrap',
      zIndex: 9999,
      pointerEvents: 'none',
      boxShadow: '0px 9px 16px -6px rgba(0,0,0,0.3)',
    }}>
      <Row label={`${CUR_MO} spend`} val={fmt(mtd)} />
      <Row label="This invoice" val={`+${fmt(bill)}`} />
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
          <Row label="This invoice" val={`+${fmt(bill)}`} />
          <Divider />
          <Row label="After approval YTD" val={fmt(afterMtd + ytd - mtd)} bold />
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

// ─── After-approval cell ──────────────────────────────────────────────────────

function AfterApprovalCell({ r, size = 12 }: { r: GlRow; size?: number }) {
  const afterMtd = r.mtd + r.bill;
  const afterYtd = r.ytd + r.bill;

  if (!r.monthly) {
    return (
      <div>
        <span style={{ fontSize: size, color: '#8C8C8C' }}>{fmt(afterMtd)} MTD</span>
        <br />
        <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(afterYtd)} YTD</span>
      </div>
    );
  }

  const variance = afterMtd - r.monthly;
  const isOver = variance > 0;
  const ac = isOver ? '#b30000' : variance > -r.monthly * 0.15 ? '#9e3d15' : '#278b4d';
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
      className="tw"
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
    >
      <TooltipContent mtd={r.mtd} bill={r.bill} monthly={r.monthly} ytd={r.ytd} yearly={r.yearly} />
      <span style={{ fontWeight: 400, color: ac, fontSize: size }}>{label}</span>
      <br />
      {ytdLabel
        ? <span style={{ fontSize: 10, color: '#8C8C8C' }}>{ytdLabel}</span>
        : <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(afterYtd)} YTD</span>
      }
    </div>
  );
}

// ─── Budget cell ──────────────────────────────────────────────────────────────

function BudgetCell({ r, onOpenModal }: { r: GlRow; onOpenModal: (name: string, key: string, monthly: number) => void }) {
  if (!r.monthly) {
    return <span style={{ fontSize: 13, color: '#8C8C8C' }}>No budget</span>;
  }
  const ytdBudget = fmt(r.monthly * CUR_MO_NUM);
  return (
    <div>
      <span
        onClick={() => onOpenModal(r.name, r.code, r.monthly!)}
        style={{ cursor: 'pointer', color: '#3712a0', fontSize: 13, textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 2 }}
      >
        {fmt(r.monthly)}
      </span>
      <span style={{ fontSize: 10, color: '#8C8C8C', marginLeft: 3 }}>{CUR_MO}</span>
      <br />
      <span style={{ fontSize: 10, color: '#8C8C8C' }}>{ytdBudget} YTD</span>
    </div>
  );
}

// ─── GL child row ─────────────────────────────────────────────────────────────

function GlChildRowComp({ r, hasSep, onOpenModal }: { r: GlRow; hasSep: boolean; onOpenModal: (name: string, key: string, monthly: number) => void }) {
  const borderBottom = hasSep ? '1px solid #D9D9D9' : undefined;
  return (
    <tr>
      <td style={{ textAlign: 'left', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom }}>
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
      <td style={{ textAlign: 'right', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom }}>
        <BudgetCell r={r} onOpenModal={onOpenModal} />
      </td>
      <td style={{ textAlign: 'right', padding: 8, verticalAlign: 'top', overflow: 'visible', borderBottom }}>
        <AfterApprovalCell r={r} size={12} />
      </td>
    </tr>
  );
}

// ─── GL row ───────────────────────────────────────────────────────────────────

function GlRowComp({ r, isLast, onOpenModal }: { r: GlRow; isLast: boolean; onOpenModal: (name: string, key: string, monthly: number) => void }) {
  const hasKids = r.children && r.children.length > 0;
  const borderBottom = !hasKids && !isLast ? '1px solid #D9D9D9' : undefined;

  return (
    <>
      <tr>
        <td style={{ textAlign: 'left', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom }}>
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
        <td style={{ textAlign: 'right', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom }}>
          <BudgetCell r={r} onOpenModal={onOpenModal} />
        </td>
        <td style={{ textAlign: 'right', padding: '10px 8px', verticalAlign: 'top', overflow: 'visible', borderBottom }}>
          <AfterApprovalCell r={r} size={13} />
        </td>
      </tr>
      {hasKids && r.children!.map((child, ci) => (
        <GlChildRowComp
          key={child.code + ci}
          r={child}
          hasSep={ci === r.children!.length - 1 && !isLast}
          onOpenModal={onOpenModal}
        />
      ))}
    </>
  );
}

// ─── Building card total row ──────────────────────────────────────────────────

function BuildingCardTotalRow({ gls }: { gls: GlRow[] }) {
  const budgeted = gls.filter(r => r.monthly);
  const totMtdPre = budgeted.reduce((s, r) => s + r.mtd, 0);
  const totBill = budgeted.reduce((s, r) => s + r.bill, 0);
  const totYtdPre = budgeted.reduce((s, r) => s + r.ytd, 0);
  const totMtd = totMtdPre + totBill;
  const totYtd = totYtdPre + totBill;
  const totMonthly = budgeted.reduce((s, r) => s + (r.monthly ?? 0), 0);
  const totYtdBudget = totMonthly * CUR_MO_NUM;
  const totYearly = gls.filter(r => r.yearly).reduce((s, r) => s + (r.yearly ?? 0), 0);
  const totVariance = totMonthly ? totMtd - totMonthly : null;
  const totIsOver = totVariance !== null && totVariance > 0;
  const tc = totVariance === null ? '#8C8C8C' : totIsOver ? '#b30000' : totVariance > -totMonthly * 0.15 ? '#9e3d15' : '#278b4d';
  const totPct = totMonthly ? Math.round(Math.abs(totVariance!) / totMonthly * 100) : 0;
  const totLabel = totVariance !== null
    ? (totIsOver ? `+${fmt(totVariance)} over (${totPct}%)` : `${fmt(Math.abs(totVariance))} remaining (${totPct}%)`)
    : null;
  const totYtdVariance = totYearly ? totYtd - totYearly : null;
  const totYtdLabel = totYtdVariance !== null
    ? (totYtdVariance > 0 ? `+${fmt(totYtdVariance)} over YTD` : `${fmt(Math.abs(totYtdVariance))} left YTD`)
    : null;

  const syntheticR: GlRow = { name: '', code: '', yearly: totYearly || null, monthly: totMonthly || null, ytd: totYtdPre, mtd: totMtdPre, bill: totBill };

  const BudgetDisplay = () => totMonthly ? (
    <div>
      <span style={{ fontSize: 13, color: '#262626' }}>{fmt(totMonthly)}</span>
      <span style={{ fontSize: 10, color: '#8C8C8C', marginLeft: 3 }}>{CUR_MO}</span>
      <br />
      <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(totYtdBudget)} YTD</span>
    </div>
  ) : <span style={{ fontSize: 13, color: '#8C8C8C' }}>—</span>;

  const AfterDisplay = () => totLabel ? (
    <div className="tw" style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}>
      <TooltipContent mtd={totMtdPre} bill={totBill} monthly={totMonthly || null} ytd={totYtdPre} yearly={totYearly || null} />
      <span style={{ fontSize: 13, color: tc }}>{totLabel}</span>
      <br />
      <span style={{ fontSize: 10, color: '#8C8C8C' }}>{totYtdLabel || fmt(totYtd) + ' YTD'}</span>
    </div>
  ) : (
    <div>
      <span style={{ fontSize: 13, color: '#8C8C8C' }}>{fmt(totMtd)} MTD</span>
      <br />
      <span style={{ fontSize: 10, color: '#8C8C8C' }}>{fmt(totYtd)} YTD</span>
    </div>
  );

  return (
    <tr style={{ background: '#FAFAFA' }}>
      <td style={{ padding: 8, borderBottom: '1px solid #D9D9D9', fontSize: 11, fontWeight: 500, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total</td>
      <td style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #D9D9D9' }}><BudgetDisplay /></td>
      <td style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #D9D9D9' }}><AfterDisplay /></td>
    </tr>
  );
}

// ─── Building card ────────────────────────────────────────────────────────────

interface BuildingCardProps {
  name: string;
  badgeVariant: 'danger' | 'warning' | 'success';
  gls: GlRow[];
  defaultCollapsed: boolean;
  onOpenModal: (name: string, key: string, monthly: number) => void;
}

function BuildingCard({ name, badgeVariant, gls, defaultCollapsed, onOpenModal }: BuildingCardProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const badgeStyles: Record<string, React.CSSProperties> = {
    danger:  { background: '#ffe2e2', color: '#b30000' },
    warning: { background: '#ffebe1', color: '#9e3d15' },
    success: { background: '#e3fcec', color: '#278b4d' },
  };
  const badgeLabels: Record<string, string> = {
    danger: 'Over budget',
    warning: 'Near limit',
    success: 'Within budget',
  };

  const colWidths = ['36%', '22%', '42%'];

  return (
    <div style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 10, overflow: 'visible', marginBottom: 8 }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          padding: '11px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          borderBottom: '1px solid #D9D9D9',
          borderRadius: collapsed ? 10 : '10px 10px 0 0',
          background: 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transition: 'transform 0.2s', transform: collapsed ? 'rotate(-90deg)' : 'none' }}
          >
            <path d="M3 5l4 4 4-4" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>{name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 11,
            fontWeight: 500,
            padding: '3px 9px',
            borderRadius: 20,
            whiteSpace: 'nowrap',
            ...badgeStyles[badgeVariant],
          }}>
            {badgeLabels[badgeVariant]}
          </span>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div style={{ padding: 14, overflow: 'visible' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', overflow: 'visible' }}>
            <colgroup>
              {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>Category</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>Budget</th>
                <th style={{ textAlign: 'right', borderBottom: '1px solid #D9D9D9', padding: '6px 8px', fontSize: 10, fontWeight: 500, color: '#8C8C8C' }}>After approval</th>
              </tr>
            </thead>
            <tbody>
              {gls.length > 1 && <BuildingCardTotalRow gls={gls} />}
              {gls.map((r, i) => (
                <GlRowComp
                  key={r.code + i}
                  r={r}
                  isLast={i === gls.length - 1}
                  onOpenModal={onOpenModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Bar chart modal ──────────────────────────────────────────────────────────

interface BarChartModalProps {
  name: string;
  glKey: string;
  monthly: number;
  onClose: () => void;
}

function BarChartModal({ name, glKey, monthly, onClose }: BarChartModalProps) {
  const rawData = MH[glKey] || [];
  const rawBudgets = PMB[glKey] || rawData.map(() => monthly);
  const units = PU[glKey] || null;
  const data = units ? rawData.map((v, i) => v / units[i]) : rawData;
  const budgets = units ? rawBudgets.map((v, i) => v / units[i]) : rawBudgets;
  const avgRaw = rawBudgets.reduce((a, b) => a + b, 0) / rawBudgets.length;
  const avgUnits = units ? units.reduce((a, b) => a + b, 0) / units.length : null;
  const avgLabel = units
    ? `$${(avgRaw / avgUnits!).toFixed(2)}/unit/mo`
    : `$${Math.round(avgRaw).toLocaleString()}/mo`;

  const W = 452, H = 170, bw = 22, gap = 17, lH = 18, cH = H - lH;
  const maxV = Math.max(...data, ...budgets) * 1.15;

  const bars: React.ReactNode[] = [];
  const tooltipGroups: React.ReactNode[] = [];

  data.forEach((v, i) => {
    const x = i * (bw + gap);
    const bgt = budgets[i];
    const ov = v > bgt;
    const tbh = Math.max(2, Math.round((v / maxV) * cH));
    const bbh = Math.round((bgt / maxV) * cH);
    const bY = cH - tbh;
    const bdY = cH - bbh;

    if (ov) {
      bars.push(
        <rect key={`b1-${i}`} x={x} y={bdY} width={bw} height={bbh} fill="#4719cd" rx={0} />,
        <rect key={`b2-${i}`} x={x} y={bY} width={bw} height={tbh - bbh} fill="#b30000" rx="2 2 0 0" />,
      );
    } else {
      bars.push(<rect key={`b-${i}`} x={x} y={bY} width={bw} height={tbh} fill="#4719cd" rx={2} />);
    }

    bars.push(
      <line key={`l1-${i}`} x1={x - 3} y1={bdY} x2={x + bw + 3} y2={bdY} stroke="white" strokeWidth={2} strokeLinecap="round" />,
      <line key={`l2-${i}`} x1={x - 2} y1={bdY} x2={x + bw + 2} y2={bdY} stroke="rgba(0,0,0,0.12)" strokeWidth={0.5} />,
      <text key={`t-${i}`} x={x + bw / 2} y={H} textAnchor="middle" fontSize={9} fill="#737373" fontFamily="sans-serif">{MONTHS[i]}</text>,
    );

    const spendLbl = units ? `$${v.toFixed(2)}/unit` : fmt(rawData[i]);
    const bgtLbl = units ? `$${bgt.toFixed(2)}/unit budget` : fmt(rawBudgets[i]) + ' budget';
    const tt = ov ? `+$${(v - bgt).toFixed(units ? 2 : 0)} over budget` : `${spendLbl} · ${bgtLbl}`;
    const tw = ov ? 130 : 175;
    const tx = Math.min(Math.max(x - 20, 0), W - tw - 4);
    const tc = ov ? '#b30000' : '#4719cd';

    tooltipGroups.push(
      <g key={`g-${i}`} className="bh" style={{ cursor: 'default' }}>
        <rect x={x} y={0} width={bw} height={cH} fill="transparent" />
        <g className="bt" style={{ display: 'none' }}>
          <rect x={tx} y={bY - 32} width={tw} height={22} rx={4} fill="#fff" stroke="#D9D9D9" strokeWidth={1} />
          <text x={tx + tw / 2} y={bY - 17} textAnchor="middle" fontSize={10} fill={tc} fontFamily="sans-serif" fontWeight={600}>{tt}</text>
        </g>
      </g>
    );
  });

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', width: 500, position: 'relative', boxShadow: '0px 9px 16px -6px rgba(0,0,0,0.3)' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 16, fontSize: 20, color: '#8C8C8C', background: 'none', border: 'none', cursor: 'pointer' }}
        >×</button>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 2, paddingRight: 24 }}>{name}</div>
        <div style={{ fontSize: 11, color: '#8C8C8C', marginBottom: 14 }}>
          {units ? 'Monthly spend per unit — last 12 months' : 'Monthly spend — last 12 months'}
        </div>
        <div style={{ marginBottom: 6, overflow: 'visible' }}>
          <style>{`.bh:hover .bt { display: block !important; }`}</style>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {bars}
            {tooltipGroups}
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

// ─── Global styles injected once ──────────────────────────────────────────────

const GLOBAL_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'SF Pro',-apple-system,BlinkMacSystemFont,sans-serif;background:#EFEFEF;color:#262626;font-size:13px;letter-spacing:0.3px;display:flex;flex-direction:row;min-height:100vh;}
#root{display:flex;flex-direction:row;min-height:100vh;width:100%;}
.tw:hover>div{display:block!important;}
.ap-tab{padding:12px 14px;font-size:13px;color:#737373;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
.ap-tab:hover{color:#262626;}
.ap-tab.active{color:#4719cd;border-bottom-color:#4719cd;font-weight:500;}
.dtab{padding:10px 16px;font-size:13px;color:#737373;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;}
.dtab:hover{color:#262626;}
.dtab.active{color:#4719cd;border-bottom-color:#4719cd;font-weight:500;}
`;

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [apTab, setApTab] = useState(0);
  const [detailTab, setDetailTab] = useState(0);
  const [modal, setModal] = useState<{ name: string; glKey: string; monthly: number } | null>(null);

  const handleOpenModal = (name: string, glKey: string, monthly: number) => {
    setModal({ name, glKey, monthly });
  };

  const apTabs = ['Purchase Orders', 'Bills', 'Payments', 'Vendors', 'Approvals', 'Settings'];
  const detailTabs = ['Overview', 'Documents', 'History'];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Black sidebar */}
      <Sidebar activeItem="Tasks" />

      {/* AP main wrapper */}
      <div id="ap-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>

        {/* Back nav */}
        <div style={{ background: '#fff', padding: '22px 24px 10px', flexShrink: 0, marginTop: 12 }}>
          <a href="po_approval.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#3712a0', fontSize: 13, textDecoration: 'none' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Purchase Orders
          </a>
        </div>

        {/* Approval banner */}
        <div style={{ padding: '12px 24px', background: '#fff', flexShrink: 0 }}>
          <div style={{ background: '#e5ebff', border: '1px solid #b6c2fe', borderRadius: 10, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#262626' }}>This purchase order is awaiting your approval.</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: '#fff', border: '1.5px solid #b30000', color: '#b30000', padding: '7px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Reject</button>
              <button style={{ background: '#fff', border: '1.5px solid #D9D9D9', color: '#595959', padding: '7px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>Request Changes</button>
              <button style={{ background: '#4719cd', color: '#fff', border: 'none', padding: '7px 18px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Approve</button>
            </div>
          </div>
        </div>

        {/* Invoice chrome: title + detail tabs */}
        <div style={{ background: '#fff', borderBottom: '1px solid #D9D9D9', padding: '20px 24px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#262626', marginBottom: 8 }}>PO-000077</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#595959', flexWrap: 'wrap' }}>
                <span style={{ background: '#ffebe1', color: '#9e3d15', display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 500, padding: '3px 9px', borderRadius: 20 }}>
                  Pending Approval
                </span>
                <span style={{ color: '#BFBFBF' }}>·</span>
                <span>Valet Living, LLC</span>
                <span style={{ color: '#BFBFBF' }}>·</span>
                <span style={{ fontWeight: 600 }}>$1,779.89</span>
              </div>
            </div>
            <button style={{ background: '#fff', border: '1px solid #D9D9D9', borderRadius: 6, padding: '5px 11px', cursor: 'pointer', fontSize: 18, color: '#595959', lineHeight: 1, letterSpacing: 1 }}>···</button>
          </div>

          {/* Detail tabs */}
          <div style={{ display: 'flex' }}>
            {detailTabs.map((tab, i) => (
              <div
                key={tab}
                className={`dtab${detailTab === i ? ' active' : ''}`}
                onClick={() => setDetailTab(i)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Two-column body */}
        <div style={{ display: 'flex', gap: 20, padding: 24, alignItems: 'flex-start', flex: 1 }}>

          {/* Left / main column */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* PO Details section */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 10 }}>PO Details</div>
              <div style={{ border: '1px solid #D9D9D9', borderRadius: 10, background: '#fff', padding: '18px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px 20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Property</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>Maplewood Commons, Oakwood Apartments, Riverside Lofts</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Vendor</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>
                      <a href="#" style={{ color: '#3712a0', textDecoration: 'none' }}>Valet Living, LLC</a>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Issue Date</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>Feb 21, 2026</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Expected Delivery</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>Mar 1, 2026</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Unit #</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>204B</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Created By</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>AnnMarie Schuler</div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Requires Approval From</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>Trey Lopez</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: 11, color: '#737373', fontWeight: 400, marginBottom: 4 }}>Description</label>
                    <div style={{ fontSize: 13, color: '#262626' }}>March services</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items section */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Line Items
                <span style={{ fontSize: 12, fontWeight: 400, color: '#8C8C8C' }}>3 properties · 4 accounts</span>
              </div>
              <div style={{ border: '1px solid #D9D9D9', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '28%', fontSize: 12, fontWeight: 400, color: '#737373', padding: '9px 14px', borderBottom: '1px solid #D9D9D9', textAlign: 'left', background: '#fff' }}>Property</th>
                      <th style={{ width: '38%', fontSize: 12, fontWeight: 400, color: '#737373', padding: '9px 14px', borderBottom: '1px solid #D9D9D9', textAlign: 'left', background: '#fff' }}>GL account</th>
                      <th style={{ width: '34%', fontSize: 12, fontWeight: 400, color: '#737373', padding: '9px 14px', borderBottom: '1px solid #D9D9D9', textAlign: 'right', background: '#fff' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={2} style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <span style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>Maplewood Commons</span>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <a href="gl_account.html?code=54200&name=Repairs+%26+Maintenance+-+Operational" style={{ color: '#3712a0', textDecoration: 'none' }}>Repairs &amp; Maintenance – Operational</a>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626', textAlign: 'right', fontWeight: 500 }}>$1,300.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <a href="gl_account.html?code=55400&name=Trash+Removal+-+Operational" style={{ color: '#3712a0', textDecoration: 'none' }}>Trash Removal – Operational</a>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626', textAlign: 'right', fontWeight: 500 }}>$800.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <span style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>Oakwood Apartments</span>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <a href="gl_account.html?code=15600&name=Landscaping+-+Operational" style={{ color: '#3712a0', textDecoration: 'none' }}>Landscaping – Operational</a>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626', textAlign: 'right', fontWeight: 500 }}>$1,200.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <span style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>Riverside Lofts</span>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626' }}>
                        <a href="gl_account.html?code=57100&name=Common+Area+Maintenance+-+Operational" style={{ color: '#3712a0', textDecoration: 'none' }}>Common Area Maintenance – Operational</a>
                      </td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #D9D9D9', fontSize: 13, verticalAlign: 'middle', color: '#262626', textAlign: 'right', fontWeight: 500 }}>$1,050.00</td>
                    </tr>
                    {/* Total row */}
                    <tr style={{ background: '#FAFAFA', fontWeight: 600 }}>
                      <td colSpan={2} style={{ padding: '11px 14px', fontSize: 13, color: '#262626' }}>Total</td>
                      <td style={{ padding: '11px 14px', fontSize: 13, color: '#262626', textAlign: 'right' }}>$1,779.89</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>{/* /main-col */}

          {/* Right sidebar column */}
          <div style={{ width: 462, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Linked Bills */}
            <div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>Linked Bills</div>
              </div>
              <div style={{ border: '1px solid #D9D9D9', borderRadius: 10, background: '#fff', padding: '8px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: 13 }}>
                  <div>
                    <a href="#" style={{ color: '#3712a0', textDecoration: 'none', fontWeight: 500 }}>INV-008821</a>
                    <div style={{ fontSize: 12, color: '#737373', marginTop: 2 }}>$1,779.89</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8C8C8C', fontSize: 16, lineHeight: 1, padding: '0 2px' }} title="Unlink bill">×</button>
                </div>
              </div>
            </div>

            {/* Budget utilization */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 10 }}>
                Budget utilization
                <span style={{ fontSize: 11, fontWeight: 400, color: '#8C8C8C', marginLeft: 6 }}>3 properties</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <BuildingCard
                  name="Maplewood Commons"
                  badgeVariant="danger"
                  gls={D.v2m}
                  defaultCollapsed={false}
                  onOpenModal={handleOpenModal}
                />
                <BuildingCard
                  name="Oakwood Apartments"
                  badgeVariant="warning"
                  gls={D.v2o}
                  defaultCollapsed={true}
                  onOpenModal={handleOpenModal}
                />
                <BuildingCard
                  name="Riverside Lofts"
                  badgeVariant="success"
                  gls={D.v2r}
                  defaultCollapsed={true}
                  onOpenModal={handleOpenModal}
                />
              </div>
            </div>

          </div>{/* /side-col */}

        </div>{/* /detail-body */}

      </div>{/* /ap-main */}

      {/* Bar chart modal */}
      {modal && (
        <BarChartModal
          name={modal.name}
          glKey={modal.glKey}
          monthly={modal.monthly}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
