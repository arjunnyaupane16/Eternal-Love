import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Delay a bit before calling onComplete to let the exit animation breath
                    gsap.delayedCall(0.5, onComplete);
                }
            });

            // Initial state
            gsap.set(logoRef.current, { opacity: 0, scale: 0.9, y: 20 });
            gsap.set(textRef.current, { opacity: 0, y: 20 });
            gsap.set(progressRef.current, { scaleX: 0 });

            tl.to(logoRef.current, {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power4.out',
            })
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power3.out',
                }, '-=0.8')
                .to(progressRef.current, {
                    scaleX: 1,
                    duration: 2.0,
                    ease: 'slow(0.7, 0.7, false)',
                }, '-=1.2')
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    delay: 0.2,
                });

            // Subtle logo pulse
            gsap.to(logoRef.current, {
                scale: 1.05,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6B0F1A]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Logo Content */}
            <div className="relative z-10 flex flex-col items-center">
                <div ref={logoRef} className="mb-12">
                    <div className="w-32 h-32 md:w-48 md:h-48 border border-white/10 flex items-center justify-center relative group">
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#6B0F1A]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#6B0F1A]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#6B0F1A]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#6B0F1A]" />

                        <span className="font-display text-5xl md:text-7xl font-light tracking-[0.3em] text-[#6B0F1A]">
                            EL
                        </span>
                    </div>
                </div>

                <div ref={textRef} className="text-center">
                    <h2 className="text-white/40 text-[10px] md:text-xs tracking-[0.8em] font-light uppercase">
                        Eternal Love Presents
                    </h2>
                    <div className="mt-8 w-48 h-[1px] bg-white/5 relative mx-auto overflow-hidden">
                        <div ref={progressRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6B0F1A] to-transparent origin-left" />
                    </div>
                </div>
            </div>

            {/* Poetic Quote at Bottom */}
            <div className="absolute bottom-12 text-center">
                <p className="text-white/20 text-[8px] tracking-[0.4em] uppercase font-light">
                    Where devotion meets the infinite
                </p>
            </div>
        </div>
    );
}
