import { useState, useEffect } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
  }, [formData]);

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация телефона (российский формат)
  const validatePhone = (phone) => {
    if (!phone) return true; // Телефон необязательное поле
    const re = /^[\d\s\+\-\(\)]{10,}$/;
    return re.test(phone);
  };

  // Валидация всей формы
  const validateForm = () => {
    const newErrors = {};

    // Проверка имени
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Проверка телефона (если заполнен)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    // Проверка сообщения
    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите сообщение';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Отмечаем поле как затронутое
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Убираем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Проверка валидности отдельного поля
  const isFieldValid = (fieldName) => {
    if (!touched[fieldName] || !formData[fieldName]) return false;
    
    switch(fieldName) {
      case 'name':
        return formData.name.trim().length >= 2;
      case 'email':
        return validateEmail(formData.email);
      case 'phone':
        return !formData.phone || validatePhone(formData.phone);
      case 'message':
        return formData.message.trim().length >= 10;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация формы
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Пожалуйста, исправьте ошибки в форме'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Отправка на FormCarry
      const response = await fetch('https://formcarry.com/s/jPNLWXFAziU', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'
        });
        
        // Очистка формы
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        localStorage.removeItem('contactFormData');
        setErrors({});
        setTouched({});
      } else {
        throw new Error(result.message || 'Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="contact-form">
      <div className="container">
        <h2 className="section__title">Связаться с нами</h2>
        <form onSubmit={handleSubmit} className="form" id="contactForm" noValidate>
          <div className="form__row">
            <div className="form__group">
              <label htmlFor="name" className="form__label">Имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form__input ${errors.name ? 'form__input--error' : ''} ${isFieldValid('name') && !errors.name ? 'form__input--success' : ''}`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ваше имя"
              />
              {errors.name && <span className="form__error">{errors.name}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="email" className="form__label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form__input ${errors.email ? 'form__input--error' : ''} ${isFieldValid('email') && !errors.email ? 'form__input--success' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
              />
              {errors.email && <span className="form__error">{errors.email}</span>}
            </div>
          </div>
          <div className="form__row">
            <div className="form__group">
              <label htmlFor="phone" className="form__label">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form__input ${errors.phone ? 'form__input--error' : ''} ${isFieldValid('phone') && !errors.phone && formData.phone ? 'form__input--success' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+7 (999) 123-45-67"
              />
              {errors.phone && <span className="form__error">{errors.phone}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="company" className="form__label">Компания</label>
              <input
                type="text"
                id="company"
                name="company"
                className="form__input"
                value={formData.company}
                onChange={handleChange}
                placeholder="Название компании"
              />
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="message" className="form__label">Сообщение *</label>
            <textarea
              id="message"
              name="message"
              className={`form__textarea ${errors.message ? 'form__input--error' : ''} ${isFieldValid('message') && !errors.message ? 'form__input--success' : ''}`}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Расскажите о вашем проекте..."
            ></textarea>
            {errors.message && <span className="form__error">{errors.message}</span>}
          </div>
          <button 
            type="submit" 
            className={`btn btn--primary btn--submit ${loading ? 'loading' : ''}`} 
            disabled={loading}
          >
            <span className="btn__text">{loading ? 'Отправка...' : 'Отправить'}</span>
            {loading && <span className="btn__loader"></span>}
          </button>
          {status.message && (
            <div className={`form__message form__message--${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
