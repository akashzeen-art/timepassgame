import { useState, useRef } from 'react';
import { GameProvider } from './context/GameContext';
import GameModal from './components/GameModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RecommendedGames from './components/RecommendedGames';
import GameRow from './components/GameRow';
import Top10Games from './components/Top10Games';
import HotRightNow from './components/HotRightNow';
import MoodPicker from './components/MoodPicker';
import MiniLeaderboard from './components/MiniLeaderboard';
import CategoryChips from './components/CategoryChips';
import MarqueeTicker from './components/MarqueeTicker';
import GameOfTheDay from './components/GameOfTheDay';
import RecentlyPlayed from './components/RecentlyPlayed';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import Notification from './components/Notification';
import {
  newReleases, vipGames, allGames,
  brainGames, soothingGames, leaderboardGames,
  quickBreakGames, sportsGames, arcadeGames, actionGames
} from './data/games';

const sections = [
  { id: 'arcade',      emoji: '🕹️', label: 'Arcade',           games: arcadeGames },
  { id: 'action',      emoji: '🎯', label: 'Action',           games: actionGames },
  { id: 'brain',       emoji: '🧩', label: 'Train Your Brain', games: brainGames },
  { id: 'soothing',    emoji: '🌿', label: 'Soothing',         games: soothingGames },
  { id: 'leaderboard', emoji: '🏆', label: 'Leaderboard',      games: leaderboardGames },
  { id: 'quickbreak',  emoji: '☕', label: 'Quick Break',      games: quickBreakGames },
  { id: 'sports',      emoji: '⚽', label: 'Sports',           games: sportsGames },
  { id: 'all',         emoji: '🎮', label: 'All Games',        games: allGames },
];

const PARTICLES = ['🎮','🕹️','⭐','🎯','🏆','🎲','👾','🃏'];

function Hero({ onNav }) {
  return (
    <div className="px-4 pt-5 pb-1">
      <div
        className="relative rounded-2xl overflow-hidden px-5 py-6 hero-shine"
        style={{
          background: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 40%, #1a1040 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'rgba(139,92,246,0.25)', filter: 'blur(48px)' }} />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'rgba(99,102,241,0.2)', filter: 'blur(32px)' }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${8 + i * 12}%`,
              bottom: '0px',
              animationDuration: `${3 + (i % 3)}s`,
              animationDelay: `${i * 0.4}s`,
              fontSize: 16 + (i % 3) * 4,
              opacity: 0.5,
            }}
          >{p}</span>
        ))}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: 'rgba(165,180,252,0.8)' }}>Live · 1,200+ playing now</span>
          </div>
          <h1 className="text-white font-black leading-tight mb-2" style={{ fontSize: 24 }}>
            100+ Free Games<br />
            <span style={{ background: 'linear-gradient(90deg,#a5b4fc,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              No Login. Just Play.
            </span>
          </h1>
          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Instant browser games · Any device · Always free
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNav('featured')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-white text-xs cursor-pointer border-none"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              Play Now
            </button>
            <button
              onClick={() => onNav('top10')}
              className="px-4 py-2 rounded-xl font-black text-xs cursor-pointer border-none"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              🔥 Top 10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ emoji, label }) {
  return (
    <div className="flex items-center gap-2 mb-0.5">
      <div className="section-title-bar" />
      <h2 className="section-title">{emoji} {label}</h2>
    </div>
  );
}

function GradientDivider() {
  return <div className="gradient-divider" />;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      const top = el.offsetTop - 72;
      mainRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <GameProvider>
      <GameModal />
      <div className="flex h-full" style={{ background: '#080810' }}>
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onNav={scrollToSection} />

        <main ref={mainRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <Header onMenuClick={() => setMobileOpen(true)} />
          <Notification />

          <div className="mt-[60px]" style={{ background: '#080810', minHeight: 'calc(100vh - 60px)' }}>

            {/* ── Hero ── */}
            <Hero onNav={scrollToSection} />

{/* ── Category chips ── */}
            <CategoryChips onNav={scrollToSection} />

            {/* ── Marquee ── */}
            <MarqueeTicker />

            {/* ── Recently played (shows after first game) ── */}
            <RecentlyPlayed />

            {/* ── Featured ── */}
            <div id="featured" className="px-4 mt-5">
              <SectionHeader emoji="⭐" label="Featured Games" />
              <RecommendedGames />
            </div>

            {/* ── Game of the Day ── */}
            <GameOfTheDay />

            {/* ── Hot Right Now ── */}
            <HotRightNow />

            <GradientDivider />

            {/* ── Top 10 ── */}
            <Top10Games />

            {/* ── Mood picker ── */}
            <MoodPicker onNav={scrollToSection} />

            <GradientDivider />

            {/* ── New Releases ── */}
            <div id="new" className="px-4 mt-6">
              <SectionHeader emoji="✨" label="New Releases" />
              <GameRow games={newReleases} />
            </div>

            {/* ── VIP ── */}
            <div id="vip" className="px-4 mt-6">
              <SectionHeader emoji="👑" label="VIP Games" />
              <GameRow games={vipGames} />
            </div>

            {/* ── Mini leaderboard ── */}
            <MiniLeaderboard />

            <GradientDivider />

            {/* ── All remaining sections ── */}
            {sections.map(({ id, emoji, label, games }) => (
              <div key={id} id={id} className="px-4 mt-6">
                <SectionHeader emoji={emoji} label={label} />
                <GameRow games={games} />
              </div>
            ))}

            <AboutSection />
            <Footer />
          </div>
        </main>
      </div>
    </GameProvider>
  );
}
