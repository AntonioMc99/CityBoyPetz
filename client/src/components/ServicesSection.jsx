// client/src/components/ServicesSection.jsx
const services = [
  {
    title: "Structured Dog Walks",
    blurb: "Controlled, focused walks that work the body and the brain.",
  },
  {
    title: "Drop-In Visits",
    blurb: "Quick check-ins for food, water, bathroom breaks, and love.",
  },
  {
    title: "Pet Transport",
    blurb: "Safe rides to the groomer, vet, or daycare when you’re busy.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section section-light" id="services">
      <div className="section-inner">
        <h2 className="section-title">What We Do</h2>
        <div className="card-grid">
          {services.map((svc) => (
            <article key={svc.title} className="card">
              <div className="card-image-placeholder" />
              <h3 className="card-title">{svc.title}</h3>
              <p className="card-text">{svc.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

