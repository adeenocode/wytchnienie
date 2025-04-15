import React from 'react';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-gray-600 hover:text-beige-400 transition-colors"
    >
      {children}
    </a>
  );
}

export function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block text-gray-600 hover:text-beige-400 transition-colors"
    >
      {children}
    </a>
  );
}