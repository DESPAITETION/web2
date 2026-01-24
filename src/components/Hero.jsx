function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <h1 className="hero__title">Разработка сайтов на Drupal</h1>
        <p className="hero__subtitle">Создаем сайты на Drupal с 2008 года</p>
        <button className="btn btn--primary" id="contactBtn" onClick={() => {
          const contact = document.querySelector('#contacts');
          if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        }}>
          Связаться с нами
        </button>
      </div>
    </div>
  );
}

export default Hero;
