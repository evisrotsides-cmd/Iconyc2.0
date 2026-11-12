import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, X, Menu, Check } from 'lucide-react';

const SITE = 'https://www.theiconyc.co.za';
const PHONE_DISPLAY = '+27 61 017 9093';
const PHONE_TEL = 'tel:+27610179093';
const EMAIL = 'info@theiconyc.co.za';
const WHATSAPP = 'https://wa.me/27610179093';
const ADDRESS = '32 Cloverdene Rd, Rynfield, Benoni';

const pages = {
  home: {
    title: 'ICONYC | Luxury Apartments & Corporate Stays in Benoni',
    description:
      'Furnished corporate apartments in Rynfield, Benoni, overlooking Ebotse Links and CR Swart Dam. Stays of 1 to 6 months from R32 000 a month.',
    path: '/',
  },
  living: {
    title: 'ICONYC Living | Luxury Residences in Rynfield, Benoni',
    description:
      'Contemporary ICONYC residences with a New York signature above Ebotse Golf & Country Estate in Rynfield, Benoni, with views over CR Swart Dam.',
    path: '/living',
  },
  corporate: {
    title: 'ICONYC Corporate Stays | Furnished Apartments in Benoni',
    description:
      'Four fully furnished ICONYC apartments for corporate stays of 1 to 6 months in Benoni. From R32 000 single or R38 000 double per month, housekeeping included.',
    path: '/corporate-stays',
  },
  availability: {
    title: 'ICONYC Availability | Apartments for Rent in Benoni',
    description:
      'ICONYC apartments available to rent in Benoni, including furnished, unfurnished and corporate stays from R32 000 single / R38 000 double per month.',
    path: '/availability',
  },
  lifestyle: {
    title: 'ICONYC Lifestyle | Pool, Gym and Ebotse Links Views',
    description:
      'Pool, gym, beach volleyball and parkland at ICONYC in Rynfield, Benoni, with fibre internet, 24-hour security and views over Ebotse Links.',
    path: '/lifestyle',
  },
  gallery: {
    title: 'ICONYC Gallery | Residences Overlooking Ebotse Links',
    description:
      'Photographs of ICONYC residences and the estate in Rynfield, Benoni, overlooking the Ebotse Links golf course and CR Swart Dam.',
    path: '/gallery',
  },
  contact: {
    title: 'ICONYC Contact | Enquire About a Stay in Benoni',
    description:
      'Contact ICONYC at 32 Cloverdene Rd, Rynfield, Benoni. Email info@theiconyc.co.za or call +27 61 017 9093 about a viewing or corporate stay.',
    path: '/contact',
  },
} as const;

type PageMeta = { title: string; description: string; path: string };

function pageUrl(path: string) {
  return path === '/' ? `${SITE}/` : `${SITE}${path}`;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function usePageMeta({ title, description, path }: PageMeta) {
  useLayoutEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', pageUrl(path));
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl(path));
  }, [title, description, path]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

type Photo = { src: string; width: number; height: number; alt: string };

function Img({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  eager = false,
}: Photo & { className?: string; priority?: boolean; eager?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority || eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

const heroPhoto: Photo = {
  src: '/images/hero.webp',
  width: 1280,
  height: 853,
  alt: 'Sunset over ICONYC, Ebotse Links and CR Swart Dam in Rynfield, Benoni',
};

const logoPhoto: Photo = {
  src: '/images/logo.webp',
  width: 640,
  height: 152,
  alt: 'ICONYC',
};

// =========================
// Header, Nav, Footer Shell
// =========================
function Shell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white selection:bg-[#C9A968] selection:text-[#0B1220]">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0B1220]/70 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <Img {...logoPhoto} eager className="h-8 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
              <Nav to="/" label="Welcome" />
              <Nav to="/living" label="ICONYC Living" />
              <Nav to="/corporate-stays" label="Corporate Stays" />
              <Nav to="/availability" label="Availability" />
              <Nav to="/lifestyle" label="Lifestyle" />
              <Nav to="/gallery" label="Gallery" />
              <Nav to="/contact" label="Contact" />
            </div>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B1220] lg:hidden">
          <div className="flex justify-between items-center h-16 px-4 md:px-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Img {...logoPhoto} eager className="h-8 w-auto" />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 pt-16 text-lg" onClick={() => setIsMenuOpen(false)}>
            <Nav to="/" label="Welcome" />
            <Nav to="/living" label="ICONYC Living" />
            <Nav to="/corporate-stays" label="Corporate Stays" />
            <Nav to="/availability" label="Availability" />
            <Nav to="/lifestyle" label="Lifestyle" />
            <Nav to="/gallery" label="Gallery" />
            <Nav to="/contact" label="Contact" />
          </div>
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Nav({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `whitespace-nowrap hover:text-white transition ${isActive ? 'text-[#C9A968]' : 'text-white/80'}`
      }
    >
      {label}
    </NavLink>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <Img {...logoPhoto} className="h-6 w-auto" />
          <p className="mt-3">Contemporary residences with a New York signature. Overlooking Ebotse Links and CR Swart Dam, Rynfield, Benoni.</p>
        </div>
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968]">Contact</p>
          <p className="mt-2 flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {ADDRESS}</p>
          <p className="mt-1 flex items-center gap-2">
            <Phone size={16} className="shrink-0" />
            <a href={PHONE_TEL} className="hover:text-white">{PHONE_DISPLAY}</a>
          </p>
          <p className="mt-1 flex items-center gap-2">
            <Mail size={16} className="shrink-0" />
            <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
          </p>
        </div>
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968]">Explore</p>
          <div className="mt-2 flex flex-col gap-1">
            <Link to="/corporate-stays" className="hover:text-white">Corporate stays</Link>
            <Link to="/availability" className="hover:text-white">Current availability</Link>
            <Link to="/gallery" className="hover:text-white">Design gallery</Link>
            <Link to="/contact" className="hover:text-white">Book a viewing</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} ICONYC. All rights reserved. Design by Goldmark Studios.</div>
    </footer>
  );
}

function GoldButton({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className =
    'inline-flex w-full items-center justify-center rounded-md bg-[#C9A968] px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:bg-[#d4b87a] sm:w-auto';
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function OutlineButton({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className =
    'inline-flex w-full items-center justify-center rounded-md border border-[#C9A968] px-6 py-3 text-sm font-semibold text-[#C9A968] transition hover:bg-[#C9A968]/10 sm:w-auto';
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// =========================
// Pages
// =========================
function Welcome() {
  usePageMeta(pages.home);
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col bg-[#0B1220]">
      <Img
        {...heroPhoto}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/45 to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-end px-4 pb-8 text-center md:px-6 md:pb-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#C9A968] md:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">ICONYC · RYNFIELD, BENONI</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl">
          New York–inspired residences above Ebotse Links
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-lg">
          Fully furnished apartments for corporate stays of 1 to 6 months, overlooking the golf course and CR Swart Dam. Housekeeping, utilities and high-speed Wi-Fi included.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <GoldButton href="/corporate-stays">Enquire about a corporate stay</GoldButton>
          <OutlineButton href={WHATSAPP} external>WhatsApp us</OutlineButton>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/15 bg-[#0B1220]/85 px-4 py-3 text-center text-xs leading-relaxed text-white/85 backdrop-blur md:text-sm">
        Corporate stays: From R32 000 / month · Included: Housekeeping, utilities, Wi-Fi · Lifestyle: Pool, gym, beach volleyball
      </div>
    </section>
  );
}

// =========================
// Page 2 — ICONYC Living (Full Content)
// =========================
function Living() {
  usePageMeta(pages.living);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h1 className="font-serif text-5xl mb-8">ICONYC Living — Where Design, Space & Status Meet</h1>

      <p className="text-white/80 leading-relaxed mb-6">Created in 2021, ICONYC was born from a vision to introduce a new tier of luxury living to Johannesburg — one inspired by the refined elegance of New York’s most exclusive residential addresses. Every ICONYC apartment is a private sanctuary of scale, sophistication and timeless architectural detail, designed for those who appreciate distinction.</p>

      <p className="text-white/80 leading-relaxed mb-6">With generous interiors exceeding 100m², ICONYC offers what most city residences cannot: true volume, true comfort and true luxury. Soaring double-volume ceilings, expansive open-plan living spaces, and full-height double-glazed windows create an atmosphere of calm, light and uninterrupted flow — a feeling of home, elevated to art.</p>

      <p className="text-white/80 leading-relaxed mb-6">At ICONYC, quality is not a feature, it is a standard. Imported finishes, bespoke joinery, and a curated palette of stone, glass and natural textures ensure that every residence feels crafted — never constructed. Nothing is ordinary. Everything is intentional.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">A Location Reserved for the Few</h2>
      <p className="text-white/80 leading-relaxed mb-6">Perfectly positioned above the lush landscapes of the prestigious Ebotse Golf & Country Estate, ICONYC enjoys one of the most celebrated sunset views in Johannesburg. Here, evenings unfold in hues of gold and rose across the water, framed by sculpted greens and skyline silhouettes — a setting that feels more private resort than metropolitan address.</p>

      <p className="text-white/80 leading-relaxed mb-6">It is a vantage point few will ever own — and even fewer will ever experience.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">Fully Sold Out — With Only a Handful Left to Rent</h2>
      <p className="text-white/80 leading-relaxed mb-6">Every ICONYC residence has now been fully sold, confirming its position as one of the most desirable luxury developments in the city. Our 3-bedroom and 4-bedroom residences are on a waitlist exceeding 12 months, with no near-term release of new inventory.</p>

      <p className="text-white/80 leading-relaxed mb-6">Only a very limited number of units are available for rent, offering a rare chance to live at ICONYC without having to wait for the next phase of ownership.</p>

      <p className="text-center text-[#C9A968] text-xl font-serif mt-10">A Final Opportunity — Reserved for Those Who Move Quickly</p>

      <div className="mt-10 flex justify-center items-end gap-6 flex-wrap">
        <Img src="/images/living/iconyc-25.webp" width={533} height={800} alt="ICONYC residence" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-3" />
        <Img src="/images/living/iconyc-18.webp" width={640} height={427} alt="ICONYC residence" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-2 translate-y-3" />
        <Img src="/images/living/iconyc-19.webp" width={533} height={800} alt="ICONYC residence" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-2 -translate-y-2" />
        <Img src="/images/living/iconyc-17.webp" width={640} height={427} alt="ICONYC residence" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-3" />
      </div>
      <p className="mt-6 text-center text-white/60 text-xs">Imagery indicative. Final finishes may vary.</p>
    </section>
  );
}

const a8Images: Photo[] = [
  { src: '/images/availability/a8-2.webp', width: 1200, height: 675, alt: 'Unit A8 at ICONYC' },
  { src: '/images/availability/a8-1.webp', width: 1200, height: 675, alt: 'Unit A8 at ICONYC' },
  { src: '/images/availability/a8-4.webp', width: 1200, height: 675, alt: 'Unit A8 at ICONYC' },
  { src: '/images/availability/a8-5.webp', width: 1200, height: 675, alt: 'Unit A8 at ICONYC' },
  { src: '/images/availability/a8-7.webp', width: 1200, height: 675, alt: 'Unit A8 at ICONYC' },
];

const a13Images: Photo[] = [
  { src: '/images/availability/a13-1.webp', width: 1200, height: 676, alt: 'Unit A13 at ICONYC' },
  { src: '/images/availability/a13-2.webp', width: 1200, height: 676, alt: 'Unit A13 at ICONYC' },
  { src: '/images/availability/a13-3.webp', width: 1200, height: 676, alt: 'Unit A13 at ICONYC' },
  { src: '/images/availability/a13-4.webp', width: 1200, height: 676, alt: 'Unit A13 at ICONYC' },
  { src: '/images/availability/a13-5.webp', width: 1200, height: 799, alt: 'Unit A13 at ICONYC' },
  { src: '/images/availability/a13-6.webp', width: 1200, height: 799, alt: 'Unit A13 at ICONYC' },
];

const c11Images: Photo[] = [
  { src: '/images/availability/c11-2.webp', width: 1200, height: 676, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-1.webp', width: 1200, height: 681, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-3.webp', width: 1200, height: 676, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-4.webp', width: 1200, height: 676, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-5.webp', width: 1200, height: 800, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-6.webp', width: 1200, height: 800, alt: 'Unit C11 at ICONYC' },
  { src: '/images/availability/c11-7.webp', width: 1200, height: 800, alt: 'Unit C11 at ICONYC' },
];

// =========================
// Page 3 — Availability (Full Content)
// =========================
function Availability() {
  usePageMeta(pages.availability);
  const [a8Slide, setA8Slide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setA8Slide((s) => (s + 1) % a8Images.length), 3000);
    return () => clearInterval(id);
  }, []);

  const [a13Slide, setA13Slide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setA13Slide((s) => (s + 1) % a13Images.length), 3000);
    return () => clearInterval(id);
  }, []);

  const [c11Slide, setC11Slide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setC11Slide((s) => (s + 1) % c11Images.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h1 className="font-serif text-5xl mb-8 text-center">Current Availability</h1>

      <p className="text-white/80 leading-relaxed mb-6">Each apartment has its own unique footprint and design with options for <span className="text-[#C9A968] font-medium">Furnished</span>, <span className="text-[#C9A968] font-medium">Semi-Furnished</span>, and <span className="text-[#C9A968] font-medium">Corporate Rental</span>.</p>

      <div className="mb-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968] mb-3">Available now</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/contact" className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-[#C9A968]/50 transition">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Img {...a8Images[a8Slide]} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-serif text-xl">Unit A8 — 2 Bedroom</h2>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/15">Furnished</span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/15">Corporate Rental</span>
                </div>
              </div>
              <p className="mt-1 text-white/70 text-xs">Ground floor • Interior 118 m² • Exterior 34 m²</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[#C9A968] text-sm">Photos rotate automatically</span>
                <span className="text-xs opacity-70">Tap to enquire</span>
              </div>
            </div>
          </Link>

          <Link to="/contact" className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-[#C9A968]/50 transition">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Img {...a13Images[a13Slide]} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-serif text-xl">Unit A13 — 3 Bedroom</h2>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/15">Unfurnished</span>
                </div>
              </div>
              <p className="mt-1 text-white/70 text-xs">Ground floor • 152 m²</p>
              <p className="mt-1 text-white/70 text-xs italic">Note: This apartment is not furnished.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[#C9A968] text-sm">Photos rotate automatically</span>
                <span className="text-xs opacity-70">Tap to enquire</span>
              </div>
            </div>
          </Link>

          <Link to="/contact" className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-[#C9A968]/50 transition">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Img {...c11Images[c11Slide]} className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-serif text-xl">Unit C11 — 2 Bedroom</h2>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/15">Unfurnished</span>
                </div>
              </div>
              <p className="mt-1 text-white/70 text-xs">Level 3 • Interior 115 m² • Balcony 9 m²</p>
              <p className="mt-1 text-white/70 text-xs italic">Note: This apartment is not furnished.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[#C9A968] text-sm">Photos rotate automatically</span>
                <span className="text-xs opacity-70">Tap to enquire</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto mt-10 text-xs">
        <table className="min-w-full text-left border border-white/10">
          <thead className="bg-white/5 text-[#C9A968] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-2 border-b border-white/10">Features</th>
              <th className="p-2 border-b border-white/10">Semi-Furnished (from R15 000)</th>
              <th className="p-2 border-b border-white/10">Furnished (from R24 000)</th>
              <th className="p-2 border-b border-white/10 whitespace-normal min-w-[16rem]">Corporate Rental (from R32 000 single / R38 000 double per month)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Beds & Sofa','❌ Not included','✔️ Included','✔️ High-quality furniture'],
              ['Linens','❌ Not included','❌ Not included','✔️ Included'],
              ['Bed Side Lamps','❌ Not included','❌ Not included','✔️ Included'],
              ['Dining Table & Chairs','❌ Not included','✔️ Included','✔️ Included'],
              ['Kitchen Appliances','❌ or minimal','✔️ Included','✔️ Full set (fridge, microwave, etc.)'],
              ['Stove','✔️ Included','✔️ Included','✔️ Included'],
              ['Oven','✔️ Included','✔️ Included','✔️ Included'],
              ['Microwave','❌ Not included','❌ Not included','✔️ Included'],
              ['Toaster','❌ Not included','❌ Not included','✔️ Included'],
              ['Coffee Maker','❌ Not included','❌ Not included','✔️ Included'],
              ['Kettle','❌ Not included','❌ Not included','✔️ Included'],
              ['Refrigerator','❌ Not included','❌ Not included','✔️ Included'],
              ['Dishwasher','❌ Not included','❌ Not included','✔️ Included'],
              ['Washing Machine','❌ Not included','❌ Not included','✔️ Included'],
              ['Wardrobes','❌ Not included','✔️ Included','✔️ Included'],
              ['Curtains/Blinds','❌ Not included','❌ Not included','✔️ Included'],
              ['Curtain Rails','❌ Not included','✔️ Included','✔️ Included'],
              ['Kitchenware','❌ Not included','❌ Not included','✔️ Full set (plates, utensils, cookware)'],
              ['TV / Entertainment','❌ Not included','❌ Not included','✔️ Included'],
              ['Internet','❌ Not included','❌ Not included','✔️ High-speed Wi-Fi'],
              ['Utilities','✔️ Included','✔️ Included','✔️ Included (fair usage applies)'],
              ['Bedding & Linens','❌ Not included','❌ Not included','✔️ Included & changed weekly'],
              ['Housekeeping','❌ Not included','❌ Not included','✔️ Weekly'],
              ['Ready to Move In?','❌ Not fully','✔️ Yes','✔️ Yes — hotel-style setup'],
              ['Basement Parking','❌ Not included','❌ Not included','❌ Not included'],
            ].map((row, i) => (
              <tr key={i} className="even:bg-white/5">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border-b border-white/10 whitespace-nowrap">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const lifestylePhotos: Photo[] = [
  { src: '/images/lifestyle/lifestyle-1.webp', width: 800, height: 533, alt: 'Dog park at ICONYC' },
  { src: '/images/lifestyle/lifestyle-2.webp', width: 800, height: 533, alt: 'Beach volleyball court at ICONYC' },
  { src: '/images/lifestyle/lifestyle-3.webp', width: 800, height: 533, alt: 'Swimming pool at ICONYC' },
  { src: '/images/lifestyle/lifestyle-4.webp', width: 800, height: 533, alt: 'Braai area at ICONYC' },
];

// =========================
// Page 4 — Lifestyle (Full Content)
// =========================
function Lifestyle() {
  usePageMeta(pages.lifestyle);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h1 className="font-serif text-5xl mb-10 text-center">LIFESTYLE</h1>

      <p className="text-white/80 leading-relaxed mb-6">At ICONYC, lifestyle is not an accessory — it is the essence of living here. Your home should elevate every moment of your day: a place that awakens you with energy in the morning and welcomes you back with serenity at night. From day one, ICONYC was imagined as a refined sanctuary — a modern retreat where contemporary architecture, nature, and wellbeing are perfectly aligned.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">AN UNMATCHED SETTING</h2>
      <p className="text-white/80 leading-relaxed mb-6">ICONYC enjoys one of the most exclusive views in Gauteng, overlooking the 17th and 18th holes of the world-class Ebotse Links Golf Course, set against the calming waters of the CR Swart Dam. Every balcony becomes a front-row seat to layered landscapes, golden sunsets, and uninterrupted open space.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">24-HOUR SECURITY & ACCESS CONTROL</h2>
      <p className="text-white/80 leading-relaxed mb-6">Security is designed, not added. ICONYC is enclosed by a reinforced concrete perimeter wall with electric fencing, controlled single-access entry, biometric guest registration, fingerprint access for residents, heat-sensitive surveillance cameras, and 24-hour off-site monitoring. Privacy and peace of mind are a permanent feature.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">PRIVATE FITNESS & WELLNESS CLUB</h2>
      <p className="text-white/80 leading-relaxed mb-6">The ICONYC Fitness Centre offers a premium wellness experience just steps from your front door. Residents enjoy world-class gym equipment, hygiene-centred training spaces, table tennis, a beach volleyball court, and a 50-metre Olympic-length outdoor pool — designed to support an active, balanced lifestyle.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">FIBRE-OPTIC CONNECTIVITY</h2>
      <p className="text-white/80 leading-relaxed mb-6">Every apartment is wired to a dedicated fibre-optic backbone, providing the fastest broadband available in South Africa. From remote work to high-resolution streaming, ICONYC is built for seamless digital living.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">OUTDOOR LIVING & LANDSCAPED SPACES</h2>
      <p className="text-white/80 leading-relaxed mb-6">Life at ICONYC flows effortlessly between indoor elegance and outdoor calm. Residents can explore walking trails, pause in meditation-inspired Zen gardens, enjoy children’s playground zones, or relax beside the tranquil Koi Pond — a reflective water feature designed as a quiet escape within the estate.</p>
      <p className="text-white/80 leading-relaxed mb-6">A dramatic Green Wall installation introduces living architecture into the common areas, turning nature into design and design into wellness.</p>
      <p className="text-white/80 leading-relaxed mb-6">For pet-loving residents, ICONYC includes a dedicated Dog Park, offering a secure space where pets can exercise, socialise, and enjoy the outdoors freely.</p>
      <p className="text-white/80 leading-relaxed mb-6">To complement this relaxed outdoor lifestyle, ICONYC also features designer Barbecue & Braai Facilities, seamlessly integrated into landscaped entertainment areas. Whether hosting a sunset gathering with friends or a family weekend lunch, the outdoor braai zones are crafted for connection, comfort, and style — offering the perfect balance of luxury and leisure.</p>

      <h2 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">SECURE PARKING FOR RESIDENTS & GUESTS</h2>
      <p className="text-white/80 leading-relaxed mb-6">Each residence includes two allocated parking bays — one covered basement bay and one ground-level bay. Additional visitor parking ensures effortless hosting and stress-free arrivals.</p>

      <p className="text-center text-[#C9A968] text-xl font-serif mt-10">ICONYC — A NEW STANDARD OF MODERN LIVING</p>

      <div className="mt-12 flex justify-center items-end gap-6 flex-wrap">
        {lifestylePhotos.map((photo) => (
          <Img
            key={photo.src}
            {...photo}
            className={
              photo.src.endsWith('lifestyle-1.webp')
                ? 'w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-3'
                : photo.src.endsWith('lifestyle-2.webp')
                  ? 'w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-2 translate-y-3'
                  : photo.src.endsWith('lifestyle-3.webp')
                    ? 'w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-2 -translate-y-2'
                    : 'w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-3'
            }
          />
        ))}
      </div>
      <p className="mt-6 text-center text-white/60 text-xs">Imagery indicative. Final finishes may vary.</p>
    </section>
  );
}

type GalleryImage = Photo & { thumb: string; thumbWidth: number; thumbHeight: number };

const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/iconyc-1.webp', width: 800, height: 800, thumb: '/images/gallery/thumbs/iconyc-1.webp', thumbWidth: 640, thumbHeight: 640, alt: 'ICONYC photograph 1' },
  { src: '/images/gallery/iconyc-13.webp', width: 800, height: 800, thumb: '/images/gallery/thumbs/iconyc-13.webp', thumbWidth: 640, thumbHeight: 640, alt: 'ICONYC photograph 2' },
  { src: '/images/gallery/iconyc-18.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-18.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 3' },
  { src: '/images/gallery/iconyc-17.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-17.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 4' },
  { src: '/images/gallery/iconyc-19.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-19.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 5' },
  { src: '/images/gallery/iconyc-20.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-20.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 6' },
  { src: '/images/gallery/iconyc-21.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-21.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 7' },
  { src: '/images/gallery/iconyc-22.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-22.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 8' },
  { src: '/images/gallery/d12-3.webp', width: 1200, height: 675, thumb: '/images/gallery/thumbs/d12-3.webp', thumbWidth: 640, thumbHeight: 360, alt: 'ICONYC photograph 9' },
  { src: '/images/gallery/iconyc-26.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-26.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 10' },
  { src: '/images/gallery/iconyc-25.webp', width: 533, height: 800, thumb: '/images/gallery/thumbs/iconyc-25.webp', thumbWidth: 533, thumbHeight: 800, alt: 'ICONYC photograph 11' },
  { src: '/images/gallery/iconyc-27.webp', width: 1200, height: 800, thumb: '/images/gallery/thumbs/iconyc-27.webp', thumbWidth: 640, thumbHeight: 426, alt: 'ICONYC photograph 12' },
];

function Gallery() {
  usePageMeta(pages.gallery);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h1 className="font-serif text-5xl mb-10 text-center">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <button key={image.src} className="overflow-hidden rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition" onClick={() => setSelected(image)}>
            <img src={image.thumb} alt={image.alt} width={image.thumbWidth} height={image.thumbHeight} loading="lazy" decoding="async" className="w-full h-48 object-cover" />
          </button>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button aria-label="Close image viewer" onClick={() => setSelected(null)} className="absolute top-6 right-6 text-white hover:text-[#C9A968] transition"><X size={32} /></button>
          <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} className="max-w-[90%] max-h-[80vh] rounded-2xl border border-[#C9A968]/30 shadow-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

// =========================
// Contact (map + email + WhatsApp + form) with hero image AT THE END
// The enquiry form is intentionally unchanged.
// =========================
function Contact() {
  usePageMeta(pages.contact);
  return (
    <section className="text-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="font-serif text-5xl mb-8 text-center text-[#C9A968]">Contact Us</h1>

        <div className="mb-10 rounded-xl overflow-hidden border border-[#C9A968]/30 shadow-lg">
          <iframe
            title="ICONYC Location"
            src="https://www.google.com/maps?q=32+Cloverdene+Rd,+Rynfield,+Benoni,+South+Africa&output=embed"
            width="100%"
            height="350"
            loading="lazy"
            className="w-full border-0"
          ></iframe>
        </div>

        <div className="text-center mb-10 space-y-2">
          <p>Email: <a href={`mailto:${EMAIL}`} className="text-[#C9A968] hover:underline">{EMAIL}</a></p>
          <p>Phone: <a href={PHONE_TEL} className="text-[#C9A968] hover:underline">{PHONE_DISPLAY}</a></p>
          <p>WhatsApp: <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-[#C9A968] hover:underline">Chat with us on WhatsApp</a></p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <input type="text" placeholder="Name" className="p-3 rounded-md bg-white/90" required />
          <input type="text" placeholder="Surname" className="p-3 rounded-md bg-white/90" required />
          <input type="tel" placeholder="Telephone Number" className="p-3 rounded-md bg-white/90 md:col-span-2" required />
          <input type="email" placeholder="Email" className="p-3 rounded-md bg-white/90 md:col-span-2" required />
          <select aria-label="Apartment Preference" className="p-3 rounded-md bg-white/90 md:col-span-2" required>
            <option value="">Apartment Preference</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
            <option value="Corporate Rental">Corporate Rental</option>
          </select>
          <button type="submit" className="md:col-span-2 bg-[#C9A968] text-black font-semibold py-3 rounded-md hover:bg-[#b89a50] transition">Submit Enquiry</button>
        </form>
      </div>

      <div className="w-full">
        <Img
          {...heroPhoto}
          alt="ICONYC residences at sunset above Ebotse Links and CR Swart Dam"
          className="w-full h-[60vh] md:h-[75vh] object-cover"
        />
      </div>
    </section>
  );
}

const included = [
  'Fully furnished apartment',
  'Weekly housekeeping',
  '24/7 maintenance',
  'High-speed internet',
  'Smart TVs',
  'Utilities included, with no hidden fees',
  'Swimming pool',
  'Beach volleyball',
  'Gym',
  'Large park',
];

const audiences = [
  'Project and engineering teams at East Rand plants and the OR Tambo SEZ',
  'Aviation professionals at OR Tambo',
  'Doctors, specialists and nurses on locum or contract placements',
  'Relocating employees and expatriates',
  'Production crews and consultants',
];

const reasons = [
  { title: 'One monthly price', body: 'One monthly price invoiced to your company.' },
  { title: 'A real home', body: 'A real home with a full kitchen.' },
  { title: 'Life on the estate', body: 'Pool, gym, beach volleyball and park.' },
  { title: 'Flexible terms', body: 'Flexible 1 to 6 month terms.' },
];

const faqs = [
  {
    q: 'How long is a corporate stay?',
    a: 'The minimum stay is 1 month, and stays run up to 6 months. Extensions are subject to availability.',
  },
  {
    q: 'Can you invoice our company?',
    a: 'Yes. ICONYC can invoice the company directly and provide supplier documents.',
  },
  {
    q: 'What is included?',
    a: 'Weekly housekeeping, 24/7 maintenance, high-speed internet, smart TVs and utilities. The apartments are fully furnished. Residents can use the swimming pool, beach volleyball court, gym and large park.',
  },
  {
    q: 'Are there hidden fees?',
    a: 'There are no hidden fees. The deposit and the terms of the stay are set out in a short corporate stay agreement.',
  },
  {
    q: 'How many apartments are available?',
    a: 'There are 4 fully furnished corporate apartments. Small teams are welcome.',
  },
  {
    q: 'Can we arrange a viewing?',
    a: 'Yes. Viewings can be arranged.',
  },
  {
    q: 'Where is ICONYC?',
    a: 'ICONYC is at 32 Cloverdene Rd, Rynfield, Benoni, overlooking Ebotse Links and CR Swart Dam.',
  },
];

function CorporateStays() {
  usePageMeta(pages.corporate);
  return (
    <>
      <section className="relative isolate flex min-h-[70vh] items-end bg-[#0B1220]">
        <Img {...heroPhoto} priority className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/50 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-xs uppercase tracking-[0.28em] text-[#C9A968]">ICONYC · Corporate stays</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] md:text-6xl">Fully furnished apartments for stays of 1 to 6 months</h1>
          <p className="mt-4 max-w-2xl text-white/85">from R32 000 single / R38 000 double per month</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <p className="text-lg leading-relaxed text-white/85">
          Contemporary residences with a New York signature, overlooking Ebotse Links and CR Swart Dam in Rynfield, Benoni. ICONYC offers fully furnished apartments for corporate stays of one to six months: a private, calm home base for specialists, project teams, visiting clinicians and relocating staff working on the East Rand.
        </p>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">What’s included</p>
          <h2 className="mt-3 font-serif text-4xl">Everything needed for a working stay</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
                <Check size={18} className="mt-0.5 shrink-0 text-[#C9A968]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">Who it’s for</p>
          <h2 className="mt-3 font-serif text-4xl">A home base for people working on the East Rand</h2>
          <ul className="mt-8 space-y-3">
            {audiences.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A968]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">Pricing</p>
          <h2 className="mt-3 font-serif text-4xl">Simple monthly rates</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-[#C9A968]">
                <tr>
                  <th className="p-4 font-medium">Occupancy</th>
                  <th className="p-4 font-medium">Monthly rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-4">Single occupancy</td>
                  <td className="p-4 text-[#C9A968]">from R32 000 / month</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4">Double occupancy</td>
                  <td className="p-4 text-[#C9A968]">from R38 000 / month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-white/70">Utilities, Wi-Fi and weekly housekeeping are included. Terms and conditions apply.</p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">Why ICONYC</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl">Why companies choose ICONYC over a hotel</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-serif text-2xl text-[#C9A968]">{reason.title}</h3>
                <p className="mt-2 text-white/80">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">Questions</p>
          <h2 className="mt-3 font-serif text-4xl">FAQs</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-xl leading-none text-[#C9A968]" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A968]">Enquire</p>
          <h2 className="mt-3 font-serif text-4xl">Talk to us about a corporate stay</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">Email, call or send a WhatsApp message.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <GoldButton href="mailto:info@theiconyc.co.za?subject=Corporate%20stay%20enquiry">Email an enquiry</GoldButton>
            <OutlineButton href={PHONE_TEL}>Call {PHONE_DISPLAY}</OutlineButton>
            <OutlineButton href={WHATSAPP} external>WhatsApp us</OutlineButton>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Shell>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/living" element={<Living />} />
          <Route path="/corporate-stays" element={<CorporateStays />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </Router>
  );
}
