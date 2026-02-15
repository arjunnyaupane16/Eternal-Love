import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 2.2, // Increased for very slow, smooth drift
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Reduced for heavier feel
            touchMultiplier: 1.5, // Natural touch feel
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll with GSAP's ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenisRef.current = null;
        };
    }, []);

    // RESET SCROLL ON ROUTE CHANGE
    useEffect(() => {
        if (lenisRef.current) {
            // Immediate scroll to top when path changes
            lenisRef.current.scrollTo(0, { immediate: true });
            // Also force ScrollTrigger refresh
            ScrollTrigger.refresh();
        } else {
            // Fallback for when lenis isn't ready yet
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return <>{children}</>;
}
