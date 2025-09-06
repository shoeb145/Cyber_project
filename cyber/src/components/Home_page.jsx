import React, { useRef, useEffect } from 'react';

const logos = [
  // Example company logos (replace with your own SVGs or PNGs)
  'https://framerusercontent.com/images/JOPJ1NG3nVKIRJ4oij2kfOo.svg', // Vomia
  'https://framerusercontent.com/images/e631JGDpQBkzU3Ta2TkDqpes6CU.svg', // Fluxenta
  'https://framerusercontent.com/images/TwBzGccSpfogppbHh8u7CaHWNFw.svg', // Veltrix
  'https://framerusercontent.com/images/KuPoQRQWmow9CfCw0KEq0VyOpA.svg', // Trivexa
  'https://framerusercontent.com/images/U5QrMBBEpF7fm208B36PYi9tmU.svg', // Brilora
];

const features = [
  {
    icon: 'https://framerusercontent.com/images/seJ8TlSbKj72f9xMTuWspjKvBcY.svg',
    title: 'Experienced Security Professionals',
  },
  {
    icon: 'https://framerusercontent.com/images/wTCnsiGz4b0bCY69QyrGLmFFX8.svg',
    title: 'Customized Security Solutions',
  },
  {
    icon: 'https://framerusercontent.com/images/PWxodD9kWCaeZzH5rWL57m47zU.svg',
    title: 'Advanced Technology Integration',
  }
];

const stats = [
  { label: 'Certified Security Officers', value: '270+' },
  { label: 'Years of Experience', value: '15+' },
  { label: 'Client Satisfaction', value: '4.9/5' },
  { label: 'Incident-Free Rate', value: '99%' }
];

const caseStudies = [
  {
    icon: '/case1.svg',
    title: 'Cyber Solutions',
    desc: 'Corporate Office Security: Addressing unauthorized access incidents. 85% fewer breaches.',
    link: '#'
  },
  {
    icon: '/case2.svg',
    title: 'Peace Mind Guaranteed',
    desc: 'Expert crowd management for large gatherings and VIP zones. No significant incidents.',
    link: '#'
  },
  {
    icon: '/case3.svg',
    title: 'Security for Events',
    desc: 'Crowd management for large events and VIP areas. Commended by law enforcement.',
    link: '#'
  }
];

const blogs = [
  {
    image: '/blog1.jpg',
    date: 'June 4, 2025',
    title: 'How Mobile Patrols Are Changing Modern Security',
    link: '#'
  },
  {
    image: '/blog2.jpg',
    date: 'June 11, 2025',
    title: 'Artificial Intelligence: Revolutionizing Customer Service',
    link: '#'
  },
  {
    image: '/blog3.jpg',
    date: 'Sept 15, 2025',
    title: 'Understanding Edge Computing: Benefits and Use Cases',
    link: '#'
  }
];

const Home_page = () => {
  const marqueeTrackRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    const marquee = marqueeRef.current;
    if (!track || !marquee) return;

    // Get width of one set of logos
    const logos = track.children.length / 2;
    let setWidth = 0;
    for (let i = 0; i < logos; i++) {
      setWidth += track.children[i].offsetWidth + 56; // 56px gap
    }
    // Remove last gap
    setWidth -= 56;
    // Set CSS variable for animation
    marquee.style.setProperty('--marquee-width', `${setWidth}px`);
  }, []);

  return (
    <div className="home-sections">
      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="trust-bar-row">
          <div className="trust-text">Trusted by 2700+ startups & brands</div>
          <div className="trust-logos-marquee" ref={marqueeRef}>
            <div className="marquee-track" ref={marqueeTrackRef}>
              {[...logos, ...logos].map((logo, i) => (
                <img src={logo} alt={`Brand ${i % logos.length + 1}`} key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

    {/* Features/Benefits */}
    <section className="features-section">
      <h2 className="section-title">When it comes to protecting what matters most, <br />you need more than just a security provider you <br /> need a dependable partner.</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <img src={f.icon} alt="" className="feature-icon" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Stats Bar */}
    <section className="stats-bar">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </section>

    {/* Case Studies */}
    <section className="case-studies">
      <h2 className="section-title">Proven protection in action</h2>
      <div className="case-grid">
        {caseStudies.map((c, i) => (
          <div className="case-card" key={i}>
            <img src={c.icon} alt="" className="case-icon" />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <a href={c.link} className="case-link">Discover More</a>
          </div>
        ))}
      </div>
    </section>

    {/* Blog Preview */}
    <section className="blog-preview">
      <h2 className="section-title">Latest from our blog</h2>
      <div className="blog-grid">
        {blogs.map((b, i) => (
          <div className="blog-card" key={i}>
            <img src={b.image} alt="" className="blog-image" />
            <div className="blog-date">{b.date}</div>
            <h3>{b.title}</h3>
            <a href={b.link} className="blog-link">Read More</a>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <h2>Your safety is our mission. Your trust is our commitment.</h2>
      <a href="#contact" className="cta-btn">Start Protecting Your Presence</a>
    </section>
  </div>
  );
};

export default Home_page;