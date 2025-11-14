export default function Featured() {
  const animals = [
    { name: "Ball Python", tag: "Calm • Beginner Friendly", price: "$150" },
    { name: "Bearded Dragon", tag: "Great Pet • Friendly", price: "$200" },
    { name: "Corn Snake", tag: "Gentle • Easy to Handle", price: "$120" }
  ];

  return (
    <section id="animals" className="featured-section">
      <h2>Featured Animals</h2>

      <div className="grid">
        {animals.map((a) => (
          <article key={a.name} className="featured-card">
            <div className="featured-img">Image</div>
            <div className="featured-body">
              <h3>{a.name}</h3>
              <p className="tag">{a.tag}</p>
              <p className="price">{a.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
