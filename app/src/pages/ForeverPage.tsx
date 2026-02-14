import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Infinity, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ForeverPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroTitle = heroRef.current?.querySelector('h1');
            const heroSub = heroRef.current?.querySelector('.hero-sub');

            if (heroTitle) {
                gsap.fromTo(heroTitle,
                    { y: 100, opacity: 0, letterSpacing: '0.2em' },
                    { y: 0, opacity: 1, letterSpacing: 'normal', duration: 2.5, ease: 'power4.out', delay: 0.5 }
                );
            }

            if (heroSub) {
                gsap.fromTo(heroSub,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: 'power4.out', delay: 1 }
                );
            }

            const infinityIcon = heroRef.current?.querySelector('.forever-sign');
            if (infinityIcon) {
                gsap.fromTo(infinityIcon,
                    { opacity: 0, scale: 0.5, rotateY: 90 },
                    { opacity: 0.6, scale: 1, rotateY: 0, duration: 3, ease: 'power2.out', delay: 1.5 }
                );

                // Floating animation
                gsap.to(infinityIcon, {
                    y: '+=20',
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

            // Cinematic reveal
            gsap.utils.toArray('.cinematic-section').forEach((section: any) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
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
            <section ref={heroRef} className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/forever-ring.jpg"
                        alt="Forever - Diamond Ring with Red Roses"
                        className="w-full h-full object-cover opacity-50 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <div className="forever-sign flex flex-col items-center justify-center mb-8 opacity-0">
                        <Infinity className="w-16 h-16 text-rose-500/60 mb-2" />
                        <Heart className="w-8 h-8 text-rose-500/40 fill-rose-500/10" />
                    </div>
                    <span className="hero-sub block text-rose-500/80 tracking-[0.8em] uppercase text-xs mb-8">Final Chapter</span>
                    <h1 className="text-7xl md:text-[12rem] font-display mb-12 leading-none">Forever</h1>
                    <p className="hero-sub max-w-2xl mx-auto text-lg text-white/40 font-light tracking-[0.2em] uppercase">
                        Beyond time, beyond words, beyond everything.
                    </p>
                </div>
            </section>

            {/* Grand Vision Section */}
            <section className="py-48 px-6 text-center cinematic-section">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-display mb-16 tracking-tight">The Horizon of Us</h2>
                    <div className="space-y-12 text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                        <p>
                            We don't just exist in the now; we exist in the eternal. Like the bloom that never fades, our love has transformed from a moment into a legacy.
                        </p>
                        <p>
                            It is the road that has no end, the sky that has no boundary, the song that never stops playing. It is the quiet certainty of knowing that whenever I reach out my hand, yours will be there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Visual Break */}
            <section className="relative h-screen w-full overflow-hidden cinematic-section">
                <img src="/couple-beach.jpg" alt="Eternal" className="w-full h-full object-cover opacity-40 absolute" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="text-center">
                        <div className="text-rose-500/40 text-8xl md:text-[15rem] font-display opacity-20 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                            ETERNAL
                        </div>
                        <p className="relative z-10 text-2xl md:text-4xl font-display max-w-2xl mx-auto leading-tight italic">
                            "And thus, the story doesn't end. It simply becomes part of the stars."
                        </p>
                    </div>
                </div>
            </section>

            {/* New Photo Collage Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto cinematic-section">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="relative aspect-[4/5] overflow-hidden">
                        <img src="/rose-hero.jpg" alt="Forever 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-sm font-display text-white/80">Eternal Bloom</p>
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden">
                        <img src="/couple-romance.jpg" alt="Forever 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-sm font-display text-white/80">Timeless Love</p>
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden col-span-2 md:col-span-1">
                        <img src="/ring-detail.jpg" alt="Forever 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-sm font-display text-white/80">Infinite Promise</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Thought */}
            <section className="py-48 flex flex-col items-center justify-center cinematic-section">
                <div className="w-[1px] h-32 bg-gradient-to-b from-rose-500 to-transparent mb-16" />
                <h3 className="text-3xl font-display mb-12">Thank you for being my story.</h3>
                <Link to="/" className="px-16 py-5 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-700 tracking-[0.3em] font-light uppercase text-sm">
                    Return to the Beginning
                </Link>
            </section>
        </div>
    );
}
