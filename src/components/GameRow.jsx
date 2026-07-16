import { useGame } from '../context/GameContext';

export default function GameRow({ games, tall = false }) {
  const { openGame } = useGame();
  return (
    <div className="scroll-row">
      {games.map((game, i) => (
        <div
          key={`${game.id ?? ''}-${i}`}
          className={`gcard ${tall ? 'gcard-tall' : ''}`}
          onClick={() => game.game_url && openGame(game.game_url, game.name, game.img)}
        >
          <div className="gcard-img-wrap">
            <img draggable="false" src={game.img} alt={game.name} />
            <div className="gcard-overlay">
              <div className="gcard-play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {game.isNew && <span className="new-badge">New</span>}
          </div>
          <span className="gcard-name">{game.name}</span>
        </div>
      ))}
    </div>
  );
}
