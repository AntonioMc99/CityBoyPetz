import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import Featured from "./components/Featured.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App(){
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Navbar />
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <Hero />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <CategoryGrid />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Featured />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <CTA />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <Footer />
        </div>
      </footer>
    </>
  );
}
