import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, MapPin, Calendar } from 'lucide-react';
import Lightbox from '../components/Lightbox';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
  location: string;
  date: string;
  className?: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 1,
    url: '/ring-detail.jpg',
    title: 'The Spark',
    category: 'The Beginning',
    location: 'Winter Garden',
    date: 'Dec 2023',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 2,
    url: '/couple-romance.jpg',
    title: 'First Glance',
    category: 'The Beginning',
    location: 'Venice, Italy',
    date: 'Jan 2024',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 3,
    url: '/rose-petals.jpg',
    title: 'Petals of Love',
    category: 'Moments',
    location: 'Santuari de Lluc',
    date: 'Feb 2024',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 4,
    url: '/pattern-detail.jpg',
    title: 'Intricate Vows',
    category: 'The Promise',
    location: 'Verona',
    date: 'March 2024',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 5,
    url: '/couple-beach.jpg',
    title: 'Serenity',
    category: 'The Journey',
    location: 'Maldives',
    date: 'April 2024',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 6,
    url: '/rose-hero.jpg',
    title: 'Everlasting Bloom',
    category: 'Forever',
    location: 'Eternal Garden',
    date: 'Eternal',
    className: 'md:col-span-1 md:row-span-1'
  },
];

interface GallerySectionProps {
  id?: string;
  title?: string;
  images?: any[]; // Keep for compatibility but prioritize internal items if needed
}

export default function GallerySection({ id = "gallery", title: propTitle }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const titleContainer = titleRef.current;
    const grid = gridRef.current;
    const items = imageRefs.current.filter(Boolean);

    if (!section || !titleContainer || !grid || items.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleContainer,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleContainer,
            start: 'top 85%',
          }
        }
      );

      // Grid items staggered reveal
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: (index % 3) * 0.15,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#6B0F1A]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-[#6B0F1A]/5 blur-[100px] rounded-full" />
      </div>

      <div ref={titleRef} className="max-w-7xl mx-auto text-center mb-24 opacity-0">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[#6B0F1A]/50" />
          <Camera className="w-6 h-6 text-[#6B0F1A]" />
          <div className="w-12 h-[1px] bg-[#6B0F1A]/50" />
        </div>
        <h2 className="text-4xl md:text-6xl font-display tracking-[0.2em] mb-6 text-white uppercase">
          {propTitle || 'Captured'} <span className="text-[#6B0F1A] italic">Moments</span>
        </h2>
        <p className="text-white/40 text-sm md:text-base font-light tracking-[0.1em] max-w-xl mx-auto uppercase">
          A visual record of our most precious chapters, frozen in time.
        </p>
      </div>

      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {defaultGalleryItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { imageRefs.current[index] = el; }}
            onClick={() => setSelectedImage(item.url)}
            onMouseEnter={() => {
              const img = imageInnerRefs.current[index];
              if (img) {
                gsap.to(img, {
                  scale: 1.1,
                  duration: 1.5,
                  ease: 'power2.out',
                  overwrite: 'auto'
                });
              }
            }}
            onMouseLeave={() => {
              const img = imageInnerRefs.current[index];
              if (img) {
                gsap.to(img, {
                  scale: 1,
                  duration: 1.2,
                  ease: 'power2.out',
                  overwrite: 'auto'
                });
              }
            }}
            className={`relative overflow-hidden cursor-pointer group opacity-0 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#6B0F1A]/20 ${item.className || ''
              }`}
          >
            {/* Image container */}
            <div className="aspect-[4/5] overflow-hidden">
              <img
                ref={(el) => { imageInnerRefs.current[index] = el; }}
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-[#6B0F1A] text-[10px] tracking-[0.3em] uppercase mb-2">
                  <span className="w-4 h-[1px] bg-[#6B0F1A]" />
                  {item.category}
                </div>
                <h3 className="text-white text-xl font-display tracking-wider mb-4">
                  {item.title}
                </h3>

                <div className="flex items-center gap-6 text-white/40 text-[10px] tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                </div>

                {/* View Details Hint */}
                <div className="mt-6 flex items-center gap-2 text-[#6B0F1A] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                  <div className="w-8 h-[1px] bg-[#6B0F1A]" />
                  <span className="text-[8px] tracking-[0.4em] uppercase">Zoom Image</span>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accents */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
          </div>
        ))}
      </div>

      <Lightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
