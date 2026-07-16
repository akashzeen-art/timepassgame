export default function Footer() {
  return (
    <footer className="px-4 py-6 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <img draggable="false" src="/logo/playzonegameslogo.png" alt="PlayZone" className="w-7 h-7 object-contain" />
          <span className="text-white font-black text-sm">PlayZone</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>100+ free browser games · No downloads · No logins</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2024–2025 PlayZone · All rights reserved</p>
      </div>
    </footer>
  );
}
