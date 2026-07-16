import { createContext, useContext, useState } from 'react';

const GameContext = createContext({});

export function GameProvider({ children }) {
  const [game, setGame] = useState(null);
  const [recentGames, setRecentGames] = useState([]);

  const openGame = (url, name, img) => {
    const entry = { url, name, img, game_url: url };
    setGame({ url, name });
    setRecentGames(prev => {
      const filtered = prev.filter(g => g.url !== url);
      return [entry, ...filtered].slice(0, 6);
    });
  };

  const closeGame = () => setGame(null);

  return (
    <GameContext.Provider value={{ game, openGame, closeGame, recentGames }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
