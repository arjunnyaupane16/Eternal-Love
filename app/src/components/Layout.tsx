import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Scroll to top on route change (moved from App.tsx/ScrollToTop component)
    useScrollToTop();

    return (
        <div className="relative min-h-screen bg-black text-white">
            <Header onMenuClick={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <main>
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </main>

            <Footer />
        </div>
    );
}
