// client/src/components/SubscribeSection.jsx
export default function SubscribeSection() {
  return (
    <section className="section section-dark" id="subscribe">
      <div className="section-inner">
        <h2 className="section-title">Stay in the Loop</h2>
        <p className="section-text">
          Drop your email and be the first to know about openings, specials,
          and new services.
        </p>
        <form
          className="subscribe-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for subscribing! (This is a placeholder for now.)");
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            className="input"
            required
          />
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}

