// client/src/components/ReviewsSection.jsx
const reviews = [
  {
    name: "Bri’s Family",
    text: "City Boy Petz treats our dog like family. He comes home happy and exhausted every time.",
  },
  {
    name: "A. Johnson",
    text: "Reliable, communicative, and patient with our anxious pup. Couldn’t ask for better care.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section section-dark" id="reviews">
      <div className="section-inner">
        <h2 className="section-title">Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((r) => (
            <blockquote key={r.name} className="review-card">
              <p className="review-text">“{r.text}”</p>
              <footer className="review-footer">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

