const categories = [
  { title: "School Programs", desc: "Reptile shows for classrooms & assemblies." },
  { title: "Birthday Parties", desc: "Hands-on reptile fun for kids." },
  { title: "Community Events", desc: "Large group educational encounters." },
  { title: "Private Sessions", desc: "One-on-one reptile learning experiences." }
];

export default function CategoryGrid() {
  return (
    <section id="services" className="section-grid">
      <h2>Choose Your Experience</h2>

      <div className="grid">
        {categories.map((item) => (
          <article key={item.title} className="card">
            <div className="card-img-placeholder">Image</div>
            <div className="card-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
