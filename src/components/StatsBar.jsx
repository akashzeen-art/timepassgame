import { useState, useEffect } from 'react';

const stats = [
  { icon: '🟢', label: 'Playing Now', base: 1240, variance: 80 },
  { icon: '🎮', label: 'Free Games',  base: 147,  variance: 0  },
  { icon: '🔥', label: 'Plays Today', base: 48200, variance: 500 },
];

function useCounter(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return val;
}

function StatItem({ icon, label, base, variance }) {
  const [live, setLive] = useState(base);
  const count = useCounter(live);

  useEffect(() => {
    if (variance === 0) return;
    const id = setInterval(() => {
      setLive(base + Math.floor(Math.random() * variance));
    }, 4000);
    return () => clearInterval(id);
  }, [base, variance]);

  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toString();

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl flex-shrink-0"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {label === 'Playing Now' && (
        <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
      )}
      <span className="text-white font-black text-sm count-anim">{fmt(count)}</span>
      <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="px-4 mt-3">
      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {stats.map(s => <StatItem key={s.label} {...s} />)}
      </div>
    </div>
  );
}
