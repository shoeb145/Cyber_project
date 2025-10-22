import React from 'react';
import './BenefitsSection.css';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Customized Security Plans",
      description: "No two properties are alike. We assess your specific risks and goals to deliver."
    },
    {
      id: 2,
      title: "Rapid Response Team",
      description: "In the face of an emergency, every second counts our rapid response units."
    },
    {
      id: 3,
      title: "Peace of Mind, Guaranteed",
      description: "From surveillance cameras and access control systems to mobile patrol."
    }
  ];

  return (
    <section className="benefits-section" data-framer-name="Benefits Section">
      <div className="benefits-container" data-framer-name="Container">
        {/* Section Title */}
        <div className="benefits-title-wrapper">
          <div className="benefits-title-content" data-framer-name="Text Content">
            <div className="benefits-title-container" data-framer-component-type="RichTextContainer">
              <h2 className="benefits-title">
                Benefits of choosing <br/> Secuby® security
              </h2>
            </div>
          </div>
        </div>

        {/* Benefit Image */}
        <div className="benefits-image" data-framer-name="Benefit Image">
          <div className="benefits-blur-1" data-framer-name="Blur"></div>
          <div className="benefits-blur-2" data-framer-name="Blur"></div>
          
          <div className="benefits-shape-outer" data-framer-name="Shape">
            <div className="benefits-image-wrapper" data-framer-background-image-wrapper="true">
              <img 
                decoding="async" 
                loading="lazy"
                width="506" 
                height="506"
                src="https://framerusercontent.com/images/CfzVp8kJuwa335WS2z7fC6orkR4.svg"
                alt="Security Benefits"
                className="benefits-main-image"
              />
            </div>
          </div>
          
          <div className="benefits-shape-inner">
            <div className="benefits-image-wrapper" data-framer-background-image-wrapper="true">
              <img 
                decoding="async" 
                loading="lazy"
                width="306" 
                height="306"
                src="https://framerusercontent.com/images/tuFQna4G2XlSgxwIrcx6iOeO7w.svg"
                alt="Security Shape"
                className="benefits-inner-image"
              />
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="benefits-list" data-framer-name="Benefit List">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="benefit-item-container">
              <div 
                className={`benefit-item ${index === benefits.length - 1 ? 'last-item' : ''}`}
                data-border="true" 
                data-framer-name="Desktop"
              >
                <div className="benefit-title-container" data-framer-component-type="RichTextContainer">
                  <p className="benefit-title">
                    {benefit.title}
                  </p>
                </div>
                <div className="benefit-description-container" data-framer-component-type="RichTextContainer">
                  <p className="benefit-description">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
