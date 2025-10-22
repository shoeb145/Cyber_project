import React, { useEffect, useState } from "react";
import "./CounterSection.css";

const counters = [
  {
    value: 150,
    suffix: "+",
    label: "Certified Security Officers",
  },
  {
    value: 12,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Client Satisfaction Rating",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Incident-Free Rate",
  },
];


const CounterCard = ({ value, suffix, label, isDecimal }) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    let start = 1;
    let end = value;
    let duration = 1200; // ms
    let frame = 0;
    let totalFrames = 60;
    let increment = (end - start) / totalFrames;
    let raf;
    function animate() {
      frame++;
      let next = start + increment * frame;
      if (isDecimal) {
        next = Math.min(end, Math.round(next * 10) / 10);
      } else {
        next = Math.min(end, Math.round(next));
      }
      setCount(next);
      if (frame < totalFrames) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [value, isDecimal]);
  return (
    <div className="counter-card">
      <div className="counter-value">
        <span className="counter-number">{isDecimal ? count.toFixed(1) : count}</span>
        <span className="counter-suffix">{suffix}</span>
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
};

const CounterSection = () => {
  return (
    <section className="counter-section">
      <div className="counter-container">
        {counters.map((counter, idx) => (
          <CounterCard
            key={idx}
            value={counter.value}
            suffix={counter.suffix}
            label={counter.label}
            isDecimal={counter.value % 1 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default CounterSection;
