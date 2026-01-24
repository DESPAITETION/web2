import { useState } from 'react';

function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    about: false,
    services: false
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setDropdownOpen({ about: false, services: false });
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__wrapper">
          <a href="#" className="navbar__logo" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}>
            <img src="project/project/img/drupal-coder.svg" alt="Drupal-coder" />
          </a>
          
          <button 
            className={`navbar__toggle ${mobileMenuOpen ? 'active' : ''}`}
            id="menuToggle"
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`navbar__menu ${mobileMenuOpen ? 'active' : ''}`} id="navbarMenu">
            <ul className="navbar__list">
              <li className={`navbar__item navbar__item--dropdown ${dropdownOpen.about ? 'active' : ''}`}>
                <a 
                  href="#about" 
                  className={`navbar__link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('about');
                  }}
                >
                  О нас
                </a>
                <ul className="navbar__dropdown">
                  <li><a href="#team" onClick={(e) => handleLinkClick(e, '#team')}>Команда</a></li>
                  <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>О компании</a></li>
                  <li><a href="#awards" onClick={(e) => handleLinkClick(e, '#awards')}>Награды</a></li>
                </ul>
              </li>
              <li className={`navbar__item navbar__item--dropdown ${dropdownOpen.services ? 'active' : ''}`}>
                <a 
                  href="#competencies" 
                  className={`navbar__link ${activeSection === 'competencies' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('services');
                  }}
                >
                  Услуги
                </a>
                <ul className="navbar__dropdown">
                  <li><a href="#competencies" onClick={(e) => handleLinkClick(e, '#competencies')}>Компетенции</a></li>
                  <li><a href="#support" onClick={(e) => handleLinkClick(e, '#support')}>Поддержка</a></li>
                  <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')}>Портфолио</a></li>
                </ul>
              </li>
              <li className="navbar__item">
                <a 
                  href="#portfolio" 
                  className={`navbar__link ${activeSection === 'portfolio' ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, '#portfolio')}
                >
                  Портфолио
                </a>
              </li>
              <li className="navbar__item">
                <a 
                  href="#team" 
                  className={`navbar__link ${activeSection === 'team' ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, '#team')}
                >
                  Команда
                </a>
              </li>
              <li className="navbar__item">
                <a 
                  href="#contacts" 
                  className={`navbar__link ${activeSection === 'contacts' ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, '#contacts')}
                >
                  Обратная связь
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
