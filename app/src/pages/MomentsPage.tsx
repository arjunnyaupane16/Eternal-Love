import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const memories = [
    { src: '/rose-hero.jpg', title: 'The First Spark', desc: 'When we knew it was forever.' },
    { src: '/couple-romance.jpg', title: 'Dance in the Rain', desc: 'Laughter through the storms.' },
    { src: '/ring-detail.jpg', title: 'The Hidden Vow', desc: 'Promises whispered in the dark.' },
    { src: '/rose-petals.jpg', title: 'Soft Echoes', desc: 'Every gentle word remembered.' },
    { src: '/couple-beach.jpg', title: 'Endless Horizons', desc: 'Our future, bright and clear.' },
    { src: '/pattern-detail.jpg', title: 'The Fine Print', desc: 'The details that make us, us.' },
];

export default function MomentsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.moment-hero-title',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 2, ease: 'power4.out', delay: 0.5 }
            );

            // Staggered grid reveal
            const items = gsap.utils.toArray('.memory-card');
            gsap.fromTo(items,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white">

            {/* Cinematic Hero */}
            <section className="h-[70vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 to-black/80" />
                    <img src="/rose-hero.jpg" alt="" className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="moment-hero-title text-5xl md:text-8xl font-display tracking-tight mb-4">Memories</h1>
                    <p className="text-white/50 tracking-[0.4em] uppercase text-xs">Etched in Time</p>
                </div>
            </section>

            {/* Narrative Grid */}
            <section ref={gridRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {memories.map((memory, i) => (
                        <div key={i} className="memory-card group">
                            <div className="relative aspect-[4/5] overflow-hidden mb-6">
                                <img
                                    src={memory.src}
                                    alt={memory.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                            <h3 className="text-xl font-display mb-2">{memory.title}</h3>
                            <p className="text-sm text-white/60 font-light tracking-wide">{memory.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Thought */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-gradient-to-t from-rose-950/10 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <div className="w-12 h-[1px] bg-rose-500/50 mx-auto mb-12" />
                    <p className="text-2xl font-light text-white/80 leading-relaxed italic mb-12">
                        "The best thing about memories is making them."
                    </p>
                    <Link to="/" className="inline-block px-12 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] font-light uppercase text-sm">
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
