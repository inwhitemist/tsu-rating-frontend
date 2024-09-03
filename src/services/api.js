import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Замените на свой URL, если требуется

export const fetchTeachers = () => axios.get(`${API_URL}/api/teachers/`);
export const fetchTeacher = (id) => axios.get(`${API_URL}/api/teachers/${id}/`);
export const fetchReviewsByTeacher = (teacherId) => axios.get(`${API_URL}/api/reviews/?teacher=${teacherId}`);
