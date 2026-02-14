import { useState, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import Magnetic from './Magnetic';
import SearchOverlay from './SearchOverlay';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Fade in header after intro
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="h-20 px-6 md:px-12 flex items-center justify-between">
          {/* MENU Button */}
          <Magnetic>
            <button
              onClick={onMenuClick}
              className="flex items-center gap-3 group relative cursor-pointer"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white transition-all duration-300 group-hover:rotate-90" />
                ) : (
                  <Menu className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="label-text text-white hidden sm:block tracking-[0.2em]">
                {isMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              {/* Hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </button>
          </Magnetic>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="block group">
              <span className="font-display text-2xl md:text-3xl font-light tracking-[0.4em] text-[#6B0F1A] group-hover:text-white transition-colors duration-500">
                EL
              </span>
            </a>
          </div>

          {/* Right Side - Search/CTA */}
          <Magnetic>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 group relative cursor-pointer"
            >
              <Search className="w-4 h-4 text-white transition-all duration-300 group-hover:scale-110" />
              <span className="label-text text-white hidden md:block tracking-[0.2em]">FIND HER HEART</span>
              {/* Hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
            </button>
          </Magnetic>
        </div>

        {/* Sub Navigation - Only visible when scrolled */}
        <div
          className={`border-t border-white/10 transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-6 md:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="label-text text-white/60 tracking-[0.2em]">OUR STORY</span>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              {['THE BEGINNING', 'THE JOURNEY', 'THE PROMISE', 'FOREVER'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="label-text text-white/50 hover:text-white transition-all duration-300 relative group tracking-[0.15em]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#8B1538] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
