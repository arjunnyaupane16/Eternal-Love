import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface QuoteSectionProps {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  backgroundImage?: string;
}

export default function QuoteSection({
  id,
  quote,
  author,
  role,
  backgroundImage = '/rose-petals.jpg',
}: QuoteSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quoteEl = quoteRef.current;
    const quoteTextEl = quoteTextRef.current;
    const authorEl = authorRef.current;
    const imageEl = imageRef.current;
    const quoteMarkEl = quoteMarkRef.current;

    if (!section || !quoteEl || !authorEl || !imageEl || !quoteTextEl) return;

    const triggers: ScrollTrigger[] = [];

    // Image parallax - smoother
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
      onUpdate: (self) => {
        gsap.to(imageEl, {
          y: self.progress * 80 - 40,
          scale: 1 + self.progress * 0.05,
          duration: 0.1,
          ease: 'none',
        });
      },
    });
    triggers.push(imageTrigger);

    // Quote mark animation
    const quoteMarkTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          quoteMarkEl,
          { opacity: 0, scale: 0.5, y: 30 },
          {
            opacity: 0.15,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          }
        );
      },
      once: true,
    });
    triggers.push(quoteMarkTrigger);

    // Quote text reveal - word by word feel
    const quoteTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          quoteTextEl,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out'
          }
        );
      },
      once: true,
    });
    triggers.push(quoteTrigger);

    // Author reveal
    const authorTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      onEnter: () => {
        gsap.fromTo(
          authorEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
          }
        );
      },
      once: true,
    });
    triggers.push(authorTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Large Quote Mark */}
      <span
        ref={quoteMarkRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 font-display text-[20rem] md:text-[30rem] text-white opacity-0 leading-none select-none pointer-events-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        "
      </span>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-24 max-w-5xl mx-auto text-center">
        <blockquote ref={quoteRef}>
          <p
            ref={quoteTextRef}
            className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 italic opacity-0"
          >
            {quote}
          </p>
        </blockquote>

        <div ref={authorRef} className="mt-16 opacity-0">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#8B1538]/60" />
            <div className="w-2 h-2 rounded-full bg-[#8B1538]/60" />
            <div className="w-8 h-[1px] bg-[#8B1538]/60" />
          </div>

          <p className="font-display text-lg md:text-xl font-medium tracking-[0.25em] text-white">
            {author}
          </p>
          {role && (
            <p className="label-text text-white/50 mt-3 tracking-[0.2em]">{role}</p>
          )}
        </div>
      </div>
    </section>
  );
}
