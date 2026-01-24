import Navbar from './Navbar';
import Hero from './Hero';

function Header({ activeSection }) {
  return (
    <header className="header">
      <video className="header__video" autoPlay loop muted playsInline>
        <source src="project/project/img/video.mp4" type="video/mp4" />
      </video>
      <div className="header__overlay"></div>
      <Navbar activeSection={activeSection} />
      <Hero />
    </header>
  );
}

export default Header;
