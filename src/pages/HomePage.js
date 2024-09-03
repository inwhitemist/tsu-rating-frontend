import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [newAction, setNewAction] = useState({ teacherId: '', description: '', user: '1', points: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const teachersListRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/teachers/')
      .then(response => {
        // Сортируем преподавателей по рангу
        const sortedTeachers = response.data.sort((a, b) => a.rank - b.rank);
        setTeachers(sortedTeachers);
      })
      .catch(error => console.error('Ошибка при получении списка преподавателей:', error));
  }, []);

  const handleAddAction = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!newAction.teacherId || !newAction.description || !newAction.points) {
      setErrorMessage('Пожалуйста, заполните все поля');
      return;
    }

    const actionData = {
      teacher: newAction.teacherId,
      description: newAction.description,
      points: parseInt(newAction.points),
      user: newAction.user,
      status: 'pending'
    };

    axios.post('http://localhost:8000/api/actions/', actionData)
      .then(() => {
        setSuccessMessage('Поступок добавлен и ожидает модерации.');
        setNewAction({ teacherId: '', description: '', user: '1', points: 0 });
      })
      .catch(error => {
        console.error('Ошибка при добавлении поступка:', error);
        setErrorMessage('Произошла ошибка при добавлении поступка. Пожалуйста, попробуйте еще раз.');
      });
  };

  const scrollLeft = () => {
    teachersListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    teachersListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      <Container>
        <header className="header text-white mb-5">
          <h1>Рейтинг преподавателей</h1>
        </header>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <div className="menu-bar">
          <div className="menu-bar-logo-wrap">
            <a href="/" className="menu-bar-logo">
              <span className="menu-bar-logo-abs menu-bar-logo-abs-small">
                <img className="menu-bar-logo-small" src="" alt="logo-stone" />
              </span>
              <span className="menu-bar-logo-abs menu-bar-logo-abs-big">
                <img className="menu-bar-logo-big" src="" alt="logo" />
              </span>
            </a>
          </div>
          <div className="menu-bar-navigation text-decoration:none">
            <div className="menu-bar-navigation-group">
              <a href="/" className="mbn-item">
                <span className="mbn-item-icon">
                  <img src="https://risazatvorchestvo.com/wp-content/themes/smtheme/library/images/menu-home.svg" alt="menu-home" />
                </span>
                <span className="mbn-item-text">Главная</span>
              </a>
              <span className="menu-bar-separator"></span>
              <a href="/about" className="mbn-item">
                <span className="mbn-item-icon">
                  <img src="https://risazatvorchestvo.com/wp-content/themes/smtheme/library/images/menu-about.svg" alt="menu-about" />
                </span>
                <span className="mbn-item-text">Модерация</span>
              </a>
            </div>
          </div>
        </div>
        <div className="position-relative mb-4">
          <h2 className="text-center text-white">Преподаватели</h2>
          <div className="container-scroll-buttons position-absolute">
            <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
            <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
          </div>
        </div>
        
        <section className="teachers-list mb-5" ref={teachersListRef}>
          <div className="d-flex flex-wrap justify-content-center">
            {teachers.map(teacher => (
              <div key={teacher.id} className="mx-3 mb-4" style={{width: '240px'}}>
                <Link to={`/teacher/${teacher.id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm rounded-lg overflow-hidden dynamic-gradient" style={{ color: '#fff', border: 'solid 1px #242629' }}>
                    <img src={teacher.image} alt={teacher.name} />
                    <div className="card-body p-3">
                      <h3 className="card-title mb-2 fs-5">{teacher.name}</h3>
                      <p className="card-text mb-1 small">Кафедра: {teacher.department}</p>
                      <p className="card-text small">Рейтинг: {teacher.rating}</p>
                    </div>
                    <div className="card-footer font-bold mt-8" style={{ background: '#242629' }}>Место: {teacher.rank}</div> {/* Перемещено в нижнюю часть карточки */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="add-action mt-5">
          <h2 className="mb-4">Добавить новый поступок</h2>
          <Form onSubmit={handleAddAction}>
            <Form.Group className="mb-3">
              <Form.Label>Преподаватель</Form.Label>
              <Form.Select
                value={newAction.teacherId}
                onChange={e => setNewAction({ ...newAction, teacherId: e.target.value })}
                required
              >
                <option value="">Выберите преподавателя</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="text"
                placeholder="Описание поступка"
                value={newAction.description}
                onChange={e => setNewAction({ ...newAction, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Баллы</Form.Label>
              <Form.Control
                type="number"
                placeholder="Количество баллов"
                value={newAction.points}
                onChange={e => setNewAction({ ...newAction, points: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Добавить поступок
            </Button>
          </Form>
        </section>
      </Container>
    </>
  );
};

export default HomePage;
