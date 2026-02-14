import { useEffect, useRef, type ReactElement } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
    children: ReactElement;
    amount?: number; // Strength of the magnetic effect
    className?: string; // Optional wrapper class
}

export default function Magnetic({ children, amount = 0.3 }: MagneticProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const xTo = gsap.quickTo(container, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(container, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = container.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * amount);
            yTo(y * amount);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [amount]);

    return (
        <div ref={containerRef} className="inline-block cursor-pointer">
            {children}
        </div>
    );
}
