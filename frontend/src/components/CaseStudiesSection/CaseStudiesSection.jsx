import React from "react";
import "./CaseStudiesSection.css";

const caseStudies = [
  {
    title: "Cyber Solutions",
    description: "Corporate Office Security: Addressing unauthorized access incidents",
    bullets: [
      "Live monitoring & reports.",
      "85% fewer security breaches.",
      "Enhanced tenant satisfaction ratings"
    ],
    image: "https://framerusercontent.com/images/xbouawoDsO32i9ukVY1Ongq6STU.png",
    shape: "https://framerusercontent.com/images/CfzVp8kJuwa335WS2z7fC6orkR4.svg",
    link: "./service/cyber-solutions"
  },
  {
    title: "Peace Mind Guaranteed",
    description: "Expert crowd management for large gatherings and sensitive VIP zones.",
    bullets: [
      "No significant incidents recorded",
      "Streamlined guest entry and exit.",
      "Commended by local law enforcement."
    ],
    image: "https://framerusercontent.com/images/Y3mFF5lD5a3YIlB2As7L39vTnDc.png",
    shape: "https://framerusercontent.com/images/CfzVp8kJuwa335WS2z7fC6orkR4.svg",
    link: "./service/peace-mind-guaranteed"
  },
  {
    title: "Security for Events",
    description: "Crowd management for large events and VIP areas.",
    bullets: [
      "No significant incidents recorded",
      "Streamlined guest entry and exit.",
      "Commended by local law enforcement."
    ],
    image: "https://framerusercontent.com/images/5F4z2ZB0XpL0BXtdPuAGuQZe64.png",
    shape: "https://framerusercontent.com/images/CfzVp8kJuwa335WS2z7fC6orkR4.svg",
    link: "./service/security-for-events"
  },
  {
    title: "ClearZone Surveillance",
    description: "Crowd management for large events and VIP areas.",
    bullets: [
      "No significant incidents recorded",
      "Streamlined guest entry and exit.",
      "Commended by local law enforcement."
    ],
    image: "https://framerusercontent.com/images/A5MVjc4vC5mgXln5o4okqlCtplk.png",
    shape: "https://framerusercontent.com/images/CfzVp8kJuwa335WS2z7fC6orkR4.svg",
    link: "./service/clearzone-surveillance"
  }
];

const CaseStudiesSection = () => (
  <section className="case-studies-section">
    <div className="case-studies-header">
      <h2 className="case-studies-title">Proven protection in action</h2>
      <p className="case-studies-subtitle">
        At Secuby® Security, we go beyond basic protection we deliver <br />strategic, results-driven security tailored
      </p>
    </div>
    <div className="case-studies-grid">
      {caseStudies.map((study, idx) => (
        <a className="case-study-card" href={study.link} key={idx}>
          <div className="case-study-image-content">
            <img className="case-study-main-img" src={study.image} alt="Icon" />
            <div className="case-study-blur-shape" />
            <img className="case-study-shape" src={study.shape} alt="Shape" />
          </div>
          <div className="case-study-content">
            <div className="case-study-title">{study.title}</div>
            <div className="case-study-desc">{study.description}</div>
            <ul className="case-study-list">
              {study.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="case-study-btn">
              <span>Discover More</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default CaseStudiesSection;
