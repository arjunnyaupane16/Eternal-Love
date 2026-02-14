import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  span?: 'small' | 'medium' | 'large';
  zoomEffect?: 'ken-burns' | 'slow-zoom' | 'parallax-zoom' | 'none';
}

interface GallerySectionProps {
  id?: string;
  title: string;
  images: GalleryImage[];
}

export default function GallerySection({ id, title, images }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const gridEl = gridRef.current;
    const imageElements = imageRefs.current.filter(Boolean);
    const imageInnerElements = imageInnerRefs.current.filter(Boolean);

    if (!section || !titleEl || !gridEl || imageElements.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation with smoother easing
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 60, skewY: 2 },
          { 
            opacity: 1, 
            y: 0, 
            skewY: 0,
            duration: 1.2, 
            ease: 'power3.out' 
          }
        );
      },
      once: true,
    });
    triggers.push(titleTrigger);

    // Images staggered animation with smoother reveal
    const imagesTrigger = ScrollTrigger.create({
      trigger: gridEl,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          imageElements,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: {
              each: 0.12,
              from: 'start',
            },
            ease: 'power3.out',
          }
        );
      },
      once: true,
    });
    triggers.push(imagesTrigger);

    // Selective zoom animations based on zoomEffect type
    images.forEach((image, index) => {
      const imgEl = imageInnerElements[index];
      const containerEl = imageElements[index];
      
      if (!imgEl || !containerEl) return;

      if (image.zoomEffect === 'ken-burns') {
        // Ken Burns effect - slow zoom and pan
        gsap.fromTo(
          imgEl,
          { scale: 1.15, x: '-5%' },
          {
            scale: 1.05,
            x: '5%',
            duration: 20,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          }
        );
      } else if (image.zoomEffect === 'slow-zoom') {
        // Slow zoom in on scroll
        const zoomTrigger = ScrollTrigger.create({
          trigger: containerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            const scale = 1 + self.progress * 0.15;
            gsap.to(imgEl, {
              scale,
              duration: 0.1,
              ease: 'none',
            });
          },
        });
        triggers.push(zoomTrigger);
      } else if (image.zoomEffect === 'parallax-zoom') {
        // Parallax with subtle zoom
        const parallaxTrigger = ScrollTrigger.create({
          trigger: containerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const y = (self.progress - 0.5) * 60;
            const scale = 1 + Math.abs(self.progress - 0.5) * 0.1;
            gsap.to(imgEl, {
              y,
              scale,
              duration: 0.1,
              ease: 'none',
            });
          },
        });
        triggers.push(parallaxTrigger);
      }
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [images]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen w-full bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-24">
        {/* Title */}
        <h2
          ref={titleRef}
          className="section-title text-white text-center mb-16 md:mb-24 opacity-0"
        >
          {title}
        </h2>

        {/* Image Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => { imageRefs.current[index] = el; }}
              className={`relative overflow-hidden group cursor-pointer opacity-0 ${
                image.span === 'large'
                  ? 'md:col-span-2 lg:col-span-2'
                  : image.span === 'medium'
                  ? 'md:col-span-1 lg:col-span-1'
                  : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  image.span === 'large'
                    ? 'aspect-[21/9]'
                    : image.span === 'medium'
                    ? 'aspect-[4/3]'
                    : 'aspect-square'
                }`}
              >
                <img
                  ref={(el) => { imageInnerRefs.current[index] = el; }}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ willChange: 'transform' }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Hover Overlay with text */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="label-text text-white/90 tracking-[0.2em]">{image.alt}</span>
                    <div className="w-8 h-[1px] bg-white/50 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/0 group-hover:border-white/30 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/0 group-hover:border-white/30 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
