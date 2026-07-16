import { useGame } from '../context/GameContext';
import { recommendedGames, newReleases, leaderboardGames } from '../data/games';

const playCounts = ['2.8M plays', '1.4M plays', '980K plays'];
const badges = [
  { label: '🔥 Trending #1', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { label: '⚡ Hot Today',   bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { label: '✨ Staff Pick',  bg: 'linear-gradient(135deg,#10b981,#059669)' },
];

export default function HotRightNow() {
  const { openGame } = useGame();
  const spotlights = [
    recommendedGames[0],
    leaderboardGames[0],
    newReleases[0],
  ].filter(Boolean);

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="section-title-bar" />
        <h2 className="section-title">🔥 Hot Right Now</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {spotlights.map((game, i) => (
          <div
            key={`hot-${game.id}-${i}`}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ aspectRatio: '3/4' }}
            onClick={() => game.game_url && openGame(game.game_url, game.name, game.img)}
          >
            <img
              draggable="false"
              src={game.img}
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
            {/* Badge */}
            <div className="absolute top-2 left-2 right-2">
              <span className="inline-block text-white text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: badges[i].bg }}>
                {badges[i].label}
              </span>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <p className="text-white font-black leading-tight mb-0.5" style={{ fontSize: 11 }}>{game.name}</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{playCounts[i]}</p>
            </div>
            {/* Play icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.35)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
