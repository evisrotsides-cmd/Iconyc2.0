import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, X } from 'lucide-react';

// =========================
// Header, Nav, Footer Shell
// =========================
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white selection:bg-[#C9A968] selection:text-[#0B1220]">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0B1220]/70 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://i.postimg.cc/k50YzgKs/Chrome-Text.png" alt="ICONYC Logo" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <Nav to="/" label="Welcome" />
              <Nav to="/living" label="Iconyc Living" />
              <Nav to="/availability" label="Availability" />
              <Nav to="/lifestyle" label="Lifestyle" />
              <Nav to="/gallery" label="Gallery" />
              <Nav to="/contact" label="Contact" />
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Nav({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `hover:text-white transition ${isActive ? 'text-[#C9A968]' : 'text-white/80'}`}>{label}</NavLink>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <img src="https://i.postimg.cc/k50YzgKs/Chrome-Text.png" alt="ICONYC Logo" className="h-6" />
          <p className="mt-3">Contemporary residences with a New-York signature. Overlooking Ebotse Links and CR Swart Dam, Benoni.</p>
        </div>
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968]">Contact</p>
          <p className="mt-2 flex items-center gap-2"><MapPin size={16}/> 32 Cloverdene Rd, Benoni</p>
          <p className="mt-1 flex items-center gap-2"><Phone size={16}/> +27 79 288 0431</p>
          <p className="mt-1 flex items-center gap-2"><Mail size={16}/> info@theiconyc.co.za</p>
        </div>
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968]">Explore</p>
          <div className="mt-2 flex flex-col gap-1">
            <Link to="/availability" className="hover:text-white">Current availability</Link>
            <Link to="/gallery" className="hover:text-white">Design gallery</Link>
            <Link to="/contact" className="hover:text-white">Book a viewing</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} Iconyc. All rights reserved.</div>
    </footer>
  );
}

// =========================
// Pages
// =========================
function Welcome() {
  return (
    <section className="relative isolate h-[80vh] flex items-end justify-center bg-black pb-20">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/Y2w8xG6KO5s?autoplay=1&mute=1&loop=1&playlist=Y2w8xG6KO5s"
        title="ICONYC Intro Video"
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-[#0B1220]/40 to-transparent" />
      <div className="relative text-center px-6">
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">Welcome to ICONYC</h1>
        <p className="text-[#C9A968] text-lg md:text-xl">A new standard of luxury living</p>
      </div>
    </section>
  );
}

// =========================
// Page 2 — ICONYC Living (Full Content)
// =========================
function Living() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="font-serif text-5xl mb-8">ICONYC Living — Where Design, Space & Status Meet</h2>

      <p className="text-white/80 leading-relaxed mb-6">Created in 2021, ICONYC was born from a vision to introduce a new tier of luxury living to Johannesburg — one inspired by the refined elegance of New York’s most exclusive residential addresses. Every ICONYC apartment is a private sanctuary of scale, sophistication and timeless architectural detail, designed for those who appreciate distinction.</p>

      <p className="text-white/80 leading-relaxed mb-6">With generous interiors exceeding 100m², ICONYC offers what most city residences cannot: true volume, true comfort and true luxury. Soaring double-volume ceilings, expansive open-plan living spaces, and full-height double-glazed windows create an atmosphere of calm, light and uninterrupted flow — a feeling of home, elevated to art.</p>

      <p className="text-white/80 leading-relaxed mb-6">At ICONYC, quality is not a feature, it is a standard. Imported finishes, bespoke joinery, and a curated palette of stone, glass and natural textures ensure that every residence feels crafted — never constructed. Nothing is ordinary. Everything is intentional.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">A Location Reserved for the Few</h3>
      <p className="text-white/80 leading-relaxed mb-6">Perfectly positioned above the lush landscapes of the prestigious Ebotse Golf & Country Estate, ICONYC enjoys one of the most celebrated sunset views in Johannesburg. Here, evenings unfold in hues of gold and rose across the water, framed by sculpted greens and skyline silhouettes — a setting that feels more private resort than metropolitan address.</p>

      <p className="text-white/80 leading-relaxed mb-6">It is a vantage point few will ever own — and even fewer will ever experience.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">Fully Sold Out — With Only a Handful Left to Rent</h3>
      <p className="text-white/80 leading-relaxed mb-6">Every ICONYC residence has now been fully sold, confirming its position as one of the most desirable luxury developments in the city. Our 3-bedroom and 4-bedroom residences are on a waitlist exceeding 12 months, with no near-term release of new inventory.</p>

      <p className="text-white/80 leading-relaxed mb-6">Only a very limited number of units are available for rent, offering a rare chance to live at ICONYC without having to wait for the next phase of ownership.</p>

      <p className="text-center text-[#C9A968] text-xl font-serif mt-10">A Final Opportunity — Reserved for Those Who Move Quickly</p>

      <div className="mt-10 flex justify-center items-end gap-6 flex-wrap">
        <img src="https://i.postimg.cc/1trvYhSY/Iconyc-25.png" alt="Iconyc 25" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-3" />
        <img src="https://i.postimg.cc/52kdnzgJ/Iconyc-18.jpg" alt="Iconyc 18" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-2 translate-y-3" />
        <img src="https://i.postimg.cc/fTwGsCg0/Iconyc-19.jpg" alt="Iconyc 19" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-2 -translate-y-2" />
        <img src="https://i.postimg.cc/Sskr9T9q/Iconyc-17.jpg" alt="Iconyc 17" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-3" />
      </div>
      <p className="mt-6 text-center text-white/60 text-xs">Imagery indicative. Final finishes may vary.</p>
    </section>
  );
}

// =========================
// Page 3 — Availability (Full Content)
// =========================
function Availability() {
  const a8Images = [
    'https://i.postimg.cc/s2gNzHZM/A8-2.jpg',
    'https://i.postimg.cc/Gpm5Rgst/A8-1.jpg',
    'https://i.postimg.cc/CKxQ0rf1/A8-4.jpg',
    'https://i.postimg.cc/Pq5RHV8S/A8-5.jpg',
    'https://i.postimg.cc/TP34xNW9/A8-7.jpg',
  ];
  const [a8Slide, setA8Slide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setA8Slide((s) => (s + 1) % a8Images.length), 3000);
    return () => clearInterval(id);
  }, []);

  const d12Images = [
    'https://i.postimg.cc/FHkRy1cv/D12-1.jpg',
    'https://i.postimg.cc/P5vxWNZn/D12-2.jpg',
    'https://i.postimg.cc/0yKQYrmx/D12-3.jpg',
    'https://i.postimg.cc/Vk06q5My/D12-4.jpg',
    'https://i.postimg.cc/JzHnNtJr/D12-5.jpg',
  ];
  const [d12Slide, setD12Slide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setD12Slide((s) => (s + 1) % d12Images.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="font-serif text-5xl mb-8 text-center">Current Availability</h2>

      <p className="text-white/80 leading-relaxed mb-6">Each apartment has its own unique footprint and design with options for <span className="text-[#C9A968] font-medium">Furnished</span>, <span className="text-[#C9A968] font-medium">Semi-Furnished</span>, and <span className="text-[#C9A968] font-medium">Corporate Rental</span>.</p>

      {/* Unit A8 card with rotating photos */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#C9A968] mb-3">Available now</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/contact" className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-[#C9A968]/50 transition">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={a8Images[a8Slide]} alt="Unit A8" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-xl">Unit A8 — 2 Bedroom</h3>
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
              <img src={d12Images[d12Slide]} alt="Unit D12" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-xl">Unit D12 — 3 Bedroom</h3>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/15">Unfurnished</span>
                </div>
              </div>
              <p className="mt-1 text-white/70 text-xs">Level 2 • Interior 128 m² • Balcony 26 m²</p>
              <p className="mt-1 text-white/70 text-xs italic">Note: This apartment is not furnished.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[#C9A968] text-sm">Photos rotate automatically</span>
                <span className="text-xs opacity-70">Tap to enquire</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Comparison Table */}
      <div className="overflow-x-auto mt-10 text-xs">
        <table className="min-w-full text-left border border-white/10">
          <thead className="bg-white/5 text-[#C9A968] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-2 border-b border-white/10">Features</th>
              <th className="p-2 border-b border-white/10">Semi-Furnished (from R15 000)</th>
              <th className="p-2 border-b border-white/10">Furnished (from R24 000)</th>
              <th className="p-2 border-b border-white/10">Corporate Rental (from R38 000)</th>
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
              ['Cleaning Services','❌ Not included','❌ Not included','✔️ Twice a week (4 hours)'],
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

// =========================
// Page 4 — Lifestyle (Full Content)
// =========================
function Lifestyle() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="font-serif text-5xl mb-10 text-center">LIFESTYLE</h2>

      <p className="text-white/80 leading-relaxed mb-6">At ICONYC, lifestyle is not an accessory — it is the essence of living here. Your home should elevate every moment of your day: a place that awakens you with energy in the morning and welcomes you back with serenity at night. From day one, ICONYC was imagined as a refined sanctuary — a modern retreat where contemporary architecture, nature, and wellbeing are perfectly aligned.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">AN UNMATCHED SETTING</h3>
      <p className="text-white/80 leading-relaxed mb-6">ICONYC enjoys one of the most exclusive views in Gauteng, overlooking the 17th and 18th holes of the world-class Ebotse Links Golf Course, set against the calming waters of the CR Swart Dam. Every balcony becomes a front-row seat to layered landscapes, golden sunsets, and uninterrupted open space.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">24-HOUR SECURITY & ACCESS CONTROL</h3>
      <p className="text-white/80 leading-relaxed mb-6">Security is designed, not added. ICONYC is enclosed by a reinforced concrete perimeter wall with electric fencing, controlled single-access entry, biometric guest registration, fingerprint access for residents, heat-sensitive surveillance cameras, and 24-hour off-site monitoring. Privacy and peace of mind are a permanent feature.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">PRIVATE FITNESS & WELLNESS CLUB</h3>
      <p className="text-white/80 leading-relaxed mb-6">The ICONYC Fitness Centre offers a premium wellness experience just steps from your front door. Residents enjoy world-class gym equipment, hygiene-centred training spaces, table tennis, a beach volleyball court, and a 50-metre Olympic-length outdoor pool — designed to support an active, balanced lifestyle.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">FIBRE-OPTIC CONNECTIVITY</h3>
      <p className="text-white/80 leading-relaxed mb-6">Every apartment is wired to a dedicated fibre-optic backbone, providing the fastest broadband available in South Africa. From remote work to high-resolution streaming, ICONYC is built for seamless digital living.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">OUTDOOR LIVING & LANDSCAPED SPACES</h3>
      <p className="text-white/80 leading-relaxed mb-6">Life at ICONYC flows effortlessly between indoor elegance and outdoor calm. Residents can explore walking trails, pause in meditation-inspired Zen gardens, enjoy children’s playground zones, or relax beside the tranquil Koi Pond — a reflective water feature designed as a quiet escape within the estate.</p>
      <p className="text-white/80 leading-relaxed mb-6">A dramatic Green Wall installation introduces living architecture into the common areas, turning nature into design and design into wellness.</p>
      <p className="text-white/80 leading-relaxed mb-6">For pet-loving residents, ICONYC includes a dedicated Dog Park, offering a secure space where pets can exercise, socialise, and enjoy the outdoors freely.</p>
      <p className="text-white/80 leading-relaxed mb-6">To complement this relaxed outdoor lifestyle, ICONYC also features designer Barbecue & Braai Facilities, seamlessly integrated into landscaped entertainment areas. Whether hosting a sunset gathering with friends or a family weekend lunch, the outdoor braai zones are crafted for connection, comfort, and style — offering the perfect balance of luxury and leisure.</p>

      <h3 className="text-[#C9A968] text-xl mt-10 mb-4 font-semibold">SECURE PARKING FOR RESIDENTS & GUESTS</h3>
      <p className="text-white/80 leading-relaxed mb-6">Each residence includes two allocated parking bays — one covered basement bay and one ground-level bay. Additional visitor parking ensures effortless hosting and stress-free arrivals.</p>

      <p className="text-center text-[#C9A968] text-xl font-serif mt-10">ICONYC — A NEW STANDARD OF MODERN LIVING</p>

      <div className="mt-12 flex justify-center items-end gap-6 flex-wrap">
        <img src="https://i.postimg.cc/k4HnvNcq/Lifestyle-1.png" alt="Lifestyle 1" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-3" />
        <img src="https://i.postimg.cc/C12FsCNL/Lifestyle-2.png" alt="Lifestyle 2" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-2 translate-y-3" />
        <img src="https://i.postimg.cc/bJ5z90Tz/Lifestyle-3.png" alt="Lifestyle 3" className="w-48 h-48 rounded-2xl object-cover shadow-2xl -rotate-2 -translate-y-2" />
        <img src="https://i.postimg.cc/xCZ03GR1/Lifestyle-4.png" alt="Lifestyle 4" className="w-48 h-48 rounded-2xl object-cover shadow-2xl rotate-3" />
      </div>
      <p className="mt-6 text-center text-white/60 text-xs">Imagery indicative. Final finishes may vary.</p>
    </section>
  );
}

// =========================
function Gallery() {
  const images = [
    'https://i.postimg.cc/P5TfQQDm/Iconyc-1.png',
    'https://i.postimg.cc/vHWHnN42/Iconyc-13.png',
    'https://i.postimg.cc/wjgxQQNk/Iconyc-18.jpg',
    'https://i.postimg.cc/dVwQjjCj/Iconyc-17.png',
    'https://i.postimg.cc/t4pRNN62/Iconyc-19.png',
    'https://i.postimg.cc/dVwQjjCW/Iconyc-20.png',
    'https://i.postimg.cc/T3f2JJbN/Iconyc-21.png',
    'https://i.postimg.cc/Bn4ZBBFz/Iconyc-22.png',
    'https://i.postimg.cc/0yKQYrmx/D12-3.jpg',
    'https://i.postimg.cc/13sRrr6h/Iconyc-26.png',
    'https://i.postimg.cc/Bn4ZBBFd/Iconyc-25.png',
    'https://i.postimg.cc/2Srj77vf/Iconyc-27.png',
  ];
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="font-serif text-5xl mb-10 text-center">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button key={i} className="overflow-hidden rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition" onClick={() => setSelected(src)}>
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover" />
          </button>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button aria-label="Close image viewer" onClick={() => setSelected(null)} className="absolute top-6 right-6 text-white hover:text-[#C9A968] transition"><X size={32} /></button>
          <img src={selected} alt="Enlarged" className="max-w-[90%] max-h-[80vh] rounded-2xl border border-[#C9A968]/30 shadow-2xl" />
        </div>
      )}
    </section>
  );
}

// =========================
// Contact (map + email + WhatsApp + form) with hero image AT THE END
// =========================
function Contact() {
  return (
    <section className="text-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-serif text-5xl mb-8 text-center text-[#C9A968]">Contact Us</h2>

        <div className="mb-10 rounded-xl overflow-hidden border border-[#C9A968]/30 shadow-lg">
          <iframe
            title="ICONYC Location"
            src="https://www.google.com/maps?q=32+Cloverdene+Rd,+Benoni,+South+Africa&output=embed"
            width="100%"
            height="350"
            loading="lazy"
            className="w-full border-0"
          ></iframe>
        </div>

        <div className="text-center mb-10 space-y-2">
          <p>Email: <a href="mailto:info@theiconyc.co.za" className="text-[#C9A968] hover:underline">info@theiconyc.co.za</a></p>
          <p>WhatsApp: <a href="https://wa.me/27610179093" target="_blank" rel="noopener noreferrer" className="text-[#C9A968] hover:underline">Chat with us on WhatsApp</a></p>
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
        <img
          src="https://i.postimg.cc/fWjtYytq/Iconyc-1.png"
          alt="Iconyc Building"
          className="w-full h-[60vh] md:h-[75vh] object-cover"
        />
      </div>

      <div className="mt-8 text-center text-xs text-[#C9A968]">
        <p>© 2025 ICONYC. All Rights Reserved. Design by Goldmark Studios.</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <Shell>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/living" element={<Living />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </Router>
  );
}
