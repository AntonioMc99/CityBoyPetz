import "./styles.css";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import Featured from "./components/Featured.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

// new imports
import AboutSection from "./components/AboutSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import ReviewsSection from "./components/ReviewsSection.jsx";
import GallerySection from "./components/GallerySection.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />

        {/* New sections */}
        <AboutSection />
        <ServicesSection />

        {/* Existing content */}
        <CategoryGrid />
        <Featured />

        <ReviewsSection />
        <GallerySection />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
