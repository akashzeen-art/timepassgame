const chips = [
  { emoji: '🎯', label: 'Action',   id: 'all' },
  { emoji: '🧩', label: 'Puzzle',   id: 'brain' },
  { emoji: '⚽', label: 'Sports',   id: 'sports' },
  { emoji: '🌿', label: 'Soothing', id: 'soothing' },
  { emoji: '☕', label: 'Casual',   id: 'quickbreak' },
  { emoji: '🏆', label: 'Compete',  id: 'leaderboard' },
  { emoji: '✨', label: 'New',      id: 'new' },
  { emoji: '👑', label: 'VIP',      id: 'vip' },
  { emoji: '🔥', label: 'Top 10',   id: 'top10' },
];

export default function CategoryChips({ onNav }) {
  return (
    <div className="px-4 mt-4">
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {chips.map(c => (
          <button
            key={c.label}
            onClick={() => onNav(c.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl cursor-pointer border-none transition-all duration-200 font-bold text-xs"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <span className="text-base leading-none">{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
