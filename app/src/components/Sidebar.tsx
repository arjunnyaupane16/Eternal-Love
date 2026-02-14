import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, ChevronRight, Heart, Sparkles, Infinity, Diamond } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
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

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const menuItems = menuItemsRef.current.filter(Boolean);
    const secondaryItems = secondaryItemsRef.current.filter(Boolean);
    const title = titleRef.current;

    if (!sidebar || !overlay) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Open animation - smoother with custom easing
      tl.set([sidebar, overlay], { display: 'block' })
        .to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
        .to(
          sidebar,
          {
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.25'
        )
        // Title slides in with character animation
        .fromTo(
          title,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        // Menu items slide in with stagger - smoother motion
        .fromTo(
          menuItems,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: {
              each: 0.08,
              from: 'start',
            },
            ease: 'power3.out',
          },
          '-=0.2'
        )
        // Secondary items fade up
        .fromTo(
          secondaryItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: {
              each: 0.06,
              from: 'start',
            },
            ease: 'power2.out',
          },
          '-=0.3'
        );
    } else {
      // Close animation - reverse with smooth easing
      tl.to(menuItems, {
        opacity: 0,
        x: -40,
        duration: 0.3,
        stagger: {
          each: 0.04,
          from: 'end',
        },
        ease: 'power2.in',
      })
        .to(
          title,
          {
            opacity: 0,
            x: -30,
            duration: 0.25,
            ease: 'power2.in',
          },
          '-=0.2'
        )
        .to(
          secondaryItems,
          {
            opacity: 0,
            y: 10,
            duration: 0.2,
            stagger: {
              each: 0.03,
              from: 'end',
            },
            ease: 'power2.in',
          },
          '-=0.25'
        )
        .to(sidebar, {
          x: '-100%',
          duration: 0.5,
          ease: 'power3.inOut',
        })
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '-=0.3'
        )
        .set([sidebar, overlay], { display: 'none' });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    onClose();

    if (item.href.startsWith('/#') || (item.href === '/' && item.sectionId)) {
      e.preventDefault();
      const sectionId = item.sectionId || item.href.split('#')[1];

      if (location.pathname !== '/') {
        navigate('/' + (sectionId ? '#' + sectionId : ''));
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden opacity-0"
        onClick={onClose}
        style={{ display: 'none' }}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-full sm:w-[420px] bg-black/98 z-50 hidden"
        style={{ transform: 'translateX(-100%)', display: 'none' }}
      >
        {/* Gradient accent line */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#8B1538] to-transparent opacity-50" />

        <div className="h-full flex flex-col p-8 md:p-12 overflow-y-auto">
          {/* Home Button (Circle) */}
          <Link
            to="/"
            onClick={onClose}
            className="self-end mb-10 group relative"
            aria-label="Go to home"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <X className="w-6 h-6 text-white/60 group-hover:text-white transition-all duration-300 group-hover:rotate-90" />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Title Section */}
          <div ref={titleRef} className="mb-12 opacity-0">
            <p className="label-text text-[#8B1538] tracking-[0.3em] mb-3">NAVIGATE</p>
            <h2 className="font-display text-3xl font-light tracking-[0.15em] text-white">
              OUR STORY
            </h2>
          </div>

          {/* Main Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    ref={(el: any) => { menuItemsRef.current[index] = el; }}
                    to={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className="group flex items-center gap-5 py-4 px-2 -mx-2 rounded-lg hover:bg-white/5 transition-all duration-300 opacity-0"
                  >
                    {/* Icon with hover animation */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white/30 group-hover:text-[#8B1538] transition-all duration-300 group-hover:scale-110" />
                    </div>

                    {/* Text with slide effect */}
                    <div className="relative overflow-hidden">
                      <span className="font-display text-xl md:text-2xl font-light tracking-[0.12em] text-white/80 group-hover:text-white transition-colors duration-300 block transform group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      {/* Underline that slides in */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B1538] group-hover:w-full transition-all duration-500 ease-out" />
                    </div>

                    {/* Arrow indicator */}
                    <ChevronRight className="w-4 h-4 text-white/20 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Secondary Items */}
          <div>
            <p className="label-text text-white/30 tracking-[0.2em] mb-4">EXPLORE</p>
            <ul className="space-y-3">
              {secondaryItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    ref={(el: any) => { secondaryItemsRef.current[index] = el; }}
                    to={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className="label-text text-white/50 hover:text-white transition-all duration-300 inline-block transform hover:translate-x-1 opacity-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-light tracking-[0.3em] text-[#6B0F1A]/60">
                EL
              </span>
              <span className="w-[1px] h-4 bg-white/20" />
              <p className="text-xs text-white/30 tracking-wider">
                A Love Story
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
