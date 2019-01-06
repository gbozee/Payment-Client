import LiveData from "./live"


function getAllWithdrawals() {
  return LiveData.getAllWithdrawals()
}

function getTransactions(withdrawOrder) {
  return LiveData.getTransactions(withdrawOrder)
}

function deleteTransaction(order) {
  return LiveData.deleteTransaction(order)
}

function deleteWithdrawal(order) {
  return LiveData.deleteWithdrawal(order)
}

function getBookingTransaction(transactionOrder) {
  return LiveData.getBookingTransaction(transactionOrder)
}

function makePayment(order) {
  return LiveData.makePayment(order)
}

function getHiredTransactions(props, filterFunc) {
  return LiveData.getHiredTransactions(props,filterFunc)
}

function getTransactionDetail(props) {
  return LiveData.getTransactionDetail(props)
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
};
