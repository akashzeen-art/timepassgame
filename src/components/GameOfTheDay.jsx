import { useGame } from '../context/GameContext';
import { allGames } from '../data/games';

const GOTD_INDEX = new Date().getDate() % allGames.length;

const descriptions = [
  'A fast-paced challenge that tests your reflexes and strategy. Can you beat the high score?',
  'Addictive gameplay with simple controls. Perfect for a quick break or a long session.',
  'Beautifully designed levels that get harder as you go. How far can you make it?',
  'A crowd favourite with millions of plays. Jump in and see what the hype is about!',
];

export default function GameOfTheDay() {
  const { openGame } = useGame();
  const game = allGames[GOTD_INDEX];
  const desc = descriptions[GOTD_INDEX % descriptions.length];
  if (!game) return null;

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="section-title-bar" />
        <h2 className="section-title">🌟 Game of the Day</h2>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ background: '#0f0f22', border: '1px solid rgba(99,102,241,0.2)' }}
        onClick={() => game.game_url && openGame(game.game_url, game.name)}
      >
        <div className="flex gap-0">
          {/* Thumbnail */}
          <div className="relative flex-shrink-0" style={{ width: 120, height: 120 }}>
            <img
              draggable="false"
              src={game.img}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #0f0f22)' }} />
          </div>

          {/* Info */}
          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: '#fff' }}>
                  Today's Pick
                </span>
              </div>
              <p className="text-white font-black text-base leading-tight truncate">{game.name}</p>
              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= 4 ? '#fbbf24' : 'rgba(255,255,255,0.2)'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>4.0</span>
              </div>
              <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
            </div>
          </div>
        </div>

        {/* Play button bar */}
        <div className="flex items-center justify-between px-4 py-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(99,102,241,0.08)' }}>
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-black text-white text-xs"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            Play Now
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.4)' }} />
      </div>
    </div>
  );
}
