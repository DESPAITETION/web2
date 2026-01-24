function Awards() {
  const awards = [
    {
      image: 'project/project/img/cup.png',
      description: 'Победитель конкурса Drupal Camp 2019'
    },
    {
      image: 'project/project/img/logo-estee.png',
      description: 'Сертифицированный партнер'
    }
  ];

  return (
    <section className="awards" id="awards">
      <div className="container">
        <h2 className="section__title">Награды и сертификаты</h2>
        <div className="awards__grid">
          {awards.map((award, index) => (
            <div key={index} className="award">
              <img src={award.image} alt="Award" />
              <p>{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
