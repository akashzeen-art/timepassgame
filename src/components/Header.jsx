import { useState, useRef, useEffect } from 'react';
import { allGames } from '../data/games';
import { useGame } from '../context/GameContext';

const LOGO = '/logo/playzonegameslogo.png';

function SearchBox() {
  const { openGame } = useGame();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const results = query.trim().length > 0
    ? allGames.filter(g => g.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  const showDropdown = focused && query.trim().length > 0;

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handlePlay = (game) => {
    if (game.game_url) openGame(game.game_url, game.name);
    setQuery('');
    setFocused(false);
    setMobileOpen(false);
  };

  const clear = () => { setQuery(''); inputRef.current?.focus(); };

  return (
    <div ref={wrapRef} className="relative">

      {/* Mobile: icon → expands inline */}
      <div className="sm:hidden">
        {mobileOpen ? (
          <div className="flex items-center gap-2 rounded-xl px-3 py-1.5"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(99,102,241,0.4)', width: 220 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(165,180,252,0.8)" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="rgba(165,180,252,0.8)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Search games..."
              className="flex-1 bg-transparent text-white text-xs outline-none placeholder-white/30"
            />
            <button
              onClick={() => { setMobileOpen(false); setFocused(false); setQuery(''); }}
              className="text-white/40 hover:text-white text-xs cursor-pointer border-none bg-transparent"
            >✕</button>
          </div>
        ) : (
          <button
            onClick={() => { setMobileOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Desktop: always-visible expanding search bar */}
      <div
        className="hidden sm:flex items-center gap-2 rounded-xl px-3 py-1.5"
        style={{
          background: focused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)',
          border: focused ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
          width: focused ? 280 : 200,
          transition: 'width 0.25s ease, border-color 0.2s, background 0.2s',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke={focused ? 'rgba(165,180,252,0.8)' : 'rgba(255,255,255,0.4)'} strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke={focused ? 'rgba(165,180,252,0.8)' : 'rgba(255,255,255,0.4)'} strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search games..."
          className="flex-1 bg-transparent text-white text-xs outline-none placeholder-white/30 min-w-0"
        />
        {query && (
          <button onClick={clear} className="text-white/30 hover:text-white text-xs cursor-pointer border-none bg-transparent leading-none flex-shrink-0">✕</button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl z-[200]"
          style={{ width: 300, background: '#0f0f22', border: '1px solid rgba(99,102,241,0.25)' }}
        >
          {results.length === 0 ? (
            <div className="px-4 py-5 text-center">
              <p className="text-2xl mb-1">🔍</p>
              <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>No games found for "{query}"</p>
            </div>
          ) : (
            <>
              <div className="px-3 pt-2.5 pb-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'rgba(165,180,252,0.7)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
              </div>
              <div className="py-1 max-h-[320px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                {results.map(game => (
                  <div
                    key={game.id}
                    onClick={() => handlePlay(game)}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer group"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img draggable="false" src={game.img} alt={game.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold truncate">{game.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Tap to play</p>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(99,102,241,0.4)' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header({ onMenuClick }) {
  return (
    <header
      className="fixed top-0 z-[100] left-0 right-0 lg:left-[4rem] h-[60px] flex items-center px-4 gap-3"
      style={{ background: 'rgba(8,8,16,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Mobile: logo */}
      <div className="flex items-center gap-1.5 shrink-0 lg:hidden">
        <img draggable="false" src={LOGO} alt="PlayZone" className="w-7 h-7 object-contain" />
        <span className="text-white font-black text-sm">PlayZone</span>
      </div>

      {/* Search — centered */}
      <div className="flex flex-1 justify-center">
        <SearchBox />
      </div>

      {/* Mobile: hamburger on right */}
      <div className="shrink-0 lg:hidden">
        <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border-none bg-transparent" onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="2" rx="1" fill="rgba(255,255,255,0.8)"/>
            <rect x="3" y="11" width="13" height="2" rx="1" fill="rgba(255,255,255,0.8)"/>
            <rect x="3" y="17" width="18" height="2" rx="1" fill="rgba(255,255,255,0.8)"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
