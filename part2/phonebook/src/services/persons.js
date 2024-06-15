import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getPersons = () => axios.get(baseUrl).then(res => res.data);

const createPerson = newPerson =>
  axios.post(baseUrl, newPerson).then(res => res.data);

const updatePerson = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data);

const deletePerson = id =>
  axios.delete(`${baseUrl}/${id}`).then(res => res.data);

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson
};
