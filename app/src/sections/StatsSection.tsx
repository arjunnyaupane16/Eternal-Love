import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const stat1 = stat1Ref.current;
    const stat2 = stat2Ref.current;
    const stat3 = stat3Ref.current;

    if (!section || !quote || !stat1 || !stat2 || !stat3) return;

    // Quote animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          quote,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        );
      },
      once: true,
    });

    // Stats animations with stagger
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        gsap.fromTo(
          [stat1, stat2, stat3],
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.3,
            ease: 'elastic.out(1, 0.6)',
          }
        );
      },
      once: true,
    });

    // Continuous floating animation for stats
    gsap.to(stat1, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(stat2, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
    });

    gsap.to(stat3, {
      y: -15,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a0f] to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Quote */}
      <div ref={quoteRef} className="relative z-10 text-center mb-20 max-w-4xl opacity-0">
        <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 italic mb-6">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </p>
        <p className="label-text text-rose-400/60 tracking-[0.3em] text-xs">ARJUN & SMRITI</p>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl w-full">
        {/* Stat 1 */}
        <div ref={stat1Ref} className="stat-card opacity-0">
          <div className="flex flex-col items-center text-center">
            <div className="stat-icon mb-6">
              <span className="text-6xl md:text-7xl animate-spin-slow inline-block">∞</span>
            </div>
            <h3 className="stat-number text-4xl md:text-5xl font-display text-rose-400 mb-3">Forever</h3>
            <p className="label-text text-white/50 tracking-[0.25em] text-xs">YEARS TOGETHER</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div ref={stat2Ref} className="stat-card opacity-0">
          <div className="flex flex-col items-center text-center">
            <div className="stat-icon mb-6">
              <span className="text-6xl md:text-7xl animate-heartbeat inline-block">❤️</span>
            </div>
            <h3 className="stat-number text-4xl md:text-5xl font-display text-rose-400 mb-3">Two</h3>
            <p className="label-text text-white/50 tracking-[0.25em] text-xs">HEARTS AS ONE</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div ref={stat3Ref} className="stat-card opacity-0">
          <div className="flex flex-col items-center text-center">
            <div className="stat-icon mb-6">
              <span className="text-6xl md:text-7xl animate-bounce-slow inline-block">1</span>
            </div>
            <h3 className="stat-number text-4xl md:text-5xl font-display text-rose-400 mb-3">Perfect</h3>
            <p className="label-text text-white/50 tracking-[0.25em] text-xs">PERFECT DAY</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .stat-card {
          position: relative;
          padding: 2rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(139, 21, 56, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          transition: all 0.5s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(244, 114, 182, 0.3);
          box-shadow: 0 20px 60px rgba(244, 114, 182, 0.2);
        }

        .stat-number {
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #be185d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
