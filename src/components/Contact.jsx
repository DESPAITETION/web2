import React, { useState } from 'react';

const Contact = () => {
  // Единое состояние для управления полями формы холдинга
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // Состояния для уведомлений пользователя
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Универсальный обработчик ввода данных
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Отправка данных...');
    setIsSuccess(false);

    // --- 1. СТРОГАЯ ФРОНТЕНД-ВАЛИДАЦИЯ ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/; // Только цифры, от 10 до 15 знаков, опциональный +

    if (!emailRegex.test(formData.email.trim())) {
      setIsSuccess(false);
      setStatusMessage('Ошибка: Некорректный формат Email-адреса. Пример: test@example.com');
      return;
    }

    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      setIsSuccess(false);
      setStatusMessage('Ошибка: Некорректный формат телефона. Разрешены только цифры (от 10 до 15 знаков).');
      return;
    }

    // --- 2. ОПРЕДЕЛЕНИЕ СТАТУСА АВТОРblockИЗАЦИИ ---
    // Считываем параметр id из URL строки браузера (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Формируем payload для отправки на бэкенд, добавляя туда id пользователя
    const payload = {
      ...formData,
      id: userId ? parseInt(userId, 10) : null
    };

    try {
      // Отправляем относительный запрос на contact.php
      const response = await fetch('contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Ошибка сети или ответа сервера.');
      }

      const result = await response.json();

      if (result.status === 'success') {
        setIsSuccess(true);
        
        if (userId) {
          // Режим авторизованного пользователя: выводим сообщение об успешном UPDATE
          setStatusMessage(result.message);
        } else {
          // Режим неавторизованного пользователя: выводим сгенерированные данные по ТЗ
          setStatusMessage(
            `🎉 Вы успешно зарегистрированы!\n\n` +
            `👤 Ваш логин: ${result.login}\n` +
            `🔑 Ваш пароль: ${result.password}\n\n` +
            `🔗 Ссылка на ваш профиль:\n${result.profile_url}`
          );

          // Очищаем форму только при первичной регистрации нового аккаунта
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: ''
          });
        }
      } else {
        setIsSuccess(false);
        setStatusMessage(result.message || 'Произошла непредвиденная ошибка бэкенда.');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setIsSuccess(false);
      setStatusMessage('Не удалось установить соединение с сервером.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Связаться с нами</h2>
      <p style={{ color: '#666' }}>Заполните форму обратной связи, и наши специалисты свяжутся с вами.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Имя *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Телефон</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="company" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Компания</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Сообщение *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Отправить сообщение
        </button>
      </form>

      {statusMessage && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          borderRadius: '4px', 
          backgroundColor: isSuccess ? '#e2f0d9' : '#fce4d6', 
          color: isSuccess ? '#385723' : '#c65911',
          border: `1px solid ${isSuccess ? '#a9d08e' : '#f4b084'}`,
          fontWeight: 'bold',
          whiteSpace: 'pre-wrap' // Важно для красивого переноса строк (\n) логина и пароля
        }}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default Contact;