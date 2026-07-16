import { useState } from 'react';

const LOGO = '/logo/playzonegameslogo.png';

const navItems = [
  { icon: '🏠', label: 'Home',    id: 'featured' },
  { icon: '🔥', label: 'Top 10', id: 'top10' },
  { icon: '✨', label: 'New',     id: 'new' },
  { icon: '🎯', label: 'Action',  id: 'action' },
  { icon: '🕹️', label: 'Arcade',  id: 'arcade' },
  { icon: '🧩', label: 'Puzzle',  id: 'brain' },
  { icon: '⚽', label: 'Sports',  id: 'sports' },
  { icon: '🌿', label: 'Sooth',   id: 'soothing' },
  { icon: '☕', label: 'Break',   id: 'quickbreak' },
  { icon: '🏆', label: 'Leaders', id: 'leaderboard' },
  { icon: '🎮', label: 'All',     id: 'all' },
];

export default function Sidebar({ mobileOpen, onClose, onNav }) {
  const [activeId, setActiveId] = useState('featured');

  const handleNav = (id) => {
    setActiveId(id);
    onNav(id);
    onClose();
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="w-[64px] flex-shrink-0 lg:block hidden z-[1000]">
        <div className="fixed top-0 left-0 w-[64px] h-screen flex flex-col items-center pt-3 pb-4 gap-1 overflow-y-auto"
          style={{ background: '#0c0c1a', borderRight: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}>
          {/* Logo */}
          <button className="mb-2 cursor-pointer border-none bg-transparent p-0" onClick={() => handleNav('featured')}>
            <img draggable="false" src={LOGO} alt="PlayZone" className="w-9 h-9 object-contain" />
          </button>
          <div className="w-8 h-px mb-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          {/* Nav */}
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              title={item.label}
              className="w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl cursor-pointer transition-all duration-200 border-none"
              style={{
                background: activeId === item.id ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: activeId === item.id ? '#a5b4fc' : 'rgba(255,255,255,0.35)',
              }}
              onMouseEnter={e => { if (activeId !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { if (activeId !== item.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[9px] font-bold leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className="lg:hidden">
        {mobileOpen && (
          <div className="fixed inset-0 z-[13]" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
        )}
        <div
          className={`fixed top-0 left-0 h-full z-[14] transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: 230, background: '#0c0c1a', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col h-full pt-5 pb-6 px-3 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-2 mb-5">
              <img draggable="false" src={LOGO} alt="PlayZone" className="w-8 h-8 object-contain" />
              <span className="text-white font-black text-base">PlayZone</span>
            </div>
            <div className="w-full h-px mb-3" style={{ background: 'rgba(255,255,255,0.07)' }} />

            {/* Nav items */}
            <div className="flex flex-col gap-0.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border-none text-left w-full"
                  style={{
                    background: activeId === item.id ? 'rgba(99,102,241,0.18)' : 'transparent',
                    color: activeId === item.id ? '#a5b4fc' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-bold">{item.label}</span>
                  {activeId === item.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Bottom promo */}
            <div className="mt-auto mx-1 p-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-xs font-black text-indigo-300">🎮 100+ Free Games</p>
              <p className="text-white/35 mt-0.5" style={{ fontSize: 10 }}>No login · No downloads</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
