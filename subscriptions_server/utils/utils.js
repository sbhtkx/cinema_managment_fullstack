const axios = require("axios");

const getAll = (url) => {
  return axios.get(url);
};

const getById = (url, id) => axios.get(`${url}/${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

const switchMonthDayInDateString = (str) => {
  //TODO: it doesn't work when the day is greater than 12!!!
  const tmpDate = new Date(str);
  const day = tmpDate.getDate();
  const month = tmpDate.getMonth() + 1;
  const year = tmpDate.getFullYear();
  return `${month}-${day}-${year}`;
};

// TODO: check what is going on with the dates
const UTCDateStringToISTDateString = (str) => {
  let dateUTC = new Date(str);
  dateUTC = dateUTC.getTime();
  const dateIST = new Date(dateUTC);
  //date shifting for IST timezone (+5 hours and 30 minutes)
  dateIST.setHours(dateIST.getHours() + 5);
  dateIST.setMinutes(dateIST.getMinutes() + 30);
  return dateIST.toString();
};

module.exports = {
  getAll,
  getById,
  addItem,
  updateItem,
  deleteItem,
  switchMonthDayInDateString,
  UTCDateStringToISTDateString,
};
