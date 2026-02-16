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

    // Optimized Reset - Using autoAlpha for better performance
    gsap.set(image, {
      scale: 0.2,
      autoAlpha: 0,
      rotationY: 120,
      rotationZ: -30,
      z: -800,
      force3D: true
    });
    gsap.set(label, { autoAlpha: 0, y: 30 });
    gsap.set([line1, line2, line3], { autoAlpha: 0, y: 100 });
    gsap.set(scrollIndicator, { autoAlpha: 0, y: 20 });

    // quickSetters for high-frequency updates (Parallax)
    const setY = gsap.quickSetter(image, "y", "px");
    const setZ = gsap.quickSetter(image, "z", "px");
    const setRotationX = gsap.quickSetter(image, "rotationX", "deg");
    const setScale = gsap.quickSetter(image, "scale");

    const setContentY = gsap.quickSetter([line1, line2, line3, label], "y", "px");
    const setContentAlpha = gsap.quickSetter([line1, line2, line3, label], "autoAlpha");

    const createImagePetals = () => {
      petalsContainer.innerHTML = '';
      const petals: HTMLDivElement[] = [];
      const numPetals = 18; // Slightly leaner for 120Hz/60fps perfection

      // Simpler shapes = faster rendering
      const shapes = [
        'path("M 50 0 Q 90 10, 90 40 Q 90 70, 50 100 Q 10 70, 10 40 Q 10 10, 50 0")',
        'path("M 50 0 C 80 20 80 80 50 100 C 20 80 20 20 50 0")'
      ];

      for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('absolute', 'will-change-transform');

        const size = 4 + Math.random() * 4;
        petal.style.width = `${size}vw`;
        petal.style.aspectRatio = '1 / 1.3';
        petal.style.left = '50%';
        petal.style.top = '50%';
        petal.style.marginLeft = `-${size / 2}vw`;
        petal.style.marginTop = `-${size / 2}vw`;
        petal.style.opacity = '0';
        petal.style.clipPath = shapes[i % shapes.length];
        petal.style.transformStyle = 'preserve-3d';

        // Optimized gradient (less stops = less work)
        const baseHue = 345 + Math.random() * 10;
        petal.style.background = `radial-gradient(circle at 40% 40%, 
            hsla(${baseHue}, 80%, 15%, 0.8) 0%, 
            black 100%)`;

        petal.style.boxShadow = '0 10px 15px rgba(0,0,0,0.4)';

        petalsContainer.appendChild(petal);
        petals.push(petal);
      }
      return petals;
    };

    const animatePetalVortex = (petal: HTMLDivElement, index: number) => {
      const angle = (index / 18) * Math.PI * 4;
      const radius = 300 + Math.random() * 300;

      gsap.fromTo(petal,
        { autoAlpha: 0, scale: 0.3, x: 0, y: 0, z: -300, rotationX: 0, rotationY: 0, rotationZ: 0 },
        {
          autoAlpha: 0.6,
          scale: 1.2,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: 600,
          rotationX: 360,
          rotationY: 360,
          duration: 12 + Math.random() * 6,
          delay: index * 0.1,
          ease: 'none', // Linear is actually smoother for constant vortex motion
          force3D: true,
          onComplete: () => {
            if (sectionRef.current) animatePetalVortex(petal, index);
          }
        }
      );
    };

    const playSequence = () => {
      if (mainTlRef.current) mainTlRef.current.kill();
      mainTlRef.current = gsap.timeline();

      // THE CINEMATIC 3D VDO ENTRANCE - Performance Optimized
      mainTlRef.current
        .to(image, {
          autoAlpha: 1,
          scale: 1,
          rotationY: 0,
          rotationZ: 0,
          z: 0,
          duration: 3.5,
          ease: 'expo.out',
          force3D: true
        })
        .to([label, line1, line2, line3], {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=2.8')
        .to(scrollIndicator, { autoAlpha: 1, y: 0, duration: 1 }, '-=1.0')
        .call(() => {
          const petals = createImagePetals();
          petals.forEach((p, i) => animatePetalVortex(p, i));
        }, undefined, '-=3.5');

      // Efficient Breathing Loop
      gsap.to(image, {
        rotationY: 5,
        rotationX: 3,
        z: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true
      });
    };

    if (startEntrance) {
      playSequence();
    }

    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true, // Use binary scrub for direct sync
      onUpdate: (self) => {
        const p = self.progress;
        setY(p * 200);
        setZ(-p * 500);
        setRotationX(p * 12);
        setScale(1 - p * 0.15);

        setContentY(-p * 120);
        setContentAlpha(1 - p * 2.5);
      },
    });

    return () => {
      if (mainTlRef.current) mainTlRef.current.kill();
      parallaxTrigger.kill();
    };
  }, [startEntrance]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black" style={{ perspective: '1500px' }}>
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <img src="/rose-hero.jpg" alt="" className="w-full h-full object-cover opacity-30 blur-sm" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
      </div>

      {/* 3D Main Flower Layer */}
      <div ref={imageRef} className="absolute inset-0 flex items-center justify-center will-change-transform z-10" style={{ transformStyle: 'preserve-3d' }}>
        <img
          src="/assets/dark-rose-hero.png"
          alt="Eternal Rose"
          className="w-[90vh] h-[90vh] object-contain drop-shadow-[0_0_80px_rgba(107,15,26,0.3)]"
          style={{ transform: 'translateZ(50px)' }}
        />
        <div ref={petalsContainerRef} className="absolute inset-0 pointer-events-none z-20 overflow-visible" style={{ transformStyle: 'preserve-3d' }} />
      </div>

      {/* Interface Layer */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-6">
        <div ref={labelRef} className="mb-8 opacity-0">
          <span className="label-text text-white/50 tracking-[0.5em] text-xs uppercase">A Love Story Written in Roses</span>
        </div>

        <div className="text-center">
          <div ref={textLine1Ref} className="overflow-hidden opacity-0">
            <h1 className="hero-title text-[#6B0F1A]">ETERNAL</h1>
          </div>
          <div ref={textLine2Ref} className="overflow-hidden opacity-0 flex justify-center">
            <h1 className="hero-title text-[#6B0F1A]">LOVE</h1>
          </div>
          <div ref={textLine3Ref} className="mt-8 opacity-0">
            <p className="font-display text-lg md:text-xl font-light tracking-[0.3em] text-white/60">
              EST. 2026
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 z-40">
        <span className="label-text text-white/30 tracking-[0.3em] text-[10px]">EXPLORE</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-[#6B0F1A]/80 animate-scroll-line" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        .animate-scroll-line { animation: scroll-line 3s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .hero-title {
          font-size: clamp(4.5rem, 18vw, 12rem);
          line-height: 0.85;
          font-weight: 800;
          letter-spacing: -0.04em;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
        }
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, black 100%);
        }
      `}</style>
    </section>
  );
}
