import { useGame } from '../context/GameContext';

export default function RecentlyPlayed() {
  const { openGame, recentGames } = useGame();
  if (!recentGames || recentGames.length === 0) return null;

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="section-title-bar" style={{ background: 'linear-gradient(180deg,#34d399,#10b981)' }} />
        <h2 className="section-title">▶️ Continue Playing</h2>
      </div>
      <div className="scroll-row">
        {recentGames.map((game, i) => (
          <div
            key={i}
            className="gcard"
            onClick={() => game.game_url && openGame(game.game_url, game.name)}
          >
            <div className="gcard-img-wrap" style={{ border: '2px solid rgba(52,211,153,0.3)' }}>
              <img draggable="false" src={game.img} alt={game.name} />
              <div className="gcard-overlay">
                <div className="gcard-play">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              {/* Resume badge */}
              <div className="absolute bottom-0 left-0 right-0 py-1 text-center"
                style={{ background: 'rgba(16,185,129,0.85)', fontSize: 8, fontWeight: 900, color: '#fff', letterSpacing: 0.5 }}>
                RESUME
              </div>
            </div>
            <span className="gcard-name">{game.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
