import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronRight, Heart, Sparkles, Infinity, Diamond, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'HOME', icon: Home, href: '/', sectionId: 'top' },
  { label: 'OUR STORY', icon: Heart, href: '/', sectionId: 'our-story' },
  { label: 'THE BEGINNING', icon: Sparkles, href: '/beginning' },
  { label: 'THE JOURNEY', icon: ChevronRight, href: '/journey' },
  { label: 'THE PROMISE', icon: Diamond, href: '/promises' },
  { label: 'FOREVER', icon: Infinity, href: '/forever' },
];

const secondaryItems = [
  { label: 'GALLERY', href: '/gallery' },
  { label: 'MOMENTS', href: '/moments' },
  { label: 'CONTACT', href: '/#contact' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const secondaryItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isERed, setIsERed] = useState(false);
  const [isLWhite, setIsLWhite] = useState(false);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const menuItemsEls = menuItemsRef.current.filter(Boolean);
    const secondaryItemsEls = secondaryItemsRef.current.filter(Boolean);
    const title = titleRef.current;
    const accentLine = accentLineRef.current;
    const footer = footerRef.current;
    const divider = dividerRef.current;
    const particles = particlesRef.current;

    if (!sidebar || !overlay) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Spawn floating particles inside sidebar
      if (particles) {
        particles.innerHTML = '';
        for (let i = 0; i < 12; i++) {
          const dot = document.createElement('div');
          dot.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            border-radius: 50%;
            background: rgba(139, 21, 56, ${0.3 + Math.random() * 0.4});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
          `;
          particles.appendChild(dot);
          gsap.to(dot, {
            y: -30 - Math.random() * 60,
            x: (Math.random() - 0.5) * 40,
            opacity: 0,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 2,
            repeat: -1,
            ease: 'power1.out',
          });
        }
      }

      tl.set([sidebar, overlay], { display: 'block' })
        .to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        .to(sidebar, { x: 0, duration: 0.7, ease: 'expo.out' }, '-=0.3')
        // Accent line draws down
        .fromTo(accentLine,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        // Title with blur reveal
        .fromTo(title,
          { opacity: 0, x: -40, filter: 'blur(8px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        // Menu items cascade with clip-path reveal
        .fromTo(menuItemsEls,
          { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)' },
          {
            opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
            duration: 0.55,
            stagger: { each: 0.07, from: 'start' },
            ease: 'power3.out',
          },
          '-=0.3'
        )
        // Divider line draws across
        .fromTo(divider,
          { scaleX: 0, transformOrigin: 'left', opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        )
        // Secondary items float up
        .fromTo(secondaryItemsEls,
          { opacity: 0, y: 25, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.45,
            stagger: { each: 0.06, from: 'start' },
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // Footer fades in last
        .fromTo(footer,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
    } else {
      tl
        .to(footer, { opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' })
        .to(secondaryItemsEls, {
          opacity: 0, y: 15,
          duration: 0.25,
          stagger: { each: 0.04, from: 'end' },
          ease: 'power2.in',
        }, '-=0.1')
        .to(menuItemsEls, {
          opacity: 0, x: -40,
          duration: 0.3,
          stagger: { each: 0.04, from: 'end' },
          ease: 'power2.in',
        }, '-=0.2')
        .to(title, { opacity: 0, x: -30, filter: 'blur(6px)', duration: 0.25, ease: 'power2.in' }, '-=0.2')
        .to(accentLine, { scaleY: 0, transformOrigin: 'bottom', duration: 0.4, ease: 'power2.in' }, '-=0.2')
        .to(sidebar, { x: '-100%', duration: 0.55, ease: 'power3.inOut' }, '-=0.1')
        .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '-=0.3')
        .set([sidebar, overlay], { display: 'none' });
    }

    return () => { tl.kill(); };
  }, [isOpen]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    onClose();
    if (item.href.startsWith('/#') || (item.href === '/' && item.sectionId)) {
      e.preventDefault();
      const sectionId = item.sectionId || item.href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/' + (sectionId !== 'top' ? '#' + sectionId : ''));
      } else {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 hidden opacity-0"
        onClick={onClose}
        style={{ display: 'none' }}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-full sm:w-[420px] z-50 hidden overflow-hidden"
        style={{ transform: 'translateX(-100%)', display: 'none', background: 'linear-gradient(135deg, #0a0005 0%, #0f0008 50%, #080003 100%)' }}
      >
        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Gradient accent line */}
        <div ref={accentLineRef} className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#8B1538] to-transparent opacity-70" />

        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#8B1538]/10 to-transparent pointer-events-none" />

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8B1538]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col p-8 md:p-12 overflow-y-auto">
          {/* Close Button */}
          <Link
            to="/"
            onClick={onClose}
            className="self-end mb-10 group relative w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-[#8B1538]/60 transition-all duration-500 hover:bg-[#8B1538]/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white/60 group-hover:text-white transition-all duration-300 group-hover:rotate-90" />
          </Link>

          {/* Title */}
          <div ref={titleRef} className="mb-10 opacity-0">
            <p className="label-text text-[#8B1538] tracking-[0.4em] mb-1">NAVIGATE</p>
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#8B1538] to-transparent" />
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    ref={(el: any) => { menuItemsRef.current[index] = el; }}
                    to={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className="group flex items-center gap-5 py-4 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-all duration-400 opacity-0 relative overflow-hidden"
                  >
                    {/* Hover bg sweep */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#8B1538]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                    {/* Icon */}
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center border border-white/10 rounded-full group-hover:border-[#8B1538]/50 transition-all duration-400 group-hover:bg-[#8B1538]/10">
                      <item.icon className="w-4 h-4 text-white/40 group-hover:text-[#8B1538] transition-all duration-300 group-hover:scale-110" />
                    </div>

                    {/* Text */}
                    <div className="relative z-10 overflow-hidden flex-1">
                      <span className="font-display text-xl md:text-2xl font-light tracking-[0.12em] text-white/70 group-hover:text-white transition-colors duration-300 block transform group-hover:translate-x-2 transition-transform duration-400">
                        {item.label}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#8B1538] to-transparent group-hover:w-full transition-all duration-500 ease-out" />
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="relative z-10 w-4 h-4 text-[#8B1538]/40 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div ref={dividerRef} className="my-8 h-[1px] bg-gradient-to-r from-transparent via-[#8B1538]/40 to-transparent opacity-0" />

          {/* Secondary Items */}
          <div>
            <p className="label-text text-white/30 tracking-[0.3em] mb-5">EXPLORE</p>
            <ul className="space-y-4">
              {secondaryItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    ref={(el: any) => { secondaryItemsRef.current[index] = el; }}
                    to={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className="group flex items-center gap-3 label-text text-white/50 hover:text-white transition-all duration-300 opacity-0"
                  >
                    <span className="w-4 h-[1px] bg-[#8B1538]/50 group-hover:w-8 transition-all duration-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div ref={footerRef} className="mt-auto pt-10 opacity-0">
            <div className="flex items-center gap-3">
              <div className="font-display text-2xl font-light tracking-[0.3em] select-none">
                <span
                  onClick={() => setIsERed(!isERed)}
                  className={`cursor-pointer transition-colors duration-500 ${isERed ? 'text-[#6B0F1A]' : 'text-white'}`}
                >E</span>
                <span
                  onClick={() => setIsLWhite(!isLWhite)}
                  className={`cursor-pointer transition-colors duration-500 ${isLWhite ? 'text-white' : 'text-[#6B0F1A]'}`}
                >L</span>
              </div>
              <span className="w-[1px] h-4 bg-white/20" />
              <p className="text-xs text-white/30 tracking-wider">Arjun & Smriti</p>
            </div>
            <p className="text-xs text-white/20 mt-3 tracking-widest">A LOVE STORY WRITTEN IN ROSES</p>
          </div>
        </div>
      </div>
    </>
  );
}
