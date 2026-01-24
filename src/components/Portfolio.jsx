function Portfolio() {
  const projects = [
    {
      image: 'project/project/img/farbors_ru.jpg',
      title: 'Farbors.ru',
      description: 'Интернет-магазин красок'
    },
    {
      image: 'project/project/img/cableman_ru.png',
      title: 'Cableman.ru',
      description: 'Сайт производителя кабельной продукции'
    },
    {
      image: 'project/project/img/nashagazeta_ch.png',
      title: 'Nashagazeta.ch',
      description: 'Новостной портал'
    },
    {
      image: 'project/project/img/lpcma_rus_v4.jpg',
      title: 'LPCMA.ru',
      description: 'Корпоративный сайт'
    }
  ];

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <h2 className="section__title">Наши работы</h2>
        <div className="portfolio__grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio__item">
              <img src={project.image} alt={project.title} />
              <div className="portfolio__overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
