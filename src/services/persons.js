import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateContact = (id, updatedContact) => {
  return axios.put(`${baseUrl}/${id}`, updatedContact);
};

export default { getAll, create, deleteContact, updateContact };
