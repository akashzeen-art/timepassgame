import { recommendedGames } from '../data/games';
import { useGame } from '../context/GameContext';

export default function RecommendedGames() {
  const { openGame } = useGame();
  const [hero, ...rest] = recommendedGames;

  return (
    <div className="mt-2">
      {/* Hero + side scroll layout */}
      <div className="flex gap-3">
        {/* Big hero card */}
        {hero && (
          <div
            className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden glow-ring"
            style={{ width: 160, height: 220 }}
            onClick={() => hero.game_url && openGame(hero.game_url, hero.name, hero.img)}
          >
            <img
              draggable="false"
              src={hero.img}
              alt={hero.name}
              className="w-full h-full object-cover"
            />
            {/* Always-on gradient + name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="inline-block bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-wide">Featured</span>
              <p className="text-white text-xs font-black leading-tight">{hero.name}</p>
            </div>
            {/* Play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}

        {/* Scrollable tall cards */}
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {rest.map((game, i) => (
            <div
              key={`rec-${game.id}-${i}`}
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
              </div>
              <span className="gcard-name">{game.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
