const moods = [
  { emoji: '😤', mood: 'Competitive',  desc: 'Beat the leaderboard', id: 'leaderboard', from: '#1e1b4b', to: '#312e81', border: 'rgba(99,102,241,0.3)' },
  { emoji: '😌', mood: 'Relaxed',      desc: 'Chill & unwind',       id: 'soothing',    from: '#052e16', to: '#14532d', border: 'rgba(16,185,129,0.3)' },
  { emoji: '🧠', mood: 'Smart',        desc: 'Train your brain',     id: 'brain',       from: '#1c1917', to: '#292524', border: 'rgba(168,85,247,0.3)' },
  { emoji: '⚡', mood: 'Quick',        desc: '5-min break games',    id: 'quickbreak',  from: '#1c1400', to: '#292000', border: 'rgba(245,158,11,0.3)' },
];

export default function MoodPicker({ onNav }) {
  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="section-title-bar" />
        <h2 className="section-title">🎭 Pick Your Mood</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {moods.map(m => (
          <button
            key={m.mood}
            onClick={() => onNav(m.id)}
            className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer border-none text-left transition-all duration-200 group"
            style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})`, border: `1px solid ${m.border}` }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span className="text-3xl leading-none flex-shrink-0">{m.emoji}</span>
            <div>
              <p className="text-white font-black text-sm leading-tight">{m.mood}</p>
              <p className="mt-0.5 font-semibold" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{m.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
