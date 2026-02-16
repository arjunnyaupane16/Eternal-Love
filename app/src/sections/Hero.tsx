import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startEntrance?: boolean;
}

export default function Hero({ startEntrance = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLDivElement>(null);
  const textLine2Ref = useRef<HTMLDivElement>(null);
  const textLine3Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const petalsContainerRef = useRef<HTMLDivElement>(null);

  const mainTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const line1 = textLine1Ref.current;
    const line2 = textLine2Ref.current;
    const line3 = textLine3Ref.current;
    const label = labelRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const petalsContainer = petalsContainerRef.current;

    if (!section || !image || !line1 || !line2 || !line3 || !label || !scrollIndicator || !petalsContainer) return;

    // Reset initial states for entrance
    gsap.set(image, { scale: 0.8, opacity: 0 });
    gsap.set(label, { opacity: 0, y: 20 });
    gsap.set([line1, line2, line3], { opacity: 0, y: 80 });
    gsap.set(scrollIndicator, { opacity: 0, y: 20 });

    const createImagePetals = () => {
      petalsContainer.innerHTML = '';
      const petals: HTMLDivElement[] = [];
      const numPetals = 15; // Reduced count for sparse look "2-3 at a time"

      // Organic rose petal shapes matching Preloader
      const petalShapes = [
        'path("M 50 0 Q 80 5, 90 25 Q 100 50, 95 75 Q 85 95, 50 100 Q 15 95, 5 75 Q 0 50, 10 25 Q 20 5, 50 0")',
        'path("M 50 5 Q 75 8, 88 20 Q 98 40, 95 65 Q 88 88, 50 95 Q 12 88, 5 65 Q 2 40, 12 20 Q 25 8, 50 5")',
        'path("M 50 0 Q 65 10, 70 30 Q 75 60, 70 80 Q 60 98, 50 100 Q 40 98, 30 80 Q 25 60, 30 30 Q 35 10, 50 0")',
        'path("M 45 0 Q 70 12, 85 30 Q 95 55, 88 78 Q 75 95, 50 100 Q 25 92, 10 70 Q 5 45, 15 22 Q 30 5, 45 0")',
      ];

      for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('absolute', 'overflow-hidden');

        // Position concentrated around the rose
        const left = 30 + Math.random() * 40;
        const top = 30 + Math.random() * 40;

        // Convert size to % relative to viewport width roughly - INCREASED SIZE (Significantly larger)
        const width = 5 + Math.random() * 5; // Approx 5-10% of screen width (Larger)

        petal.style.left = `${left}%`;
        petal.style.top = `${top}%`;
        petal.style.width = `${width}%`;
        petal.style.height = 'auto'; // Maintain aspect ratio
        petal.style.aspectRatio = '1 / 1.3';
        petal.style.opacity = '0'; // Start invisible for smooth fade-in
        petal.style.clipPath = petalShapes[Math.floor(Math.random() * petalShapes.length)];

        // Exact DARK RED ROSE texture (Black-Red Velvet) - MATCHING PRELOADER + DARKER
        // Color: Deepest Burgundy/Cabernet (#2F0508 base, #540911 mid)
        const baseHue = 350 + Math.random() * 10;
        const lightness = 6 + Math.random() * 8; // Almost black in shadows (6-14%)
        const saturation = 80 + Math.random() * 15; // Rich but deep

        // Velvety texture simulation: Deep center, rich mid-tone, subtle edge highlight
        petal.style.background = `
            radial-gradient(circle at 30% 20%, 
                hsla(${baseHue + 5}, ${saturation}%, ${lightness + 10}%, 0.95) 0%, 
                hsla(${baseHue}, ${saturation}%, ${lightness + 4}%, 0.98) 35%,
                rgba(20, 0, 5, 0.95) 80%,
                transparent 100%),
            linear-gradient(135deg, 
                rgba(255, 255, 255, 0.02) 0%, 
                transparent 30%, 
                rgba(0, 0, 0, 0.6) 100%)
        `;

        // Texture: Micro-noise for velvet effect (using box-shadow trickery)
        petal.style.boxShadow = `
            inset 0 0 30px rgba(0, 0, 0, 0.9),
            inset -4px -4px 15px rgba(0, 0, 0, 0.8),
            inset 4px 4px 15px rgba(100, 10, 20, 0.15)
        `;

        // Shadows for depth (detached feel) - MATCHING PRELOADER
        petal.style.filter = `
            drop-shadow(0 10px 15px rgba(0, 0, 0, 0.9))
            drop-shadow(0 4px 6px rgba(0, 0, 0, 0.7))
            contrast(1.3)
            saturate(1.2)
            brightness(${0.8 + Math.random() * 0.2})
        `;

        petal.style.opacity = '0';

        // Removed Water Drops for clean velvety look

        petalsContainer.appendChild(petal);
        petals.push(petal);
      }
      return petals;
    };

    const animatePetal = (petal: HTMLDivElement, delay: number = 0) => {
      const currentLeft = parseFloat(petal.style.left);
      const currentTop = parseFloat(petal.style.top);
      const centerX = 50;
      const centerY = 50;
      const dx = currentLeft - centerX;
      const dy = currentTop - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      const velocity = 20 + Math.random() * 30; // SLOWER, MORE ELEGANT movement
      const moveX = (dx / distance) * velocity;
      const moveY = (dy / distance) * velocity;
      const rotation = Math.random() * 360;

      const tl = gsap.timeline({
        delay: delay,
        onComplete: () => {
          // RESET and RESTART for continuous loop with new randomness
          gsap.set(petal, {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0
          });
          // Random delay before next appearance to keep it sparse
          const nextDelay = Math.random() * 5.0 + 2.0;
          animatePetal(petal, nextDelay);
        }
      });

      // Fade In - Smooth and slow
      tl.to(petal, {
        opacity: 0.9, // Almost fully visible
        duration: 3.0 + Math.random() * 2.0, // Slower fade in (3-5s)
        ease: 'power1.inOut',
      })
        // Move and Rotate (starts slightly before fade in completes) - MUCH SMOOTHER
        .to(petal, {
          xPercent: moveX * 3, // Move further out
          yPercent: moveY * 3,
          rotation: rotation,
          scale: 0.8, // Slight scale down as they drift away
          duration: 12 + Math.random() * 8, // EVEN SLOWER float duration (12-20s)
          ease: 'sine.out', // Smoother easing for float
        }, '<0.5') // Start moving almost immediately
        // Continuous floating motion for extra smoothness
        .to(petal, {
          x: '+=20',
          y: '+=15',
          rotation: '+=15',
          duration: 3,
          repeat: 2,
          yoyo: true,
          ease: 'sine.inOut'
        }, '<')
        // Fade Out at the end - Long fade
        .to(petal, {
          opacity: 0,
          duration: 3.5,
          ease: 'power2.in',
        }, '-=3.0'); // Fade out overlap with movement
    };

    const animatePetalsDetaching = (petals: HTMLDivElement[]) => {
      petals.forEach((petal) => {
        // Initial random start delay to stagger the FIRST appearance
        // WIDER range to disperse them initially
        const startDelay = Math.random() * 20.0;
        animatePetal(petal, startDelay);
      });
    };

    const playSequence = () => {
      if (mainTlRef.current) mainTlRef.current.kill();
      mainTlRef.current = gsap.timeline();

      if (petalsContainer.innerHTML !== '') petalsContainer.innerHTML = '';

      // Fade in image with Blur Effect when petals appear
      mainTlRef.current.to(image, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)', // Ensure clear first
        duration: 4.0,
        ease: 'power2.inOut',
      })
        // Add subtle blur when petals are floating
        .to(image, {
          filter: 'blur(3px)', // Little blur as requested
          duration: 2.0,
          ease: 'power1.inOut'
        }, '-=1.0') // Overlap with end of fade-in
        .to(label, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=2.8')
        .to(line1, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=2.5')
        .to(line2, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=2.2')
        .to(line3, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=1.9')
        .to(scrollIndicator, { opacity: 1, y: 0, duration: 1.5 }, '-=1.2')
        .call(() => {
          const petals = createImagePetals();
          animatePetalsDetaching(petals);
        }, undefined, '-=0.1')
        .to([label, line1, line2, line3], {
          opacity: 0,
          y: -20,
          duration: 2,
          stagger: 0.1
        }, '<+1');
    };

    if (startEntrance) {
      playSequence();
    }

    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(image, {
          y: progress * 150,
          scale: 1 + progress * 0.1,
          duration: 0.1,
          ease: 'none',
        });
        gsap.to([line1, line2, line3, label], {
          y: -progress * 100,
          opacity: 1 - progress * 2,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      if (mainTlRef.current) mainTlRef.current.kill();
      parallaxTrigger.kill();
    };
  }, [startEntrance]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img src="/rose-hero.jpg" alt="Black Baccara Rose" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div ref={petalsContainerRef} className="absolute inset-0 pointer-events-none z-20 overflow-visible" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div ref={labelRef} className="mb-8 opacity-0">
          <span className="label-text text-white/60 tracking-[0.4em]">OUR LOVE PRESENTS</span>
        </div>

        <div className="text-center">
          <div ref={textLine1Ref} className="overflow-hidden opacity-0">
            <h1 className="hero-title text-[#6B0F1A]">ETERNAL</h1>
          </div>
          <div ref={textLine2Ref} className="overflow-hidden opacity-0">
            <h1 className="hero-title text-[#6B0F1A]">LOVE</h1>
          </div>
          <div ref={textLine3Ref} className="overflow-hidden mt-8 opacity-0">
            <p className="font-display text-lg md:text-xl font-light tracking-[0.25em] text-white/70">
              A Love Story Written in Roses
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0">
        <span className="label-text text-white/40 tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-white/60 animate-scroll-line" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        .animate-scroll-line { animation: scroll-line 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}