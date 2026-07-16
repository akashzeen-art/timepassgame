const items = [
  '🎮 Traffic Tap Puzzle', '🔥 Cut Grass', '⭐ 2048', '🏆 Color Panic',
  '✨ Helix Jump', '🎯 Plane Shooter', '🧩 Word Search 2', '🌿 Bubble Up',
  '👑 Dunk Hit', '🚀 Space Shooter', '🎲 Bottle Flip', '⚡ Colour Road',
  '🎮 Watermelon Fruit 2048', '🔥 Monster Rush', '⭐ Rise Up', '🏆 Pinball Master',
];

export default function MarqueeTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="mt-4 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(99,102,241,0.06)' }}>
      <div className="flex items-center gap-0 py-2" style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-bold px-4 whitespace-nowrap" style={{ color: 'rgba(165,180,252,0.7)' }}>
            {item}
            <span className="mx-3" style={{ color: 'rgba(99,102,241,0.4)' }}>·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
