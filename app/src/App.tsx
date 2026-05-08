import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router-dom';

import Hero from './sections/Hero';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import QuoteSection from './sections/QuoteSection';
import ContinueJourney from './sections/ContinueJourney';
import StatsSection from './sections/StatsSection';
import Layout from './components/Layout';
import FullGalleryPage from './pages/FullGalleryPage';
import BeginningPage from './pages/BeginningPage';
import JourneyPage from './pages/JourneyPage';
import MomentsPage from './pages/MomentsPage';
import PromisesPage from './pages/PromisesPage';
import ForeverPage from './pages/ForeverPage';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

// Story content data
const storySections = [
  {
    id: 'our-story',
    title: 'A Uniquely Romantic Expression',
    subtitle: 'OUR STORY',
    content:
      'Every love story is beautiful, but ours is my favorite. From the moment Smriti and I crossed paths, I knew something extraordinary had begun. Like the Black Baccara rose that blooms in the darkest hours, our love found its light in the most unexpected place. This is the story of us — of laughter, of growth, and of choosing each other every single day.',
    imageSrc: '/A.jpeg',
    imagePosition: 'right' as const,
    backgroundStyle: 'dark' as const,
  },
  {
    id: 'the-beginning',
    title: 'The Beginning',
    subtitle: 'CHAPTER ONE',
    content:
      'It started with a message, a smile through the screen, a conversation that felt like coming home. In a world full of strangers, Smriti and I found each other. The road to love is never straight, but every twist and turn led us to this moment. Two souls, one journey, infinite possibilities.',
    imageSrc: '/ring-detail.jpg',
    imagePosition: 'left' as const,
    backgroundStyle: 'image' as const,
  },
  {
    id: 'the-journey',
    title: 'The Journey',
    subtitle: 'CHAPTER TWO',
    content:
      'Together, Smriti and I have walked through storms and sunshine, hand in hand, heart to heart. Every challenge has only made us stronger, every joy has made us grateful. Like petals falling in slow motion, our moments together create a tapestry of memories that will last forever.',
    imageSrc: '/B.jpeg',
    imagePosition: 'right' as const,
    backgroundStyle: 'dark' as const,
  },
];

// Gallery images with selective zoom effects
const galleryImages = [
  { src: '/rose-hero.jpg', alt: 'The Rose', span: 'large' as const, zoomEffect: 'ken-burns' as const },
  { src: '/A.jpeg', alt: 'Our Moment', span: 'medium' as const, zoomEffect: 'slow-zoom' as const },
  { src: '/ring-detail.jpg', alt: 'The Promise', span: 'small' as const, zoomEffect: 'parallax-zoom' as const },
  { src: '/rose-petals.jpg', alt: 'Falling Petals', span: 'small' as const, zoomEffect: 'ken-burns' as const },
  { src: '/pattern-detail.jpg', alt: 'Our Pattern', span: 'medium' as const, zoomEffect: 'slow-zoom' as const },
  { src: '/B.jpeg', alt: 'Together in Hetauda, Nepal 2025', span: 'large' as const, zoomEffect: 'parallax-zoom' as const },
];

function HomePage({ startEntrance }: { startEntrance: boolean }) {
  return (
    <main className="relative">
      <Hero startEntrance={startEntrance} />
      {storySections.map((section) => (
        <StorySection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          content={section.content}
          imageSrc={section.imageSrc}
          imagePosition={section.imagePosition}
          backgroundStyle={section.backgroundStyle}
        />
      ))}
      <QuoteSection
        id="the-promise"
        quote="In every moment we share, there are echoes of our journey together. From the first message to the promise of forever, our love story continues to unfold like the petals of an eternal rose."
        author="ETERNAL LOVE"
        role="A LOVE STORY"
      />
      <GallerySection id="gallery" title="Moments Captured" images={galleryImages} />
      <StatsSection />
      <ContinueJourney />
      <QuoteSection
        id="forever"
        quote="Forever is not a destination, but a journey we choose to take together, one beautiful moment at a time."
        author="FOR THE GIRL WHO BECAME HOME"
        backgroundImage="/assets/forever-ring.jpg"
      />
    </main>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [startEntrance, setStartEntrance] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.id = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };

    // Cursor hover effects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'rgba(139, 21, 56, 0.8)';
      }
    };

    const handleMouseOut = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(139, 21, 56, 0.5)';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animateFollower();

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', updateProgress);
      cursor.remove();
      follower.remove();
      progressBar.remove();
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Reduced delay before starting hero entrance for a snappier transition
    setTimeout(() => setStartEntrance(true), 300);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`transition-opacity duration-2000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <SmoothScroll>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage startEntrance={startEntrance} />} />
              <Route path="/gallery" element={<FullGalleryPage />} />
              <Route path="/beginning" element={<BeginningPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/moments" element={<MomentsPage />} />
              <Route path="/promises" element={<PromisesPage />} />
              <Route path="/forever" element={<ForeverPage />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </div>
    </div>
  );
}

export default App;
