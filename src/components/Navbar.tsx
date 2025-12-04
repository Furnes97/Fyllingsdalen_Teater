import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Hjem', path: '/' },
    { name: 'Ronja Røverdatter', path: '/ronja-roverdatter' },
    { name: 'Hakkebakkeskogen', path: '/hakkebakkeskogen' },
    { name: 'I Blanke messingen', path: '/i-blanke-messingen' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToDates = () => {
    const element = document.getElementById('dates');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  // Only show button on play pages (not home page)
  const isPlayPage = location.pathname !== '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-theater-primary/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-theater-accent font-serif text-xl font-bold">Fyllingsdalen Teater</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-theater-accent bg-white/5'
                      : 'text-theater-light hover:text-theater-accent hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isPlayPage && (
                <button
                  onClick={scrollToDates}
                  className="ml-4 rounded-full bg-theater-accent px-6 py-2 text-sm font-semibold text-theater-primary transition-all hover:bg-white hover:text-theater-primary"
                >
                  Bestill billetter
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-theater-light hover:text-theater-accent hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-theater-primary border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-theater-accent bg-white/5'
                    : 'text-theater-light hover:text-theater-accent hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isPlayPage && (
              <button
                onClick={scrollToDates}
                className="block w-full mt-2 rounded-full bg-theater-accent px-6 py-3 text-base font-semibold text-theater-primary transition-all hover:bg-white hover:text-theater-primary"
              >
                Bestill billetter
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

