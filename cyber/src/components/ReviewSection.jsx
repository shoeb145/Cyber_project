import React from "react";
import "./ReviewSection.css";

const reviews = [
  {
    name: "Mark Johnson",
    role: "Chief Technology Officer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    text: `Working with Secuby® Security has transformed our approach to safety. Their proactive strategies and commitment have ensured our operations run smoothly and securely. We couldn't ask for `,
    stars: 5
  },
  {
    name: "David Chowdhury",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 4,
    text: `Excellent service! Their team was professional and ensured our property was secured 24/7. We feel much safer now. Highly recommend for anyone looking for reliable security.`,
    stars: 5
  },
  {
    name: "Rayhan Karim",
    role: "Real Estate Developer",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4.9,
    text: `Quick response time and highly trained personnel. They handled every situation with care and efficiency. I’m very satisfied with the level of protection provided. Highly recommend for anyone looking.`,
    stars: 5
  }
];

const Star = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill={filled ? "#FFB800" : "#444"} xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}>
    <path d="M10 15.273l5.618 3.527-1.522-6.49L18.5 7.7l-6.618-.573L10 1 8.118 7.127 1.5 7.7l4.404 4.61-1.522 6.49L10 15.273z"/>
  </svg>
);

const ReviewSection = () => (
  <section className="review-section">
    <div className="review-header">
      <div className="review-tagline">Our clients & partners</div>
      <div className="review-desc">
        At Secuby® Security, we believe great service speaks for itself but our clients say it even better. Here's what they have to say.
      </div>
      <div className="review-rating">
        <span className="review-score">4.9/5</span>
        <span className="review-stars">
          {[...Array(5)].map((_, i) => <Star key={i} filled={true} />)}
        </span>
      </div>
    </div>
    <div className="review-cards">
      {reviews.map((r, idx) => (
        <div className="review-card" key={idx}>
          <div className="review-user">
            <img className="review-avatar" src={r.avatar} alt={r.name} />
            <div>
              <div className="review-name">{r.name}</div>
              <div className="review-role">{r.role}</div>
            </div>
          </div>
          <div className="review-text">{r.text}</div>
          <div className="review-footer">
            <span className="review-score">{r.rating}/5</span>
            <span className="review-stars">
              {[...Array(r.stars)].map((_, i) => <Star key={i} filled={i < Math.round(r.rating)} />)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ReviewSection;
