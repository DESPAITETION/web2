function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section__title">О компании</h2>
        <div className="about__content">
          <div className="about__image">
            <img src="project/project/img/laptop.png" alt="Drupal development" />
          </div>
          <div className="about__text">
            <p>Drupal-coder - команда профессиональных разработчиков, специализирующихся на создании сайтов на Drupal. Мы работаем с этой CMS с 2008 года и имеем богатый опыт в разработке различных проектов.</p>
            <p>Наша компания предоставляет полный цикл услуг по разработке веб-сайтов: от проектирования и дизайна до внедрения и технической поддержки.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
