import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${icon || ""}`} aria-hidden="true" />
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, position }) => {
  return (
    <div className="testimonial-card">
      <div className="quote-mark" aria-hidden="true">
        "
      </div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        <div className="author-name">{author}</div>
        <div className="author-position">{position}</div>
      </div>
    </div>
  );
};

const Demo = () => {
  return (
    <div id="background">
      <div className="secuby-container">
        <header className="header" role="banner">
          <div className="header-inner">
            <div className="brand">
              <a href="#" className="brand-link" aria-label="Secuby home">
                <img
                  src="https://framerusercontent.com/images/U2I7fLtX2zVVMKW9URIZ9olX0.svg"
                  alt="Secuby Logo"
                  className="logo"
                />
              </a>
            </div>

            <nav className="main-nav" aria-label="Primary">
              <ul className="nav-list">
                <li>
                  <a className="nav-link" href="#features">
                    All Pages
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#solutions">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#pricing">
                    Review
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#about">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <div className="nav-actions">
              <Link className="login-link" to="/signup">
                Dashboard
              </Link>
              <a className="cta primary-cta" href="#contact">
                Get demo
              </a>
              <button
                className="mobile-menu-button"
                aria-label="Open menu"
                type="button"
                aria-expanded="false"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main>
          <section className="hero-section" id="hero">
            <div className="hero-content">
              <div className="tag-pill">
                <span className="tag-text">
                  Trusted Protection for Every Doorstep
                </span>
              </div>
              <h1 className="hero-title">
                Reliable Cyber Security for Your Peace of Mind
              </h1>

              <p className="hero-subtitle">
                At Redzone we provide trusted, around-the-clock security
                solutions tailored to protect.
              </p>

              <div className="cta-buttons">
                <a href="#demo" className="primary-button">
                  Start Protecting Your Presence
                </a>
              </div>
            </div>

            {/* <div className="hero-image" aria-hidden="true">
            <div className="image-container">
              <img
                src="--https://framerusercontent.com/images/cX3Ve1gMhvYi44m691mXK99jUs.png"
                alt="Cyber Security Visualization"
                className="main-image"
              />
              <div className="image-decoration left-decoration" />
              <div className="image-decoration right-decoration" />
              <div className="image-indicator">
                <span className="indicator-dot" />
              </div>
            </div>
          </div> */}
          </section>

          {/* <section className="features-section" id="features">
          <h2 className="section-title">Advanced Protection For Your Financial Assets</h2>

          <div className="features-grid">
            <FeatureCard
              title="Threat Detection"
              description="Identify and neutralize cyber threats before they compromise your systems."
              icon="shield-icon"
            />
            <FeatureCard
              title="Data Encryption"
              description="Secure sensitive financial data with military-grade encryption standards."
              icon="lock-icon"
            />
            <FeatureCard
              title="Compliance"
              description="Stay compliant with financial regulations and security standards."
              icon="document-icon"
            />
          </div>
        </section> */}

          {/* <section className="solutions-section" id="solutions">
          <div className="solutions-content">
            <div className="solutions-info">
              <h2 className="solutions-title">Real-Time Monitoring</h2>
              <p className="solutions-description">
                Our security operations center monitors your systems 24/7, providing immediate
                response to potential security incidents.
              </p>

              <div className="solutions-features">
                <div className="feature-item">
                  <span className="feature-indicator" />
                  <span className="feature-text">Continuous Monitoring</span>
                </div>
                <div className="feature-item">
                  <span className="feature-indicator" />
                  <span className="feature-text">Instant Alerts</span>
                </div>
                <div className="feature-item">
                  <span className="feature-indicator" />
                  <span className="feature-text">Rapid Response</span>
                </div>
              </div>
            </div>

            <div className="solutions-visual" aria-hidden="true">
              <div className="visual-container">
                <div className="glow-effect green-glow" />
                <div className="glow-effect blue-glow" />
                <img
                  src="https://framerusercontent.com/images/example-security-dashboard.png"
                  alt="Security Dashboard"
                  className="dashboard-image"
                />
              </div>
            </div>
          </div>
        </section> */}

          {/* <section className="testimonials-section" id="testimonials">
          <div className="testimonial-header">
            <div className="tag-pill small">
              <span className="tag-indicator" />
              <span className="tag-text">Trusted By Leaders</span>
            </div>

            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            <TestimonialCard
              quote="Secuby has transformed our security posture. We feel confident in our ability to protect customer data."
              author="Maria Chen"
              position="CTO, Financial Services Inc."
            />
            <TestimonialCard
              quote="The real-time monitoring capabilities have helped us identify and address threats before they become problems."
              author="James Wilson"
              position="Security Director, Global Bank"
            />
            <TestimonialCard
              quote="Implementing Secuby's solutions helped us achieve compliance with industry regulations while strengthening our security."
              author="Sarah Johnson"
              position="Compliance Officer, Investment Firm"
            />
            <TestimonialCard
              quote="The expertise of the Secuby team is unmatched. They understand the unique security challenges of the financial sector."
              author="Michael Brown"
              position="CEO, Online Payment Platform"
            />
          </div>
        </section> */}
        </main>

        {/* <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <img
                src="https://framerusercontent.com/images/U2I7fLtX2zVVMKW9URIZ9olX0.svg"
                alt="Secuby Logo"
              />
            </div>

            <p className="footer-description">
              Providing comprehensive cyber security solutions for financial institutions and services.
            </p>
          </div>

          <div className="footer-links" aria-hidden="true">
            <div className="link-group">
              <h4 className="link-group-title">Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Resources</h4>
              <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Secuby. All rights reserved.
          </div>

          <div className="social-links" aria-hidden="true">
            <a href="#linkedin" className="social-icon linkedin" />
            <a href="#twitter" className="social-icon twitter" />
            <a href="#facebook" className="social-icon facebook" />
          </div>
        </div>
      </footer> */}
      </div>
    </div>
  );
};

export default Demo;
