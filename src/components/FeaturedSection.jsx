import { useRef, useState } from 'react';
import { featuredGames } from '../data/games';

const A = '/assets/';

function FeaturedCard({ game }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-[240px] h-[300px] overflow-hidden rounded-xl bg-black duration-500 hover:shadow-lg hover:brightness-110">
        <img
          draggable="false"
          src={game.img}
          alt="Highlight"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-xl ${playing ? 'hidden' : ''}`}
        />
        <video
          ref={videoRef}
          src={game.video}
          playsInline
          muted
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-xl ${playing ? '' : 'hidden'}`}
        />
        <div>
          <div className="text-white absolute bottom-10 w-full text-center font-bold flex items-center justify-center gap-2 z-[2] hover:brightness-125 transition-transform duration-500" style={{ fontSize: 12 }}>
            <img draggable="false" src={`${A}count.svg`} alt="Plays" className="h-4 w-4" />
            <span>{game.plays} Plays</span>
            <img src={`${A}arrow-trending-up.svg`} alt="Trending" className="h-4 w-4" />
          </div>
          <div className="text-white absolute bottom-2 w-full text-center font-bold flex items-center justify-center gap-2 z-[2]">
            <img draggable="false" className="w-[100px] hover:brightness-125 hover:scale-110 transition-transform duration-500" src={`${A}playButton.svg`} alt="Play" />
          </div>
        </div>
        <div className="text-white absolute bottom-0 text-center font-bold z-[1] w-[240px] h-[75px]">
          <img src={`${A}top10bg.svg`} alt="" draggable="false" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSection() {
  return (
    <div className="mt-4">
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', marginLeft: 16, marginBottom: 16, outline: 'none' }}>
        <div style={{ display: 'inline-flex', gap: '1rem', outline: 'none' }}>
          {featuredGames.map((game) => (
            <FeaturedCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
