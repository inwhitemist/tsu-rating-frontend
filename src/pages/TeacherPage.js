import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/TeacherPage.module.css';

const TeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/teachers/${id}/`)
      .then(response => {
        setTeacher(response.data);
      })
      .catch(error => console.error('Error fetching teacher:', error));

    axios.get(`http://localhost:8000/api/reviews/?teacher=${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className={`${styles.container} dynamic-gradient mx-auto p-4`}>
      <header className={`${styles.header} text-center mb-8`}>
        <img src={teacher.image} alt={`${teacher.name}`} className={`${styles.teacherPhoto} mx-auto mb-4`} />
        <h1 className="text-3xl font-bold">{teacher.name}</h1>
        <p className="text-lg">Кафедра: {teacher.department}</p>
        <p className="text-lg">Рейтинг: {teacher.rating}</p>
        <p className="text-lg">Место: {teacher.rank}</p> {/* Добавлено отображение ранга */}
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Отзывы</h2>
        <ul className="space-y-4">
          {reviews.map(review => (
            <li key={review.id} className={`${styles.reviewCard} p-4 shadow-md`}>
              <p>{review.comment}</p>
              <p className="text-gray-300">Рейтинг: {review.rating}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TeacherPage;
