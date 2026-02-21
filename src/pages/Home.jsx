import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Process from "@/sections/Process";
import Portfolio from "@/sections/Portfolio";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

const Home = () => (
  <div className="min-h-screen gradient-bg">
    <Navbar />
    <main>
      <Hero />
      <Services />
      <About />
      <Process />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Home;
