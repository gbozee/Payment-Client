import { saveFragment } from "tuteria-shared/lib/shared/localStorage";
import LiveData from "./live"


function getAllWithdrawals() {
  return LiveData.getAllWithdrawals()
}

function getTransactions(withdrawOrder) {
  return LiveData.getTransactions(withdrawOrder)
}

function deleteTransaction(order) {
  return new Promise(resolve => resolve({}));
}

function deleteWithdrawal(order) {
  return new Promise(resolve => resolve());
}

function getBookingTransaction(transactionOrder) {
  return LiveData.getBookingTransaction(transactionOrder)
}

function makePayment(order) {
  return new Promise(resolve => resolve({}));
}

function getHiredTransactions(props, filterFunc) {
  return LiveData.getHiredTransactions(props,filterFunc)
}

function getTransactionDetail(props) {
  return LiveData.getTransactionDetail(props)
}


function saveVerifications(verifications) {
  saveFragment({
    VERIFICATIONS: verifications
  });
}


export default {
  //payment data
  getAllWithdrawals,
  getTransactions,
  getBookingTransaction,
  deleteTransaction,
  deleteWithdrawal,
  makePayment,
  getHiredTransactions,
  getTransactionDetail,
  saveVerifications,
};
