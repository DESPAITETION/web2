function Team() {
  const team = [
    {
      photo: 'project/project/img/IMG_2472_0.jpg',
      firstName: 'Сергей',
      lastName: 'Синица',
      position: 'Руководитель проектов'
    },
    {
      photo: 'project/project/img/IMG_2474_1.jpg',
      firstName: 'Алексей',
      lastName: 'Синица',
      position: 'Ведущий разработчик'
    },
    {
      photo: 'project/project/img/IMG_2522_0.jpg',
      firstName: 'Дарья',
      lastName: 'Бочкарева',
      position: 'Frontend-разработчик'
    },
    {
      photo: 'project/project/img/IMG_2539_0.jpg',
      firstName: 'Роман',
      lastName: 'Агабеков',
      position: 'UX/UI дизайнер'
    },
    {
      photo: 'project/project/img/IMG_9971_16.jpg',
      firstName: 'Ирина',
      lastName: 'Торкунова',
      position: 'Backend-разработчик'
    }
  ];

  return (
    <section className="team" id="team">
      <div className="container">
        <h2 className="section__title">Наша команда</h2>
        <div className="team__grid">
          {team.map((member, index) => (
            <div key={index} className="team__member">
              <img src={member.photo} alt="Team member" />
              <h3>
                {member.firstName}
                <br />
                {member.lastName}
              </h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
