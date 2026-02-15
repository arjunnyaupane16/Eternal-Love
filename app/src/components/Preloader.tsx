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
    const petalsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const petalsContainer = petalsContainerRef.current;

            // Create realistic floating rose petals with photorealistic texture
            const createPetals = () => {
                if (!petalsContainer) return [];

                const petals: HTMLDivElement[] = [];
                const numPetals = 25;

                // More organic petal shapes
                const petalShapes = [
                    'path("M 50 0 Q 80 5, 90 25 Q 100 50, 95 75 Q 85 95, 50 100 Q 15 95, 5 75 Q 0 50, 10 25 Q 20 5, 50 0")',
                    'path("M 50 5 Q 75 8, 88 20 Q 98 40, 95 65 Q 88 88, 50 95 Q 12 88, 5 65 Q 2 40, 12 20 Q 25 8, 50 5")',
                    'path("M 50 0 Q 65 10, 70 30 Q 75 60, 70 80 Q 60 98, 50 100 Q 40 98, 30 80 Q 25 60, 30 30 Q 35 10, 50 0")',
                    'path("M 45 0 Q 70 12, 85 30 Q 95 55, 88 78 Q 75 95, 50 100 Q 25 92, 10 70 Q 5 45, 15 22 Q 30 5, 45 0")',
                ];

                for (let i = 0; i < numPetals; i++) {
                    const petal = document.createElement('div');
                    petal.style.position = 'absolute';
                    const size = 40 + Math.random() * 30;
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size * 1.3}px`;
                    petal.style.clipPath = petalShapes[Math.floor(Math.random() * petalShapes.length)];

                    // Exact color match for "dark blood red" request
                    // Primary colors: Deep Blood, Burgundy, Black Cherry, Dried Rose
                    const baseHue = 345 + Math.random() * 15; // Deep Crimson/Blood Red range
                    const lightness = 6 + Math.random() * 8; // Extremely dark (6-14%) - "Congealed blood" look
                    const saturation = 75 + Math.random() * 20; // Rich, intense saturation even in dark

                    // Deep, velvety blood petal texture
                    petal.style.background = `
                        radial-gradient(ellipse at 30% 20%, 
                            hsla(${baseHue + 5}, ${saturation}%, ${lightness + 12}%, 0.95) 0%, 
                            hsla(${baseHue}, ${saturation + 5}%, ${lightness + 5}%, 0.95) 40%,
                            transparent 60%),
                        radial-gradient(ellipse at 70% 80%, 
                            hsla(${baseHue - 10}, ${saturation - 10}%, ${lightness - 4}%, 0.95) 0%, 
                            transparent 50%),
                        radial-gradient(ellipse at 50% 50%, 
                            hsla(${baseHue}, ${saturation}%, ${lightness + 2}%, 1) 0%, 
                            hsla(${baseHue - 5}, ${saturation - 5}%, ${lightness - 2}%, 1) 60%, 
                            hsla(0, ${saturation - 15}%, ${lightness - 5}%, 1) 100%)
                    `;

                    petal.style.opacity = '0';
                    // Realistic shadow for depth (velvety look)
                    petal.style.filter = `
                        drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))
                        drop-shadow(0 2px 4px rgba(40, 0, 10, 0.7))
                        brightness(${0.85 + Math.random() * 0.25})
                        contrast(1.35)
                        saturate(1.2)
                    `;
                    petal.style.transformOrigin = 'center center';

                    // Intensified velvety texture - Deep Red tint
                    petal.style.boxShadow = `
                        inset 0 0 30px rgba(0, 0, 0, 0.8),
                        inset -5px -5px 20px rgba(20, 0, 5, 0.8),
                        inset 5px 5px 20px rgba(100, 0, 20, 0.4)
                    `;

                    // Removed smoke for natural look

                    // Random starting position from all edges
                    const edge = Math.floor(Math.random() * 4);
                    let startX, startY;

                    if (edge === 0) { // Top
                        startX = Math.random() * window.innerWidth;
                        startY = -100 - Math.random() * 100;
                    } else if (edge === 1) { // Right
                        startX = window.innerWidth + 100;
                        startY = Math.random() * window.innerHeight;
                    } else if (edge === 2) { // Bottom
                        startX = Math.random() * window.innerWidth;
                        startY = window.innerHeight + 100;
                    } else { // Left
                        startX = -100;
                        startY = Math.random() * window.innerHeight;
                    }

                    petal.style.left = `${startX}px`;
                    petal.style.top = `${startY}px`;

                    petalsContainer.appendChild(petal);
                    petals.push(petal);
                }

                return petals;
            };

            const petals = createPetals();

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(0.5, onComplete);
                }
            });

            // Initial state
            gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' });
            gsap.set(textRef.current, { opacity: 0, y: 20 });
            gsap.set(progressRef.current, { scaleX: 0 });

            // Animate petals with natural, organic motion
            petals.forEach((petal, i) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                // Create spiral/circular gathering pattern
                const angle = (i / petals.length) * Math.PI * 2 + Math.random() * 0.5;
                const radius = 150 + Math.random() * 200;
                const endX = centerX + Math.cos(angle) * radius - 20;
                const endY = centerY + Math.sin(angle) * radius - 25;

                // Natural floating motion with drift
                const driftX = (Math.random() - 0.5) * 100;
                const driftY = (Math.random() - 0.5) * 80;

                const petalTl = gsap.timeline();

                // Float in with organic motion
                petalTl.to(petal, {
                    left: endX + driftX,
                    top: endY + driftY,
                    opacity: 0.6 + Math.random() * 0.35,
                    rotation: Math.random() * 720 - 360,
                    duration: 2.5 + Math.random() * 1.5,
                    ease: 'power1.inOut',
                    delay: i * 0.08,
                }, 0);

                // Gentle floating/bobbing motion while visible
                gsap.to(petal, {
                    y: '+=20',
                    x: '+=15',
                    rotation: '+=30',
                    duration: 2 + Math.random() * 1,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: 2 + i * 0.08,
                });
            });

            // Logo entrance - more dramatic
            tl.to(logoRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 2.0,
                ease: 'power3.out',
            }, 1.5)
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                }, '-=1.0')
                .to(progressRef.current, {
                    scaleX: 1,
                    duration: 2.5,
                    ease: 'power1.inOut',
                }, '-=1.5')
                // Petals gracefully fade and drift away
                .to(petals, {
                    opacity: 0,
                    y: '+=60',
                    rotation: '+=180',
                    scale: 0.7,
                    duration: 1.8,
                    stagger: {
                        each: 0.04,
                        from: 'random'
                    },
                    ease: 'power2.in',
                }, '+=0.5')
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.0,
                    ease: 'power4.inOut',
                }, '-=0.3');

            // Subtle logo pulse
            gsap.to(logoRef.current, {
                scale: 1.03,
                duration: 3.5,
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
            {/* Floating Rose Petals Container */}
            <div ref={petalsContainerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden" />

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

                        {/* Rolls-Royce Style EL Logo - Overlapping Monogram */}
                        <svg
                            viewBox="0 0 200 200"
                            className="w-24 h-24 md:w-36 md:h-36"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Gradient for metallic rose effect */}
                                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#A01D3F', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#6B0F1A', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#4A0A14', stopOpacity: 1 }} />
                                </linearGradient>

                                {/* Shine gradient */}
                                <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#D4A574', stopOpacity: 0.3 }} />
                                    <stop offset="50%" style={{ stopColor: '#8B1538', stopOpacity: 0.1 }} />
                                    <stop offset="100%" style={{ stopColor: '#D4A574', stopOpacity: 0.3 }} />
                                </linearGradient>
                            </defs>

                            {/* Outer decorative rectangle - Rolls-Royce style with Animated Trace */}
                            <rect
                                x="30" y="50"
                                width="140" height="100"
                                fill="none"
                                stroke="#A01D3F"
                                strokeWidth="0.5"
                                opacity="0.3"
                                rx="2"
                            />
                            {/* Animated Trace Line - Dark Red La Noir Droptail Color */}
                            <rect
                                x="30" y="50"
                                width="140" height="100"
                                fill="none"
                                stroke="#6B0F1A"
                                strokeWidth="2"
                                rx="2"
                                strokeDasharray="480"
                                strokeDashoffset="480"
                                className="animate-trace-line"
                            />
                            <style>{`
                                @keyframes trace-line {
                                    0% { stroke-dashoffset: 480; }
                                    100% { stroke-dashoffset: 0; }
                                }
                                .animate-trace-line {
                                    animation: trace-line 4s linear infinite;
                                }
                            `}</style>

                            {/* Inner rectangle */}
                            <rect
                                x="35" y="55"
                                width="130" height="90"
                                fill="black"
                                stroke="url(#roseGradient)"
                                strokeWidth="1.5"
                                rx="1"
                            />

                            {/* Overlapping EL Monogram - True RR Style with Shared Vertical Strokes */}
                            <g transform="translate(100, 100)">
                                {/* Left vertical stroke (shared by both E and mirrored R-style) */}
                                <rect x="-32" y="-28" width="7" height="56" fill="url(#roseGradient)" />
                                <rect x="-31" y="-27" width="1.5" height="54" fill="url(#shineGradient)" opacity="0.6" />

                                {/* Center shared vertical stroke - THE KEY TO RR LOOK */}
                                <rect x="-3.5" y="-28" width="7" height="56" fill="url(#roseGradient)" />
                                <rect x="-2.5" y="-27" width="1.5" height="54" fill="url(#shineGradient)" opacity="0.7" />

                                {/* Right vertical stroke */}
                                <rect x="25" y="-28" width="7" height="56" fill="url(#roseGradient)" />
                                <rect x="26" y="-27" width="1.5" height="54" fill="url(#shineGradient)" opacity="0.6" />

                                {/* E - Left side horizontals */}
                                <rect x="-32" y="-28" width="36" height="6" fill="url(#roseGradient)" />
                                <rect x="-32" y="-3" width="32" height="6" fill="url(#roseGradient)" />
                                <rect x="-32" y="22" width="36" height="6" fill="url(#roseGradient)" />

                                {/* L - Right side horizontal (only bottom) */}
                                <rect x="-3.5" y="22" width="35.5" height="6" fill="url(#roseGradient)" />

                                {/* Decorative serifs for premium look */}
                                <rect x="-34" y="-28" width="2" height="6" fill="#A01D3F" opacity="0.8" />
                                <rect x="-34" y="22" width="2" height="6" fill="#A01D3F" opacity="0.8" />
                                <rect x="30" y="22" width="2" height="6" fill="#A01D3F" opacity="0.8" />
                            </g>

                            {/* Top decorative line */}
                            <line x1="45" y1="60" x2="155" y2="60" stroke="#6B0F1A" strokeWidth="0.5" opacity="0.5" />

                            {/* Bottom decorative line */}
                            <line x1="45" y1="140" x2="155" y2="140" stroke="#6B0F1A" strokeWidth="0.5" opacity="0.5" />

                            {/* Corner accents */}
                            <circle cx="40" cy="60" r="2" fill="#A01D3F" opacity="0.7" />
                            <circle cx="160" cy="60" r="2" fill="#A01D3F" opacity="0.7" />
                            <circle cx="40" cy="140" r="2" fill="#A01D3F" opacity="0.7" />
                            <circle cx="160" cy="140" r="2" fill="#A01D3F" opacity="0.7" />
                        </svg>
                    </div>
                </div>

                <div ref={textRef} className="text-center">
                    <h2 className="text-white/40 text-[10px] md:text-xs tracking-[0.8em] font-light uppercase">
                        Eternal Love Presents
                    </h2>
                    <div className="mt-8 w-48 h-[1px] bg-white/5 relative mx-auto overflow-hidden">
                        <div ref={progressRef} className="absolute inset-0 bg-[#6B0F1A] origin-left">
                            {/* Shimmer/Float effect on the line itself - INCREASED WIDTH */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[80%] h-full animate-shimmer-fast" />
                        </div>
                    </div>
                    <style>{`
                        @keyframes shimmer-fast {
                            0% { transform: translateX(-150%); }
                            100% { transform: translateX(250%); }
                        }
                        .animate-shimmer-fast {
                            animation: shimmer-fast 1.5s infinite linear;
                        }
                    `}</style>
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
