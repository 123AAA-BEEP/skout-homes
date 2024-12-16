'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  type?: 'dropdown';
  items?: { label: string; href: string }[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathname = usePathname();
  const phoneNumber = '+14167106846';

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdownIndex !== null && 
          dropdownRefs.current[openDropdownIndex] && 
          !dropdownRefs.current[openDropdownIndex]?.contains(event.target as Node)) {
        setOpenDropdownIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownIndex]);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdownIndex(null);
  }, [pathname]);

  const menuItems: MenuItem[] = [
    { label: "Find an Agent", href: "/find-realtor" },
    { label: "Home Valuation", href: "/tools/home-value-estimator" },
    { label: "Tax Calculator", href: "/tools/land-transfer-tax-calculator" },
    {
      label: "Cities",
      type: "dropdown",
      href: "#",
      items: [
        { label: "Toronto", href: "/toronto" },
        { label: "Mississauga", href: "/mississauga" },
        { label: "Vaughan", href: "/vaughan" },
        { label: "Oakville", href: "/oakville" },
        { label: "Burlington", href: "/burlington" },
        { label: "Brampton", href: "/brampton" },
        { label: "Milton", href: "/milton" },
        { label: "Halton Hills", href: "/halton-hills" },
        { label: "Markham", href: "/markham" }
      ]
    }
  ];

  const handleDropdownKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Escape') {
      setOpenDropdownIndex(null);
    } else if (e.key === 'ArrowDown' && openDropdownIndex === index) {
      e.preventDefault();
      const firstItem = e.currentTarget.querySelector('a');
      firstItem?.focus();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, items: MenuItem['items'], currentIndex: number) => {
    if (!items) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextItem = e.currentTarget.parentElement?.nextElementSibling?.querySelector('a');
      if (nextItem) nextItem.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevItem = e.currentTarget.parentElement?.previousElementSibling?.querySelector('a');
      if (prevItem) prevItem.focus();
      else dropdownRefs.current[currentIndex]?.querySelector('button')?.focus();
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="Skout Homes Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="text-xl font-bold">Skout Homes</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item, index) => 
              item.type === 'dropdown' ? (
                <div 
                  key={index} 
                  className="relative" 
                  ref={(el: HTMLDivElement | null) => {
                    if (dropdownRefs.current) {
                      dropdownRefs.current[index] = el;
                    }
                  }}
                  onKeyDown={e => handleDropdownKeyDown(e, index)}
                >
                  <button
                    onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    aria-expanded={openDropdownIndex === index}
                    aria-controls={`dropdown-menu-${index}`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 transition-transform ${openDropdownIndex === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdownIndex === index && (
                    <div 
                      id={`dropdown-menu-${index}`}
                      className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48"
                      role="menu"
                    >
                      {item.items?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                          role="menuitem"
                          onClick={() => setOpenDropdownIndex(null)}
                          onKeyDown={e => handleItemKeyDown(e, item.items, index)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md"
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={`tel:${phoneNumber}`}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label="Call us now"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-200 py-2">
            {menuItems.map((item, index) => 
              item.type === 'dropdown' ? (
                <div key={index} className="py-2">
                  <div className="px-4 py-2 font-medium text-gray-900">{item.label}</div>
                  <div className="pl-8 space-y-2">
                    {item.items?.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block py-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={`tel:${phoneNumber}`}
              className="block px-4 py-2 text-green-600 font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-label="Call us now"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
} 