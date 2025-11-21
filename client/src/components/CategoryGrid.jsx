const categories = [
  { title: "School Programs", desc: "Reptile shows for classrooms & assemblies." },
  { title: "Birthday Parties", desc: "Hands-on reptile fun for kids." },
  {
    title: "ExoHood Ranch",
    desc: "Offers kids a fun, hands-on farm experience with live animals and simple homesteading activities."
  },
  { title: "Live Animal Props", desc: "We provide safe, professional live animals for photoshoots and music videos." }
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
