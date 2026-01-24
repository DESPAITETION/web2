function Support() {
  const services = [
    {
      icon: 'project/project/img/support1.svg',
      title: 'Мониторинг',
      description: '24/7 мониторинг работы сайта'
    },
    {
      icon: 'project/project/img/support2.svg',
      title: 'Обновления',
      description: 'Регулярные обновления системы'
    },
    {
      icon: 'project/project/img/support3.svg',
      title: 'Безопасность',
      description: 'Защита от взлома и вирусов'
    },
    {
      icon: 'project/project/img/support4.svg',
      title: 'Резервные копии',
      description: 'Ежедневное резервное копирование'
    },
    {
      icon: 'project/project/img/support5.svg',
      title: 'Оптимизация',
      description: 'Повышение скорости загрузки'
    },
    {
      icon: 'project/project/img/support6.svg',
      title: 'Консультации',
      description: 'Помощь в работе с сайтом'
    }
  ];

  return (
    <section className="support" id="support">
      <div className="container">
        <h2 className="section__title">Техническая поддержка</h2>
        <div className="support__grid">
          {services.map((service, index) => (
            <div key={index} className="support__item">
              <img src={service.icon} alt="" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Support;
