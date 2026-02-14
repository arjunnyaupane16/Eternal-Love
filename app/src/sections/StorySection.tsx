import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  content: string;
  imageSrc: string;
  imagePosition?: 'left' | 'right';
  backgroundStyle?: 'dark' | 'image';
}

export default function StorySection({
  id,
  title,
  subtitle,
  content,
  imageSrc,
  imagePosition = 'right',
  backgroundStyle = 'dark',
}: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const contentEl = contentRef.current;
    const imageEl = imageRef.current;
    const imageInnerEl = imageInnerRef.current;

    if (!section || !titleEl || !contentEl || !imageEl) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation - smoother with character reveal feel
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          { 
            opacity: 1, 
            y: 0, 
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2, 
            ease: 'power3.out' 
          }
        );
      },
      once: true,
    });
    triggers.push(titleTrigger);

    // Subtitle animation
    if (subtitleEl) {
      const subtitleTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            subtitleEl,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(subtitleTrigger);
    }

    // Content animation with line-by-line feel
    const contentTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          contentEl,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(contentTrigger);

    // Image reveal animation - smoother
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          imageEl,
          { opacity: 0, x: imagePosition === 'right' ? 80 : -80, scale: 0.95 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            duration: 1.2, 
            delay: 0.2, 
            ease: 'power3.out' 
          }
        );
      },
      once: true,
    });
    triggers.push(imageTrigger);

    // Parallax effect for image - smoother
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        if (imageInnerEl) {
          gsap.to(imageInnerEl, {
            y: (self.progress - 0.5) * 40,
            duration: 0.1,
            ease: 'none',
          });
        }
      },
    });
    triggers.push(parallaxTrigger);

    // Subtle zoom on image while in view
    const zoomTrigger = ScrollTrigger.create({
      trigger: imageEl,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 2,
      onUpdate: (self) => {
        if (imageInnerEl) {
          const scale = 1 + self.progress * 0.08;
          gsap.to(imageInnerEl, {
            scale,
            duration: 0.1,
            ease: 'none',
          });
        }
      },
    });
    triggers.push(zoomTrigger);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [imagePosition]);

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen w-full flex items-center ${
        backgroundStyle === 'dark' ? 'bg-black' : ''
      }`}
    >
      {backgroundStyle === 'image' && (
        <div className="absolute inset-0">
          <img
            src="/rose-petals.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
      )}

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            isImageLeft ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            {subtitle && (
              <p
                ref={subtitleRef}
                className="label-text text-[#8B1538] mb-6 opacity-0 tracking-[0.25em]"
              >
                {subtitle}
              </p>
            )}
            <h2
              ref={titleRef}
              className="section-title text-white mb-10 opacity-0"
            >
              {title}
            </h2>
            <p
              ref={contentRef}
              className="body-text text-white/80 max-w-xl opacity-0 leading-relaxed"
            >
              {content}
            </p>
            
            {/* Decorative line */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#8B1538]/60" />
              <span className="label-text text-white/40 tracking-[0.2em]">READ MORE</span>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'} opacity-0`}
          >
            <div className="relative aspect-[4/3] overflow-hidden group">
              {/* Image frame effect */}
              <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
              <div className="absolute -inset-2 border border-[#8B1538]/20 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <img
                ref={imageInnerRef}
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover will-change-transform"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 z-20" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20 z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
