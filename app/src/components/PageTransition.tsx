import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Immediate obscure to prevent flash
        gsap.set(el, { opacity: 0, y: 20 });

        const ctx = gsap.context(() => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.1, // Slight delay to ensure render
                clearProps: 'opacity,transform' // Clear after animation so fixed elements work if needed
            });
        }, containerRef);

        return () => ctx.revert();
    }, [location.pathname]); // Re-run on route change

    return (
        <div ref={containerRef} className="w-full min-h-screen">
            {children}
        </div>
    );
}
