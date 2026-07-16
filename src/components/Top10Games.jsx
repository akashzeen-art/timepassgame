import { top10Games } from '../data/games';
import { useGame } from '../context/GameContext';

const rankStyle = (i) => {
  if (i === 0) return 'bg-yellow-400 text-black';
  if (i === 1) return 'bg-slate-300 text-black';
  if (i === 2) return 'bg-amber-600 text-white';
  return 'bg-black/70 text-white border border-white/20';
};

export default function Top10Games() {
  const { openGame } = useGame();
  return (
    <div className="px-4 mt-6" id="top10">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="section-title-bar" />
          <h2 className="section-title">🔥 Top 10 Worldwide</h2>
        </div>
      </div>
      <div className="scroll-row">
        {top10Games.map((game, i) => (
          <div
            key={`top10-${i}`}
            className="gcard gcard-tall"
            onClick={() => game.game_url && openGame(game.game_url, game.name, game.img)}
          >
            <div className="gcard-img-wrap">
              <img draggable="false" src={game.img} alt={game.name} />
              <div className="gcard-overlay">
                <div className="gcard-play">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className={`rank-badge ${rankStyle(i)}`}>{i + 1}</div>
            </div>
            <span className="gcard-name">{game.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
