const stats = [
  { value: '100+', label: 'Free Games',  icon: '🎮', from: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.2)' },
  { value: '0',    label: 'Downloads',   icon: '⚡', from: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.2)' },
  { value: '∞',    label: 'Play Anytime',icon: '🕹️', from: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.2)' },
];

const cards = [
  { icon: '🎯', title: 'Free Online Games',  text: '100+ free games — no downloads, no logins. Pick and play instantly on any device.', from: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.15)' },
  { icon: '🚀', title: 'Always Fresh',        text: 'From casual puzzles to fast-paced action — new titles drop every week.', from: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.15)' },
  { icon: '🌍', title: 'What is PlayZone?',   text: 'Your go-to destination for free browser games. Play solo, challenge friends, or climb the leaderboard. No installs. Just fun.', from: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)', full: true },
];

export default function AboutSection() {
  return (
    <div className="px-4 pt-8 pb-6 mt-4">
      {/* Divider */}
      <div className="w-full h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(s => (
          <div key={s.label} className="flex flex-col items-center text-center rounded-2xl p-4"
            style={{ background: s.from, border: `1px solid ${s.border}` }}>
            <span className="text-2xl mb-1">{s.icon}</span>
            <span className="text-white font-black text-xl">{s.value}</span>
            <span className="font-semibold mt-0.5 leading-tight" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map(c => (
          <div key={c.title} className={`rounded-2xl p-5 ${c.full ? 'md:col-span-2' : ''}`}
            style={{ background: c.from, border: `1px solid ${c.border}` }}>
            <h3 className="text-white font-black text-sm mb-1.5">{c.icon} {c.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
