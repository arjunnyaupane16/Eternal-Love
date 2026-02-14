import { useEffect } from 'react';

export function useScrollToTop() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });

    // Also handle beforeunload to ensure scroll position is reset
    const handleBeforeUnload = () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export function useSmoothScroll() {
  useEffect(() => {
    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}
