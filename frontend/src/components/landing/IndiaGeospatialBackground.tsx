import React, { useState, useEffect } from 'react';
import vajraCyberMap from '../../assets/images/vajra_india_cyber_map_1788188888561.jpg';
import { Maximize2, Minimize2, Radio, Sun, Moon } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const IndiaGeospatialBackground: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { theme, setTheme } = useSettings();
  const isLight = theme === 'Light';

  useEffect(() => {
    // Clear any temporary user upload to guarantee the exact reference pic is displayed
    try {
      localStorage.removeItem('vajra_custom_login_bg');
      localStorage.removeItem('vajra_active_preset');
    } catch {
      // ignore
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen toggle note:', err);
    }
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden z-0 ${
        isLight ? 'bg-[#f1f5f9]' : 'bg-[#020617]'
      } flex items-center justify-center select-none transition-colors duration-300`}
      id="india-tactical-background"
    >
      {/* Ambient Radial Cyber Glow Atmosphere */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isLight 
            ? 'bg-[radial-gradient(circle_at_60%_40%,rgba(14,165,233,0.09)_0%,rgba(241,245,249,0.85)_55%,#f1f5f9_100%)]' 
            : 'bg-radial from-cyan-950/25 via-[#030816]/70 to-[#020617]'
        }`} 
      />

      {/* Primary Cybernetic India Map - Exact 1:1 Rendering without alteration */}
      <div className="relative w-full h-full flex items-center justify-end pr-2 sm:pr-4 lg:pr-8 xl:pr-16 p-2 sm:p-4">
        <img
          src={vajraCyberMap}
          alt="Bharat Tactical Command Cybernetic Geospatial Network"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain object-right max-w-[96vw] lg:max-w-[68vw] xl:max-w-[72vw] max-h-[94vh] pointer-events-none select-none transition-all duration-300 ease-out"
          id="india-map-bg-image"
        />

        {/* Subtle Ambient Holographic Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-24 w-full animate-radar-scan pointer-events-none" />

        {/* Tactical Corner Watermark - Top Left Status Badge */}
        <div className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-lg ${
          isLight 
            ? 'bg-white/95 border-2 border-cyan-600 text-cyan-950 shadow-md font-extrabold' 
            : 'bg-slate-950/80 border border-cyan-500/35 text-cyan-400 shadow-lg font-bold'
        } border text-xs sm:text-sm font-mono-code backdrop-blur-md`}>
          <Radio className={`w-4 h-4 ${isLight ? 'text-cyan-800' : 'text-cyan-400'} animate-pulse`} />
          <span>BHARAT GEOSPATIAL COMMAND MESH ACTIVE</span>
        </div>

        {/* Tactical Corner Watermark - Bottom Right */}
        <div className={`absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg ${
          isLight 
            ? 'bg-white/95 border-2 border-amber-600 text-amber-950 shadow-md font-extrabold' 
            : 'bg-slate-950/80 border border-amber-500/30 text-amber-300 shadow-lg font-bold'
        } border text-xs font-mono-code backdrop-blur-md`}>
          <span>COORDINATES: 8.4°N - 37.6°N | 68.7°E - 97.25°E</span>
        </div>
      </div>

      {/* Top Right Controls: Theme Switcher & Fullscreen */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Instant Theme Toggle (Light / Dark) */}
        <button
          type="button"
          onClick={() => setTheme(isLight ? 'Dark' : 'Light')}
          className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-tech font-bold transition-all shadow-lg backdrop-blur-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
            isLight
              ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 shadow-amber-500/20 font-extrabold'
              : 'bg-slate-950/80 border-cyan-500/40 text-cyan-300 hover:border-cyan-300 hover:text-white'
          }`}
          title={isLight ? 'Switch to Tactical Dark Mode' : 'Switch to Daylight Optical Light Mode'}
          id="login-theme-toggle"
        >
          {isLight ? (
            <>
              <Moon className="w-3.5 h-3.5 text-amber-900" />
              <span className="hidden sm:inline">DARK MODE</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">LIGHT MODE</span>
            </>
          )}
        </button>

        {/* Subtle Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border ${
            isLight
              ? 'bg-white/95 border-slate-300 text-slate-800 hover:bg-slate-100 shadow-md font-bold'
              : 'bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white shadow-lg'
          } text-xs font-tech transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95`}
          title="Toggle Fullscreen"
          id="vajra-fullscreen-toggle"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden md:inline">EXIT</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden md:inline">FULLSCREEN</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

