import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Competencies from './components/Competencies';
import Portfolio from './components/Portfolio';
import Support from './components/Support';
import Awards from './components/Awards';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <About />
        <Competencies />
        <Portfolio />
        <Support />
        <Awards />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
