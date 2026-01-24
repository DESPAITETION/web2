function Competencies() {
  const competencies = [
    {
      icon: 'project/project/img/competency-1.svg',
      title: 'Разработка на Drupal',
      description: 'Создание сайтов любой сложности на CMS Drupal'
    },
    {
      icon: 'project/project/img/competency-2.svg',
      title: 'Миграция на Drupal',
      description: 'Перенос сайтов с других платформ на Drupal'
    },
    {
      icon: 'project/project/img/competency-3.svg',
      title: 'Интеграции',
      description: 'Интеграция с внешними сервисами и API'
    },
    {
      icon: 'project/project/img/competency-4.svg',
      title: 'Поддержка сайтов',
      description: 'Техническая поддержка и развитие проектов'
    },
    {
      icon: 'project/project/img/competency-5.svg',
      title: 'Обучение',
      description: 'Обучение работе с Drupal'
    },
    {
      icon: 'project/project/img/competency-6.svg',
      title: 'Консультации',
      description: 'Экспертные консультации по Drupal'
    },
    {
      icon: 'project/project/img/competency-7.svg',
      title: 'Аудит кода',
      description: 'Проверка качества кода и безопасности'
    },
    {
      icon: 'project/project/img/competency-8.svg',
      title: 'Оптимизация',
      description: 'Повышение производительности сайтов'
    }
  ];

  return (
    <section className="competencies" id="competencies">
      <div className="container">
        <h2 className="section__title">Наши компетенции</h2>
        <div className="competencies__grid">
          {competencies.map((item, index) => (
            <div key={index} className="competency">
              <img src={item.icon} alt="" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Competencies;
