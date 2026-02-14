import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  explore: [
    { label: 'Our Story', href: '#our-story' },
    { label: 'The Journey', href: '#the-journey' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Moments', href: '#moments' },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const columns = columnsRef.current.filter(Boolean);
    const bottom = bottomRef.current;

    if (!footer || !content || !logo || columns.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        // Logo animation
        gsap.fromTo(
          logo,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );

        // Columns staggered animation
        gsap.fromTo(
          columns,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );

        // Bottom bar
        if (bottom) {
          gsap.fromTo(
            bottom,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, delay: 1, ease: 'power2.out' }
          );
        }
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050505] pt-24 pb-12 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6B0F1A]/30 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6B0F1A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8"
        >
          {/* Branding & Socials */}
          <div
            ref={(el) => { columnsRef.current[0] = el; }}
            className="md:col-span-5 flex flex-col items-start opacity-0"
          >
            <div ref={logoRef} className="mb-8 opacity-0">
              <h2 className="text-2xl md:text-3xl font-display tracking-[0.2em] flex items-center gap-3">
                <span className="text-white">ETERNAL</span>
                <span className="text-[#6B0F1A]">LOVE</span>
              </h2>
            </div>
            <p className="text-white/50 text-base font-light leading-relaxed max-w-sm mb-10">
              Celebrating love in its most timeless form. Inspired by the dark romance of the rose and the brilliance of devotion.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={label === 'Instagram' ? 'https://www.instagram.com/goreyishere14?igsh=NmYyZWIwcWtxZWdu' : '#'}
                  className="text-white/40 hover:text-[#6B0F1A] transition-all duration-500 transform hover:scale-110"
                  aria-label={label}
                  target={label === 'Instagram' ? '_blank' : undefined}
                  rel={label === 'Instagram' ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div
            ref={(el) => { columnsRef.current[1] = el; }}
            className="md:col-span-3 flex flex-col opacity-0"
          >
            <h4 className="text-xs font-medium tracking-[0.3em] text-[#6B0F1A] uppercase mb-10">EXPLORE</h4>
            <nav>
              <ul className="space-y-5">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white transition-all duration-300 text-sm font-light tracking-wide inline-block group"
                    >
                      <span className="relative overflow-hidden block">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.label}</span>
                        <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white font-normal">{link.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Stay Connected (Newsletter) */}
          <div
            ref={(el) => { columnsRef.current[2] = el; }}
            className="md:col-span-4 flex flex-col items-start opacity-0"
          >
            <h4 className="text-xs font-medium tracking-[0.3em] text-[#6B0F1A] uppercase mb-10">STAY CONNECTED</h4>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
              Receive updates on our journey and latest captures.
            </p>

            <form className="w-full max-w-sm group" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 py-5 px-6 text-sm font-light tracking-wide text-white focus:outline-none focus:border-[#6B0F1A]/50 transition-colors duration-500 peer"
                />
                <button
                  type="submit"
                  className="absolute right-2 w-12 h-12 bg-[#6B0F1A] flex items-center justify-center hover:bg-[#8B0000] transition-colors duration-300 group-hover:translate-x-1"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="mt-24 pt-8 border-t border-white/5 opacity-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
              &copy; {new Date().getFullYear()} Eternal Love. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-white/20 tracking-[0.2em] uppercase">
              <span>DESIGNED FOR HER</span>
              <div className="w-4 h-[1px] bg-[#6B0F1A]/30" />
              <span>CRAFTED WITH DEVOTION</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
