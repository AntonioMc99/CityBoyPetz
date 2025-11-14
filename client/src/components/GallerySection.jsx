// client/src/components/GallerySection.jsx
const galleryItems = [1, 2, 3, 4];

export default function GallerySection() {
  return (
    <section className="section section-light" id="gallery">
      <div className="section-inner">
        <h2 className="section-title">City Boy Petz in Action</h2>
        <div className="gallery-grid">
          {galleryItems.map((i) => (
            <div key={i} className="gallery-tile">
              <span className="gallery-label">Photo placeholder #{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

