import { testData, testDataTransactions } from "./test_data";

let token = "TESTDATATOKEN";
function login(email, password) {
  return new Promise(resolve => resolve(token));
}

function authenticate(token) {
  return new Promise(resolve => resolve(true));
}

function getAllWithdrawals() {
  return new Promise(resolve => resolve(testData()));
}

function getTransactions(withrawalOrder) {
  return new Promise(resolve => resolve(testDataTransactions()));
}
function deleteTransaction(order) {
  return new Promise(resolve => resolve({}));
}
function deleteWithdrawal(order) {
  return new Promise(resolve => resolve());
}
function getBookingTransaction(transactionOrder) {
  return new Promise(resolve =>
    resolve({
      amount: "N2000",
      status: "TUTOR_HIRE",
      date: "2018-10-10 9:20:33",
      order: "AA101"
    })
  );
}
function makePayment(order) {
  return new Promise(resolve => resolve({}));
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
