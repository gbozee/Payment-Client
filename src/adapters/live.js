import axios from "axios";
let baseUrl = "http://localhost:3000";
const instance = axios.create({
  baseURL: baseUrl
});

function errorCallback(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw error.response;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    throw "No response from server";
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    throw error.message;
  }
}

async function login(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}

async function authenticate(token) {
  try {
    const response = await instance.post("/authenticate", { token });
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}

async function getAllWithdrawals() {
  try {
    const response = await instance.get("/withdrawals");
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}

async function getTransactions(withrawalOrder) {
  try {
    const response = await instance.get("/transactions");
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}

async function getBookingTransaction(transactionOrder) {
  try {
    const response = await instance.get("/booking_transaction");
    return response.data[0];
  } catch (error) {
    return errorCallback(error);
  }
}

async function deleteTransaction(order) {
  try {
    const response = await instance.delete(`/transactions/${order}`);
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}
async function deleteWithdrawal(order) {
  try {
    const response = await instance.delete(`/withdrawals/${order}`);
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}
async function makePayment(order) {
  try {
    const response = await instance.post(`/make-payment/${order}`);
    return response.data;
  } catch (error) {
    return errorCallback(error);
  }
}
export default {
  login,
  authenticate,
  getAllWithdrawals,
  getTransactions,
  getBookingTransaction,
  deleteTransaction,
  deleteWithdrawal,
  makePayment
};
