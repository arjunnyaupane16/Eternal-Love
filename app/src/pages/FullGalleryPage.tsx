import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
    // Existing images
    { src: '/rose-hero.jpg', alt: 'The Rose', span: 'col-span-1 md:col-span-2 row-span-2' },
    { src: '/couple-romance.jpg', alt: 'Our Moment', span: 'col-span-1 md:col-span-1' },
    { src: '/ring-detail.jpg', alt: 'The Promise', span: 'col-span-1 md:col-span-1' },
    { src: '/rose-petals.jpg', alt: 'Falling Petals', span: 'col-span-1 md:col-span-1' },
    { src: '/pattern-detail.jpg', alt: 'Our Pattern', span: 'col-span-1 md:col-span-1' },
    { src: '/couple-beach.jpg', alt: 'Together', span: 'col-span-1 md:col-span-2' },
    // Duplicate for "many more images" effect
    { src: '/couple-romance.jpg', alt: 'Love', span: 'col-span-1' },
    { src: '/ring-detail.jpg', alt: 'Forever', span: 'col-span-1' },
    { src: '/rose-hero.jpg', alt: 'Bloom', span: 'col-span-1 md:col-span-1' },
    { src: '/pattern-detail.jpg', alt: 'Texture', span: 'col-span-1' },
    { src: '/rose-petals.jpg', alt: 'Softness', span: 'col-span-1 md:col-span-2' },
];

export default function FullGalleryPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero Animation
        const hero = heroRef.current;
        if (hero) {
            gsap.fromTo(hero.querySelector('h1'),
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.5 }
            );
            gsap.fromTo(hero.querySelector('p'),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.8 }
            );
        }

        // Grid Animation
        const grid = gridRef.current;
        if (grid) {
            const items = grid.querySelectorAll('.gallery-item');
            gsap.fromTo(items,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 80%',
                    }
                }
            );
        }
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">

            {/* Cinematic Hero */}
            <section ref={heroRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/rose-hero.jpg" alt="Gallery Hero" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-8xl font-display mb-6 tracking-tight">The Collection</h1>
                    <p className="text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase">
                        Every picture tells a story
                    </p>
                </div>
            </section>

            {/* Immersive Grid */}
            <section className="py-24 px-4 md:px-12 bg-black">
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
                    {galleryData.map((img, idx) => (
                        <div
                            key={idx}
                            className={`gallery-item relative overflow-hidden group cursor-pointer ${img.span}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-24 mb-12">
                    <Link to="/" className="inline-block px-12 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] font-light uppercase text-sm">
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
