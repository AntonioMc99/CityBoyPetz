// client/src/components/ServicesSection.jsx

const services = [
  {
    id: "school",
    title: "School Programs",
    blurb: "Reptile shows for classrooms & assemblies.",
    image: null,
  },
  {
    id: "birthday",
    title: "Birthday Parties",
    blurb: "Hands-on reptile fun for kids.",
    image: "/images/carlpartypic.JPG", // 👈 your birthday photo
  },
  {
    id: "community",
    title: "Community Events",
    blurb: "Large group educational encounters for festivals and fairs.",
    image: null,
  },
  {
    id: "private",
    title: "Private Sessions",
    blurb: "One-on-one or small-group reptile learning experiences.",
    image: null,
  },
];

export default function ServicesSection() {
  return (
    <section className="section section-light" id="services">
      <div className="section-inner">
        <h2 className="section-title">Choose Your Experience</h2>

        <div className="card-grid">
          {services.map((svc) => (
            <article key={svc.id} className="card">
              {svc.image && (
                <div className="card-image">
                  <img src={svc.image} alt={svc.title} />
                </div>
              )}
              <h3 className="card-title">{svc.title}</h3>
              <p className="card-text">{svc.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
