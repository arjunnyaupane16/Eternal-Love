import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function BeginningPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const heroTitle = heroRef.current?.querySelector('h1');
            const heroSub = heroRef.current?.querySelector('.hero-sub');

            if (heroTitle) {
                gsap.fromTo(heroTitle,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.5 }
                );
            }

            if (heroSub) {
                gsap.fromTo(heroSub,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.8 }
                );
            }

            // Scroll animations for sections
            const sections = gsap.utils.toArray('.content-section');
            sections.forEach((section: any) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
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
                        src="/ring-detail.jpg"
                        alt="The Beginning"
                        className="w-full h-full object-cover opacity-50 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="hero-sub block text-rose-500/80 tracking-[0.5em] uppercase text-sm mb-4">Chapter One</span>
                    <h1 className="text-6xl md:text-9xl font-display mb-6 tracking-tighter">The Beginning</h1>
                    <div className="hero-sub w-24 h-[1px] bg-rose-500/50 mx-auto mb-8" />
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center content-section mb-32">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display mb-8">A Spark of Light</h2>
                        <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                            It started with a glance, a smile, a conversation that felt like coming home. In a world full of strangers, we found each other. The road to love is never straight, but every twist and turn led us to this moment.
                        </p>
                        <p className="text-lg text-white/70 leading-relaxed font-light">
                            Like the first light of dawn breaking over a silent horizon, our beginning was quiet yet profound. It wasn't just a meeting; it was a recognition. Two souls, one journey, infinite possibilities.
                        </p>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden">
                        <img src="/rose-hero.jpg" alt="First Bloom" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border border-white/10 m-4" />
                    </div>
                </div>

                {/* New Photo Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-32 content-section">
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/couple-romance.jpg" alt="First Glance" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                        <img src="/pattern-detail.jpg" alt="Details" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="relative aspect-square overflow-hidden col-span-2 md:col-span-1">
                        <img src="/rose-petals.jpg" alt="Petals" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center content-section mb-32 flex-row-reverse">
                    <div className="md:order-2">
                        <h2 className="text-3xl md:text-5xl font-display mb-8">The First Promise</h2>
                        <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                            Every word shared was a seed planted in the garden of our future. We didn't know then how beautiful the bloom would be, but we felt the warmth of the sun on our faces.
                        </p>
                        <div className="italic text-rose-400/80 text-xl border-l-2 border-rose-500/30 pl-6 my-8">
                            "In your eyes, I found the reflection of the person I always wanted to become."
                        </div>
                    </div>
                    <div className="md:order-1 relative aspect-[4/5] overflow-hidden">
                        <img src="/pattern-detail.jpg" alt="Intricate Details" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border border-white/10 m-4" />
                    </div>
                </div>

                {/* New Full Width Photo Section */}
                <div className="relative h-[60vh] overflow-hidden content-section mb-32">
                    <img src="/couple-beach.jpg" alt="Together" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 text-center">
                        <p className="text-2xl md:text-3xl font-display italic text-white/90">
                            "And so it began, a story written in starlight."
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <section className="py-24 border-t border-white/10 text-center">
                <Link to="/" className="inline-block px-12 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] font-light uppercase text-sm mb-4">
                    Back to Home
                </Link>
                <div>
                    <Link to="/journey" className="text-rose-400 hover:text-rose-300 transition-colors tracking-widest uppercase text-xs">
                        Next Chapter: The Journey →
                    </Link>
                </div>
            </section>
        </div>
    );
}
