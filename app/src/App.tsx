import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router-dom';

import Hero from './sections/Hero';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import QuoteSection from './sections/QuoteSection';
import ContinueJourney from './sections/ContinueJourney';
import Layout from './components/Layout';
import FullGalleryPage from './pages/FullGalleryPage';
import BeginningPage from './pages/BeginningPage';
import JourneyPage from './pages/JourneyPage';
import MomentsPage from './pages/MomentsPage';
import PromisesPage from './pages/PromisesPage';
import ForeverPage from './pages/ForeverPage';
import { useSmoothScroll } from './hooks/useScrollToTop';

gsap.registerPlugin(ScrollTrigger);

// Story content data
const storySections = [
  {
    id: 'our-story',
    title: 'A Uniquely Romantic Expression',
    subtitle: 'OUR STORY',
    content:
      'Every love story is beautiful, but ours is my favorite. From the moment our paths crossed, I knew something extraordinary had begun. Like the Black Baccara rose that blooms in the darkest hours, our love found its light in the most unexpected place. This is the story of us—of laughter, of growth, of choosing each other every single day.',
    imageSrc: '/couple-romance.jpg',
    imagePosition: 'right' as const,
    backgroundStyle: 'dark' as const,
  },
  {
    id: 'the-beginning',
    title: 'The Beginning',
    subtitle: 'CHAPTER ONE',
    content:
      'It started with a glance, a smile, a conversation that felt like coming home. In a world full of strangers, we found each other. The road to love is never straight, but every twist and turn led us to this moment. Two souls, one journey, infinite possibilities.',
    imageSrc: '/ring-detail.jpg',
    imagePosition: 'left' as const,
    backgroundStyle: 'image' as const,
  },
  {
    id: 'the-journey',
    title: 'The Journey',
    subtitle: 'CHAPTER TWO',
    content:
      'Together we have walked through storms and sunshine, hand in hand, heart to heart. Every challenge has only made us stronger, every joy has made us grateful. Like petals falling in slow motion, our moments together create a tapestry of memories that will last forever.',
    imageSrc: '/couple-beach.jpg',
    imagePosition: 'right' as const,
    backgroundStyle: 'dark' as const,
  },
];

// Gallery images with selective zoom effects
const galleryImages = [
  { src: '/rose-hero.jpg', alt: 'The Rose', span: 'large' as const, zoomEffect: 'ken-burns' as const },
  { src: '/couple-romance.jpg', alt: 'Our Moment', span: 'medium' as const, zoomEffect: 'slow-zoom' as const },
  { src: '/ring-detail.jpg', alt: 'The Promise', span: 'small' as const, zoomEffect: 'parallax-zoom' as const },
  { src: '/rose-petals.jpg', alt: 'Falling Petals', span: 'small' as const, zoomEffect: 'ken-burns' as const },
  { src: '/pattern-detail.jpg', alt: 'Our Pattern', span: 'medium' as const, zoomEffect: 'slow-zoom' as const },
  { src: '/couple-beach.jpg', alt: 'Together', span: 'large' as const, zoomEffect: 'parallax-zoom' as const },
];

function HomePage() {
  return (
    <main className="relative">
      <Hero />
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
        quote="In every moment we share, there are echoes of our journey together. From the first hello to the promise of forever, our love story continues to unfold like the petals of an eternal rose."
        author="ETERNAL LOVE"
        role="A LOVE STORY"
      />
      <GallerySection id="gallery" title="Moments Captured" images={galleryImages} />
      <ContinueJourney />
      <QuoteSection
        id="forever"
        quote="Forever is not a destination, but a journey we choose to take together, one beautiful moment at a time."
        author="FOR HER"
        backgroundImage="/assets/forever-ring.jpg"
      />
    </main>
  );
}

function App() {
  useSmoothScroll();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<FullGalleryPage />} />
          <Route path="/beginning" element={<BeginningPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/promises" element={<PromisesPage />} />
          <Route path="/forever" element={<ForeverPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
