import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface LightboxProps {
    image: string | null;
    onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [scale, setScale] = useState(1);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        if (image) {
            document.body.style.overflow = 'hidden';
            setScale(1);
            setIsMaximized(false);

            const ctx = gsap.context(() => {
                gsap.to(overlayRef.current, {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: 'power3.inOut'
                });

                gsap.fromTo(imageContainerRef.current,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }
                );
            }, overlayRef);

            return () => ctx.revert();
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [image]);

    const handleZoom = (delta: number) => {
        const newScale = Math.min(Math.max(scale + delta, 1), 3);
        setScale(newScale);
        gsap.to(imageRef.current, {
            scale: newScale,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const toggleMaximize = () => {
        const nextState = !isMaximized;
        setIsMaximized(nextState);
        if (nextState) {
            handleZoom(2 - scale); // Zoom to 2x for "maximized" feel
        } else {
            setScale(1);
            gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    };

    if (!image) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md invisible opacity-0 flex items-center justify-center p-4 md:p-12"
            onClick={onClose}
        >
            {/* Controls */}
            <div
                className="absolute top-8 right-8 flex items-center gap-4 z-20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => handleZoom(0.5)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/10"
                    title="Zoom In"
                >
                    <ZoomIn className="w-5 h-5" />
                </button>
                <button
                    onClick={() => handleZoom(-0.5)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/10"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-5 h-5" />
                </button>
                <button
                    onClick={toggleMaximize}
                    className={`p-3 rounded-full transition-all backdrop-blur-sm border border-white/10 ${isMaximized ? 'bg-[#6B0F1A] text-white' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                        }`}
                    title="Toggle Maximize"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
                <button
                    onClick={onClose}
                    className="p-3 bg-[#6B0F1A] hover:bg-[#8B0000] rounded-full text-white transition-all shadow-xl shadow-[#6B0F1A]/20"
                    title="Close Lightbox"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Image Container */}
            <div
                ref={imageContainerRef}
                className="relative w-full h-full flex items-center justify-center cursor-zoom-out"
                onClick={(e) => {
                    if (scale > 1) {
                        setScale(1);
                        gsap.to(imageRef.current, { scale: 1, duration: 0.4 });
                    } else {
                        onClose();
                    }
                    e.stopPropagation();
                }}
            >
                <div className="relative overflow-hidden max-w-full max-h-full rounded-sm shadow-2xl">
                    <img
                        ref={imageRef}
                        src={image}
                        alt="Cinematic View"
                        className="w-full h-full object-contain select-none pointer-events-none will-change-transform"
                        style={{ maxHeight: '90vh' }}
                    />
                </div>
            </div>

            {/* Caption/Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-light">
                    Use buttons to zoom • Click to exit
                </p>
            </div>
        </div>
    );
}
