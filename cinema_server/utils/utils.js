const axios = require("axios");

const getAll = (url) => {
  return axios.get(url);
};

const getById = (url, id) => axios.get(`${url}/${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

module.exports = { getAll, getById, addItem, updateItem, deleteItem }; 
