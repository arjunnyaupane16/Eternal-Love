import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function JourneyPage() {
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

            // Parallax effect for travel sections
            const parallaxes = gsap.utils.toArray('.parallax-img');
            parallaxes.forEach((img: any) => {
                gsap.to(img, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Text reveal
            const reveals = gsap.utils.toArray('.reveal-text');
            reveals.forEach((text: any) => {
                gsap.fromTo(text,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: text,
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
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/couple-beach.jpg"
                        alt="The Journey"
                        className="w-full h-full object-cover opacity-50 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="hero-sub block text-rose-500/80 tracking-[0.5em] uppercase text-sm mb-4">Chapter Two</span>
                    <h1 className="text-6xl md:text-9xl font-display mb-6 tracking-tighter">The Journey</h1>
                    <div className="hero-sub w-24 h-[1px] bg-rose-500/50 mx-auto" />
                </div>
            </section>

            {/* Travel Narrative */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center mb-32 reveal-text">
                    <h2 className="text-3xl md:text-5xl font-display mb-8">Hand in Hand</h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed">
                        Together we have walked through storms and sunshine, hand in hand, heart to heart. Every challenge has only made us stronger, every joy has made us grateful.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-stretch">
                    <div className="relative h-[600px] overflow-hidden reveal-text">
                        <img
                            src="/couple-romance.jpg"
                            alt="Adventure"
                            className="parallax-img w-full h-[120%] object-cover absolute top-[-10%]"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-12 left-12 right-12">
                            <h3 className="text-2xl font-display mb-4">Wanderlust</h3>
                            <p className="text-sm text-white/70 font-light tracking-wide">
                                From mountain peaks to city streets, every destination was secondary to the person beside me.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-12">
                        <div className="reveal-text">
                            <h3 className="text-2xl font-display mb-4">Quiet Moments</h3>
                            <p className="text-white/70 font-light leading-relaxed">
                                It's in the quiet spaces between the grand adventures that I found the most meaning. The morning coffees, the late-night talks, the simple act of existing together.
                            </p>
                        </div>
                        <div className="reveal-text p-12 border border-white/10 bg-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-display mb-4">The Growth</h3>
                            <p className="text-white/70 font-light leading-relaxed">
                                We are not the same people who started this journey, and that is the beauty of it. We grew together, our roots intertwining like the stems of a rose.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Break */}
            <section className="py-48 px-6 bg-gradient-to-b from-black via-rose-950/20 to-black text-center reveal-text">
                <div className="max-w-3xl mx-auto italic text-3xl md:text-5xl font-display">
                    "Every step we take is a new word in the poem of our lives."
                </div>
            </section>

            {/* Navigation Footer */}
            <section className="py-24 border-t border-white/10 text-center">
                <Link to="/beginning" className="inline-block px-8 py-4 text-white/50 hover:text-white transition-colors tracking-widest uppercase text-xs">
                    ← Previous: The Beginning
                </Link>
                <div className="my-8">
                    <Link to="/" className="inline-block px-12 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-[0.2em] font-light uppercase text-sm">
                        Back to Home
                    </Link>
                </div>
                <div>
                    <Link to="/moments" className="text-rose-400 hover:text-rose-300 transition-colors tracking-widest uppercase text-xs">
                        Next Chapter: Moments →
                    </Link>
                </div>
            </section>
        </div>
    );
}
