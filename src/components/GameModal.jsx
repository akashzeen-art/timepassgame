import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

export default function GameModal() {
  const { game, closeGame } = useGame();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [game?.url]);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col" style={{ background: '#000' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 shrink-0" style={{ height: 50, background: '#0c0c1a', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">🎮</span>
          <span className="text-white font-black text-sm truncate">{game.name}</span>
        </div>
        <button
          onClick={() => { closeGame(); setLoaded(false); }}
          className="flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer border-none transition-all"
          style={{ background: 'rgba(239,68,68,0.85)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.85)'}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Close
        </button>
      </div>

      {/* Game iframe */}
      <div className="relative flex-1">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: '#080810' }}>
            <div className="w-12 h-12 rounded-full border-4 animate-spin" style={{ borderColor: 'rgba(99,102,241,0.2)', borderTopColor: '#6366f1' }} />
            <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>Loading {game.name}…</span>
          </div>
        )}
        <iframe
          key={game.url}
          src={game.url}
          title={game.name}
          className="w-full h-full border-none"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
