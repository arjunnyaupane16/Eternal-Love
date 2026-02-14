import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Search, X, Heart } from 'lucide-react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling when open
            document.body.style.overflow = 'hidden';

            const ctx = gsap.context(() => {
                // Overlay entrance
                gsap.to(overlayRef.current, {
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: 'power3.inOut'
                });

                // Content slide up
                gsap.fromTo(contentRef.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
                );

                // Auto focus input after animation
                setTimeout(() => inputRef.current?.focus(), 800);
            }, overlayRef);

            return () => ctx.revert();
        } else {
            document.body.style.overflow = 'auto';
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                duration: 0.6,
                ease: 'power3.inOut'
            });
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl invisible opacity-0 flex items-center justify-center p-6"
            onKeyDown={handleKeyDown}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors duration-300 group p-4"
                aria-label="Close search"
            >
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div ref={contentRef} className="w-full max-w-4xl opacity-0 transform translate-y-24">
                <div className="text-center mb-16">
                    <Heart className="w-12 h-12 text-[#6B0F1A]/50 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl md:text-5xl font-display tracking-[0.3em] text-white font-light uppercase">
                        Find Her Heart
                    </h2>
                    <div className="w-24 h-[1px] bg-[#6B0F1A]/30 mx-auto mt-8" />
                </div>

                <div className="relative group">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/20 group-focus-within:text-[#6B0F1A] transition-colors duration-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search for a moment, a quote, a memory..."
                        className="w-full bg-transparent border-b border-white/10 py-8 pl-14 pr-4 text-2xl md:text-3xl font-light tracking-wide text-white focus:outline-none focus:border-[#6B0F1A] transition-all duration-700 placeholder:text-white/10"
                    />
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6">
                    {['The Beginning', 'Roses', 'Promises', 'Forever'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSearchValue(tag)}
                            className="text-xs tracking-[0.4em] text-white/30 hover:text-[#6B0F1A] transition-all duration-300 uppercase py-2 px-4 border border-white/5 hover:border-[#6B0F1A]/30"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-white/20 text-sm italic font-light tracking-widest">
                        {searchValue ? `Searching the depths for "${searchValue}"...` : "Type to explore our timeless story."}
                    </p>
                </div>
            </div>
        </div>
    );
}
