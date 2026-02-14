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
      const numPetals = 40;

      const clippedShapes = [
        'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
      ];

      for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('absolute', 'overflow-hidden');

        const left = 30 + Math.random() * 40;
        const top = 30 + Math.random() * 40;
        const width = 5 + Math.random() * 10;
        const height = width * (0.8 + Math.random() * 0.4);

        petal.style.left = `${left}%`;
        petal.style.top = `${top}%`;
        petal.style.width = `${width}%`;
        petal.style.height = `${height}%`;
        petal.style.clipPath = clippedShapes[Math.floor(Math.random() * clippedShapes.length)];

        const innerImg = document.createElement('img');
        innerImg.src = '/rose-hero.jpg';
        innerImg.classList.add('absolute', 'w-full', 'h-full', 'object-cover');
        innerImg.style.width = `${(100 / width) * 100}%`;
        innerImg.style.height = `${(100 / height) * 100}%`;
        innerImg.style.left = `${-(left / width) * 100}%`;
        innerImg.style.top = `${-(top / height) * 100}%`;
        innerImg.style.maxWidth = 'none';
        innerImg.style.maxHeight = 'none';

        petal.appendChild(innerImg);
        petal.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))';
        petalsContainer.appendChild(petal);
        petals.push(petal);
      }
      return petals;
    };

    const animatePetalsDetaching = (petals: HTMLDivElement[]) => {
      petals.forEach((petal) => {
        const currentLeft = parseFloat(petal.style.left);
        const currentTop = parseFloat(petal.style.top);
        const centerX = 50;
        const centerY = 50;
        const dx = currentLeft - centerX;
        const dy = currentTop - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const velocity = 50 + Math.random() * 100;
        const moveX = (dx / distance) * velocity;
        const moveY = (dy / distance) * velocity;
        const rotation = Math.random() * 60 - 30;

        gsap.to(petal, {
          xPercent: moveX * 2,
          yPercent: moveY * 2,
          rotation: rotation,
          opacity: 0,
          scale: 0.8,
          duration: 3 + Math.random() * 2,
          ease: 'power2.out',
          delay: Math.random() * 0.5
        });
      });
    };

    const playSequence = () => {
      if (mainTlRef.current) mainTlRef.current.kill();
      mainTlRef.current = gsap.timeline();

      if (petalsContainer.innerHTML !== '') petalsContainer.innerHTML = '';

      mainTlRef.current.to(image, {
        scale: 1,
        opacity: 1,
        duration: 7.0,
        ease: 'power2.inOut',
      })
        .to(label, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=5.5')
        .to(line1, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=5.0')
        .to(line2, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=4.5')
        .to(line3, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=4.0')
        .to(scrollIndicator, { opacity: 1, y: 0, duration: 1.5 }, '-=3.0')
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
