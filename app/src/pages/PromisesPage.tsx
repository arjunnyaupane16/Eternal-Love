import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function PromisesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroTitle = heroRef.current?.querySelector('h1');
            const heroSub = heroRef.current?.querySelector('.hero-sub');

            if (heroTitle) {
                gsap.fromTo(heroTitle,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.5 }
                );
            }

            if (heroSub) {
                gsap.fromTo(heroSub,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.8 }
                );
            }

            // Text reveal
            gsap.utils.toArray('.reveal-section').forEach((section: any) => {
                gsap.fromTo(section,
                    { opacity: 0, scale: 0.95 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white">

            {/* Cinematic Hero */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/promises-new.jpg"
                        alt="Promises"
                        className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="hero-sub block text-rose-500/60 tracking-[0.6em] uppercase text-xs mb-6">The Vow</span>
                    <h1 className="text-6xl md:text-9xl font-display mb-8 tracking-tighter">Promises</h1>
                    <p className="hero-sub max-w-xl mx-auto text-white/50 font-light tracking-widest uppercase text-sm">A commitment written in the language of the heart.</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 px-6 max-w-5xl mx-auto text-center reveal-section">
                <h2 className="text-4xl md:text-6xl font-display mb-12">The Unspoken Oath</h2>
                <div className="space-y-8 text-lg md:text-xl text-white/70 font-light leading-relaxed">
                    <p>
                        A promise isn't just a word spoken; it's a foundation laid for every tomorrow. It's the silent understanding that across every season, through every storm and every sunrise, my hand will be in yours.
                    </p>
                    <div className="w-16 h-[1px] bg-rose-500/30 mx-auto my-12" />
                    <p className="italic text-2xl text-rose-400/80">
                        "I used to find it hard to believe in the word 'forever' until I saw it reflected in your promises."
                    </p>
                </div>
            </section>

            {/* Detail section */}
            <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
                <div className="relative aspect-square overflow-hidden reveal-section">
                    <img src="/ring-detail.jpg" alt="Integrity" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center bg-black/40">
                        <div>
                            <h3 className="text-2xl font-display mb-4">Integrity</h3>
                            <p className="text-sm tracking-wide text-white/60">Built on trust, nurtured by time.</p>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-square overflow-hidden reveal-section">
                    <img src="/rose-petals.jpg" alt="Tenderness" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center bg-black/40">
                        <div>
                            <h3 className="text-2xl font-display mb-4">Tenderness</h3>
                            <p className="text-sm tracking-wide text-white/60">Strong as steel, gentle as a petal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Photo Gallery Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto reveal-section">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/couple-romance.jpg" alt="Promise 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/rose-hero.jpg" alt="Promise 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/couple-beach.jpg" alt="Promise 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/pattern-detail.jpg" alt="Promise 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <section className="py-24 border-t border-white/10 text-center">
                <Link to="/" className="inline-block px-12 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] font-light uppercase text-sm mb-8">
                    Back to Home
                </Link>
                <div className="flex flex-col gap-4">
                    <Link to="/moments" className="text-white/40 hover:text-white transition-colors tracking-widest uppercase text-xs">
                        ← Previous: Moments
                    </Link>
                    <Link to="/forever" className="text-rose-400 hover:text-rose-300 transition-colors tracking-widest uppercase text-xs">
                        Next Chapter: Forever →
                    </Link>
                </div>
            </section>
        </div>
    );
}
