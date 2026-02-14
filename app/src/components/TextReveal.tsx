import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    threshold?: number;
    duration?: number;
    stagger?: number;
    as?: React.ElementType;
}

export default function TextReveal({
    children,
    className = '',
    delay = 0,
    threshold = 0.5,
    duration = 1.2,
    stagger = 0.02,
    as: Component = 'p',
}: TextRevealProps) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.char',
                {
                    opacity: 0,
                    y: 20,
                    filter: 'blur(10px)',
                    scale: 1.1,
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    scale: 1,
                    duration: duration,
                    stagger: stagger,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: element,
                        start: `top ${threshold * 100 + 40}%`,
                        toggleActions: 'play none none reverse',
                    },
                    delay: delay,
                }
            );
        }, elementRef);

        return () => ctx.revert();
    }, [children, delay, threshold, duration, stagger]);

    return (
        <Component ref={elementRef} className={`overflow-hidden ${className}`}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true" className="inline-block relative">
                {children.split('').map((char, index) => (
                    <span
                        key={index}
                        className="char inline-block will-change-transform"
                        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </Component>
    );
}
