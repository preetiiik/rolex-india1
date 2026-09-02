import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Values from "./components/Values";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PrivacyPolicy, TermsOfService } from "./components/LegalPages";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <Values />
      <Products />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;