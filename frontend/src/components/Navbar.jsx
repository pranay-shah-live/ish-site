import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/our-work', label: 'Our Work' },
  { path: '/our-team', label: 'Our Team' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled ? 'bg-white border-b-2 border-black' : 'bg-white border-b-2 border-black'
      }`}
      role="navigation"
      aria-label="Main navigation"
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="India Signing Hands - Home"
          data-testid="nav-logo"
        >
          <span className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground">
            ISH
          </span>
          <span className="hidden sm:block w-0.5 h-6 bg-black" aria-hidden="true" />
          <span className="hidden sm:block font-body text-xs font-medium text-muted-foreground uppercase tracking-widest leading-tight">
            India Signing<br />Hands
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-heading text-sm uppercase tracking-widest transition-colors duration-150 ${
                pathname === link.path
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-foreground hover:text-primary'
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              aria-current={pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917208302075"
            className="brutalist-btn bg-primary text-white px-5 py-2.5 text-sm"
            data-testid="nav-call-button"
          >
            <Phone size={16} aria-hidden="true" />
            Call Us
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          data-testid="mobile-menu-toggle"
        >
          {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden bg-white border-t-2 border-black px-4 py-6 space-y-1"
          role="menu"
          data-testid="mobile-menu"
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              role="menuitem"
              className={`block font-heading text-xl uppercase tracking-wide py-3 border-b border-gray-200 ${
                pathname === link.path ? 'text-primary' : 'text-foreground'
              }`}
              data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917208302075"
            className="block text-center mt-4 brutalist-btn bg-primary text-white px-6 py-3 text-base w-full"
            data-testid="mobile-call-button"
          >
            <Phone size={18} className="inline mr-2" aria-hidden="true" />
            Call Us
          </a>
        </div>
      )}
    </nav>
  );
}
