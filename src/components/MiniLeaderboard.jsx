import { useGame } from '../context/GameContext';
import { leaderboardGames } from '../data/games';

const fakePlays = ['2.8M', '1.9M', '1.4M', '980K', '760K'];

const rankColor = (i) => {
  if (i === 0) return { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' };
  if (i === 1) return { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.25)', text: '#94a3b8' };
  if (i === 2) return { bg: 'rgba(180,83,9,0.15)', border: 'rgba(180,83,9,0.3)', text: '#f97316' };
  return { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.35)' };
};

export default function MiniLeaderboard() {
  const { openGame } = useGame();
  const top5 = leaderboardGames.slice(0, 5);

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="section-title-bar" />
        <h2 className="section-title">📊 Most Played</h2>
      </div>
      <div className="flex flex-col gap-2">
        {top5.map((game, i) => {
          const rc = rankColor(i);
          return (
            <div
              key={`lb-${game.id}-${i}`}
              onClick={() => game.game_url && openGame(game.game_url, game.name, game.img)}
              className="flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-200 group"
              style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              {/* Rank */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm" style={{ color: rc.text, background: 'rgba(0,0,0,0.3)' }}>
                {i + 1}
              </div>
              {/* Thumbnail */}
              <img draggable="false" src={game.img} alt={game.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate leading-tight">{game.name}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{fakePlays[i]} plays</p>
              </div>
              {/* Play arrow */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(99,102,241,0.3)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
