import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Flame, Calendar, Zap } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import type { Submission } from '../types';

interface ContributionHeatmapProps {
  calendar?: Record<string, number>;
  submissions?: Submission[];
  totalSubmissions?: number;
  bestStreak?: number;
  currentStreak?: number;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function normalizeDateKey(key: string): string {
  if (!key) return '';
  const parts = key.split(/[-/T ]/);
  if (parts.length >= 3) {
    const y = parts[0];
    const m = parts[1].padStart(2, '0');
    const d = parts[2].slice(0, 2).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return key;
}

export default function ContributionHeatmap({
  calendar = {},
  submissions = [],
  totalSubmissions,
  bestStreak,
  currentStreak,
}: ContributionHeatmapProps) {
  const { state } = useAppContext();
  const isLight = state.theme === 'light';
  const scrollRef = useRef<HTMLDivElement>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    dateKey: string;
    formattedDate: string;
    count: number;
  } | null>(null);

  // ── Unified Merged Calendar ──────────────────────────────────────────────
  // Ingests calendar map, submissions array, and active stats to guarantee 100% data sync
  const mergedCalendar = useMemo(() => {
    const merged: Record<string, number> = {};

    // 1. Ingest calendar prop with normalized keys
    if (calendar && typeof calendar === 'object') {
      Object.entries(calendar).forEach(([k, v]) => {
        const norm = normalizeDateKey(k);
        if (norm && typeof v === 'number' && v > 0) {
          merged[norm] = (merged[norm] || 0) + v;
        }
      });
    }

    // 2. Ingest submissions prop
    if (Array.isArray(submissions)) {
      submissions.forEach((sub) => {
        if (sub && sub.timestamp) {
          const d = new Date(sub.timestamp);
          if (!isNaN(d.getTime())) {
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            merged[key] = Math.max(merged[key] || 0, 1);
          }
        }
      });
    }

    // 3. Fallback: If totalSubmissions > 0 but merged calendar is empty, attribute to today
    const total = totalSubmissions || (Array.isArray(submissions) ? submissions.length : 0);
    if (total > 0 && Object.keys(merged).length === 0) {
      const now = new Date();
      const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      merged[todayKey] = total;
    }

    return merged;
  }, [calendar, submissions, totalSubmissions]);

  // ── Calculate Streaks and Stats ──────────────────────────────────────────
  const { calculatedTotal, activeDays, calculatedBestStreak, calculatedCurrentStreak } = useMemo(() => {
    const dates = Object.keys(mergedCalendar)
      .filter((d) => (mergedCalendar[d] || 0) > 0)
      .sort();

    const total = Object.values(mergedCalendar).reduce((sum, count) => sum + (count || 0), 0);
    const active = dates.length;

    if (dates.length === 0) {
      return {
        calculatedTotal: total,
        activeDays: 0,
        calculatedBestStreak: 0,
        calculatedCurrentStreak: 0,
      };
    }

    let best = 1;
    let runLength = 1;

    for (let i = 1; i < dates.length; i++) {
      const [py, pm, pd] = dates[i - 1].split('-').map(Number);
      const [cy, cm, cd] = dates[i].split('-').map(Number);
      const prevMs = new Date(py, pm - 1, pd).getTime();
      const currMs = new Date(cy, cm - 1, cd).getTime();
      const diffDays = Math.round((currMs - prevMs) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        runLength++;
      } else {
        runLength = 1;
      }
      if (runLength > best) best = runLength;
    }

    const lastDateStr = dates[dates.length - 1];
    const [ly, lm, ld] = lastDateStr.split('-').map(Number);
    const lastMs = new Date(ly, lm - 1, ld).getTime();
    const now = new Date();
    const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const daysAgo = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));
    const current = daysAgo <= 1 ? runLength : 0;

    return {
      calculatedTotal: total,
      activeDays: active,
      calculatedBestStreak: best,
      calculatedCurrentStreak: current,
    };
  }, [mergedCalendar]);

  const displayTotal = totalSubmissions !== undefined ? Math.max(totalSubmissions, calculatedTotal) : calculatedTotal;
  const displayBestStreak = bestStreak !== undefined ? Math.max(bestStreak, calculatedBestStreak) : calculatedBestStreak;
  const displayCurrentStreak = currentStreak !== undefined ? Math.max(currentStreak, calculatedCurrentStreak) : calculatedCurrentStreak;
  const displayActiveDays = Math.max(activeDays, displayTotal > 0 ? 1 : 0);

  // ── Build 52-Week Grid Data ──────────────────────────────────────────────
  const { weeks, monthLabels, todayKey } = useMemo(() => {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();
    const todayDow = now.getDay(); // 0 = Sun, 6 = Sat

    const tKey = `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;

    // Target start offset: Sunday 52 weeks ago
    const startOffset = (6 - todayDow) - 363;

    const weeksData: Array<
      Array<{
        dateKey: string;
        formattedDate: string;
        count: number;
        level: number;
        isToday: boolean;
        isFuture: boolean;
      }>
    > = [];

    const monthPositions: Array<{ name: string; weekIndex: number }> = [];
    let lastMonth = -1;

    for (let w = 0; w < 52; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const offset = startOffset + (w * 7 + d);
        const curDate = new Date(todayYear, todayMonth, todayDate + offset);
        const y = curDate.getFullYear();
        const m = curDate.getMonth();
        const dt = curDate.getDate();

        const dateKey = `${y}-${String(m + 1).padStart(2, '0')}-${String(dt).padStart(2, '0')}`;
        const isToday = dateKey === tKey;
        const isFuture = dateKey > tKey;
        const count = isFuture ? 0 : (mergedCalendar[dateKey] || 0);

        let level = 0;
        if (count >= 7) level = 4;
        else if (count >= 4) level = 3;
        else if (count >= 2) level = 2;
        else if (count >= 1) level = 1;

        const formattedDate = curDate.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        weekDays.push({
          dateKey,
          formattedDate,
          count,
          level,
          isToday,
          isFuture,
        });

        // Track month label on Sunday (day 0)
        if (d === 0 && m !== lastMonth) {
          monthPositions.push({ name: MONTH_NAMES[m], weekIndex: w });
          lastMonth = m;
        }
      }
      weeksData.push(weekDays);
    }

    // Filter month labels to avoid crowding
    const filteredMonthLabels: Array<{ name: string; weekIndex: number }> = [];
    for (const pos of monthPositions) {
      if (
        filteredMonthLabels.length === 0 ||
        pos.weekIndex - filteredMonthLabels[filteredMonthLabels.length - 1].weekIndex >= 3
      ) {
        filteredMonthLabels.push(pos);
      }
    }

    return {
      weeks: weeksData,
      monthLabels: filteredMonthLabels,
      todayKey: tKey,
    };
  }, [mergedCalendar]);

  // Ensure view is scrolled to the latest activity on the right
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [mergedCalendar]);

  // Vibrant, high-contrast color mapping for both Dark & Light themes
  const getCellBackground = (level: number, isFuture: boolean) => {
    if (isFuture) return 'transparent';

    if (isLight) {
      switch (level) {
        case 1:
          return '#9be9a8';
        case 2:
          return '#40c463';
        case 3:
          return '#30a14e';
        case 4:
          return '#216e39';
        case 0:
        default:
          return '#ebedf0';
      }
    }

    // Dark Mode
    switch (level) {
      case 1:
        return '#0e4429';
      case 2:
        return '#006d32';
      case 3:
        return '#26a641';
      case 4:
        return '#39d353';
      case 0:
      default:
        return 'rgba(255, 255, 255, 0.06)';
    }
  };

  const getCellBorder = (level: number, isToday: boolean, isFuture: boolean) => {
    if (isFuture) {
      return isLight ? '1px dashed rgba(27, 31, 35, 0.08)' : '1px dashed rgba(255, 255, 255, 0.03)';
    }

    if (isToday) {
      return isLight ? '1.5px solid #0969da' : '1.5px solid #58a6ff';
    }

    if (isLight) {
      switch (level) {
        case 1:
          return '1px solid #7bc96f';
        case 2:
          return '1px solid #30a14e';
        case 3:
          return '1px solid #216e39';
        case 4:
          return '1px solid #144620';
        case 0:
        default:
          return '1px solid rgba(27, 31, 35, 0.08)';
      }
    }

    // Dark Mode
    switch (level) {
      case 1:
        return '1px solid rgba(63, 185, 80, 0.65)';
      case 2:
        return '1px solid rgba(63, 185, 80, 0.88)';
      case 3:
        return '1px solid rgba(63, 185, 80, 1.0)';
      case 4:
        return '1px solid #39d353';
      case 0:
      default:
        return '1px solid rgba(255, 255, 255, 0.08)';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ── Metric Summary Pills ── */}
      <div className="grid grid-cols-3 gap-2">
        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(9, 105, 218, 0.08), rgba(9, 105, 218, 0.02))'
              : 'linear-gradient(135deg, rgba(88, 166, 255, 0.10), rgba(88, 166, 255, 0.03))',
            border: isLight ? '1px solid rgba(9, 105, 218, 0.18)' : '1px solid rgba(88, 166, 255, 0.20)',
          }}
        >
          <div className="flex items-center gap-1 text-xs mb-0.5 text-secondary">
            <Flame size={12} style={{ color: isLight ? '#0969da' : '#58a6ff' }} />
            <span>Submissions</span>
          </div>
          <span className="text-sm font-bold text-primary">{displayTotal}</span>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(31, 136, 61, 0.08), rgba(31, 136, 61, 0.02))'
              : 'linear-gradient(135deg, rgba(63, 185, 80, 0.10), rgba(63, 185, 80, 0.03))',
            border: isLight ? '1px solid rgba(31, 136, 61, 0.18)' : '1px solid rgba(63, 185, 80, 0.20)',
          }}
        >
          <div className="flex items-center gap-1 text-xs mb-0.5 text-secondary">
            <Calendar size={12} style={{ color: isLight ? '#1a7f37' : '#3fb950' }} />
            <span>Active Days</span>
          </div>
          <span className="text-sm font-bold" style={{ color: isLight ? '#1a7f37' : '#3fb950' }}>
            {displayActiveDays}d
          </span>
        </div>

        <div
          className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(207, 74, 34, 0.08), rgba(207, 74, 34, 0.02))'
              : 'linear-gradient(135deg, rgba(253, 140, 115, 0.10), rgba(253, 140, 115, 0.03))',
            border: isLight ? '1px solid rgba(207, 74, 34, 0.18)' : '1px solid rgba(253, 140, 115, 0.20)',
          }}
        >
          <div className="flex items-center gap-1 text-xs mb-0.5 text-secondary">
            <Zap size={12} style={{ color: isLight ? '#cf4a22' : '#fd8c73' }} />
            <span>Max Streak</span>
          </div>
          <span className="text-sm font-bold" style={{ color: isLight ? '#cf4a22' : '#fd8c73' }}>
            {displayBestStreak}d
          </span>
        </div>
      </div>

      {/* ── Heatmap Grid Container ── */}
      <div
        className="p-3 rounded-xl"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div ref={scrollRef} className="overflow-x-auto pb-1.5 heatmap-scrollbar">
          <div style={{ display: 'inline-block', minWidth: 540 }}>
            {/* Month Labels Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '24px repeat(52, 10px)',
                columnGap: '3px',
                height: 14,
                marginBottom: 4,
                alignItems: 'center',
              }}
            >
              <div /> {/* Empty space above day labels */}
              {monthLabels.map((m) => (
                <div
                  key={`${m.name}-${m.weekIndex}`}
                  style={{
                    gridColumnStart: m.weekIndex + 2,
                    fontSize: 9,
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    lineHeight: '1',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.name}
                </div>
              ))}
            </div>

            {/* Main Day Rows + Grid */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {/* Day Labels (Mon, Wed, Fri) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: 'repeat(7, 10px)',
                  rowGap: '3px',
                  width: 20,
                  fontSize: 8,
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  lineHeight: '10px',
                  textAlign: 'right',
                  paddingRight: 2,
                  userSelect: 'none',
                }}
              >
                <div></div>
                <div>Mon</div>
                <div></div>
                <div>Wed</div>
                <div></div>
                <div>Fri</div>
                <div></div>
              </div>

              {/* 52-Week Columns */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(52, 10px)',
                  columnGap: '3px',
                }}
              >
                {weeks.map((week, wIdx) => (
                  <div
                    key={`week-${wIdx}`}
                    style={{
                      display: 'grid',
                      gridTemplateRows: 'repeat(7, 10px)',
                      rowGap: '3px',
                    }}
                  >
                    {week.map((day) => {
                      const bg = getCellBackground(day.level, day.isFuture);
                      const border = getCellBorder(day.level, day.isToday, day.isFuture);

                      const tooltipText = day.isFuture
                        ? `${day.formattedDate}`
                        : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.formattedDate}`;

                      return (
                        <div
                          key={day.dateKey}
                          title={tooltipText}
                          onMouseEnter={() =>
                            setHoveredDay({
                              dateKey: day.dateKey,
                              formattedDate: day.formattedDate,
                              count: day.count,
                            })
                          }
                          onMouseLeave={() => setHoveredDay(null)}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 2,
                            background: bg,
                            border: border,
                            cursor: day.isFuture ? 'default' : 'pointer',
                            transition: 'transform 0.1s ease, filter 0.1s ease',
                            boxShadow: day.isToday
                              ? isLight
                                ? '0 0 0 1.5px rgba(9, 105, 218, 0.45)'
                                : '0 0 0 1.5px rgba(88, 166, 255, 0.5)'
                              : day.level === 4 && !isLight
                              ? '0 0 4px rgba(57, 211, 83, 0.4)'
                              : undefined,
                          }}
                          className="hover:scale-125 transition-transform"
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer: Hover Info & Legend ── */}
        <div
          className="flex items-center justify-between mt-2.5 pt-2"
          style={{ borderTop: '1px solid var(--color-border)', minHeight: 22 }}
        >
          {/* Hover Status */}
          <div className="text-[11px] text-secondary truncate">
            {hoveredDay ? (
              <span>
                <strong className="text-primary font-semibold">
                  {hoveredDay.count} submission{hoveredDay.count !== 1 ? 's' : ''}
                </strong>{' '}
                on {hoveredDay.formattedDate}
              </span>
            ) : (
              <span>
                {displayCurrentStreak > 0
                  ? `🔥 Current streak: ${displayCurrentStreak} day${displayCurrentStreak !== 1 ? 's' : ''}`
                  : '52 weeks of activity'}
              </span>
            )}
          </div>

          {/* GitHub Legend */}
          <div className="flex items-center gap-1.5 shrink-0 select-none">
            <span style={{ fontSize: 9, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: getCellBackground(lvl, false),
                  border: getCellBorder(lvl, false, false),
                }}
              />
            ))}
            <span style={{ fontSize: 9, color: 'var(--color-text-secondary)', fontWeight: 500 }}>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
