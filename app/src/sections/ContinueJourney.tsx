import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const journeyCards = [
    {
        id: 'the-beginning',
        title: 'The Beginning',
        image: '/ring-detail.jpg',
        description: 'Where our story started.',
        path: '/beginning'
    },
    {
        id: 'the-journey',
        title: 'The Journey',
        image: '/couple-beach.jpg',
        description: 'Every step we took together.',
        path: '/journey'
    },
    {
        id: 'moments',
        title: 'Moments',
        image: '/couple-romance.jpg',
        description: 'Memories etched in time.',
        path: '/moments'
    },
    {
        id: 'promises',
        title: 'Promises',
        image: '/assets/promises-new.jpg',
        description: 'A commitment for tomorrow.',
        path: '/promises'
    },
    {
        id: 'forever',
        title: 'Forever',
        image: '/assets/forever-ring.jpg',
        description: 'Beyond time and space.',
        path: '/forever'
    }
];

export default function ContinueJourney() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current;

        if (!section || !title || !cards) return;

        // Animate Title
        gsap.fromTo(
            title,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
            }
        );

        // Animate Cards Staggered
        const cardElements = Array.from(cards.children);
        gsap.fromTo(
            cardElements,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cards,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 bg-black relative z-10 w-full">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 ref={titleRef} className="text-3xl md:text-5xl font-display text-white mb-4">
                    Continue Your Journey
                </h2>
                <p className="text-white/60 tracking-widest font-light text-sm uppercase">
                    You may also like the following related stories
                </p>
            </div>

            <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {journeyCards.map((card, index) => (
                    <Link
                        to={card.path}
                        key={card.id}
                        className="journey-card group relative aspect-[3/4] overflow-hidden cursor-pointer block"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                            {/* Chapter Number */}
                            <div className="text-rose-500/60 text-xs tracking-[0.3em] uppercase mb-3 font-light">
                                Chapter {index + 1}
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl md:text-4xl font-display mb-4 tracking-tight transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {card.description}
                            </p>

                            {/* Decorative Line */}
                            <div className="w-16 h-[1px] bg-rose-500/50 transform origin-left transition-all duration-500 group-hover:w-32" />
                        </div>

                        {/* Hover Arrow Indicator */}
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
