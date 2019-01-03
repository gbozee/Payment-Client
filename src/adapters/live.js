import axios from 'axios';

let baseUrl = process.env.REACT_APP_ENDPOINT_URL;
const config = {
  headers: { 'Content-Type': 'application/json' },
};
let fields = `user {
        email
        first_name
        last_name
        primary_phone_no{
          number
        }
        wallet{
          amount_available
        }
      }
      amount
      order
      created
      payout {
        account_id
        account_name
        bank
      }`;
let transactionFields = `
pk
          status
          created
          modified
          amount
          transaction_type
          credit
          amount_paid
          total
`;

const queries = {
  hired_transactions_query: `
    query hiredTransactionsQuery($status: String!, $_from: String!, $to: String!) {
      accountant_endpoint {
        all_transactions(status: $status, _from: $_from, to: $to) {
          pk
          status
          booking{
            user{
              first_name
              last_name
              email
            }
          
          }
          created
          modified
          amount
          transaction_type
          credit
          amount_paid
          total
        }
      }
    }
  `,
};

const makeApiCall = (query, variables) => {
  return axios.post(
    baseUrl,
    {
      query,
      variables,
    },
    config
  );
};

const hired_transactions_query = ({ from, to }) => {
  let date = { from, to };
  if (!Boolean(from) || !Boolean(to)) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (today.getMonth() === 0) {
      year -= 1;
      month = 12;
    }
    date.to = `${today.getFullYear()}-${today.getMonth() + 1}-${30}`;
    date.from = `${year}-${month}-${1}`;
  }
  return `
{
accountant_endpoint{
  all_transactions(status:"TUTOR_HIRE",_from:${JSON.stringify(
    date.from
  )},to:${JSON.stringify(date.to)}) {
    pk
    status
    booking{
      user{
        first_name
        last_name
        email
      }
     
    }
    created
    modified
    amount
    transaction_type
    credit
    amount_paid
    total
  }
}}
  `;
};
const query = (kind = 'list', param) => {
  let options = {
    list: () => `all_withdrawals{${fields}}`,
    detail: order => `withdrawal_detail(order:${JSON.stringify(order)}){
      user{
        email
      }
      transactions{
      pk
        status
        created
        modified
        amount
        booking{
          order
          status_display
          first_session
          last_session
          made_payment
          user{
            email
          }
          ts{
            tutor{
              email
            }
          }
        }
        transaction_type
        credit
        amount_paid
        total
    }}`,
    transaction_detail: order => `transaction_detail(order:${JSON.stringify(
      order
    )}){
      created
      modified
      total
      pk
      booking{
        user{
          first_name
          last_name
          email
        }
        transactions{
          ${transactionFields}
        }
      }
    }`,
    booking_transactions: order => `booking_transactions(order:${JSON.stringify(
      order
    )}){
           ${transactionFields}
    }`,
  };
  return `
    {
  accountant_endpoint {
    ${options[kind](param)}
      
    
  }
}

  `;
};
function responseCallback(key) {
  return response => response.data.data.accountant_endpoint[key];
}
function getAllWithdrawals() {
  return axios
    .post(baseUrl, { query: query() })
    .then(responseCallback('all_withdrawals'))
    .then(withdrawals => {
      return withdrawals.map(withdrawal => ({
        ...withdrawal,
        email: withdrawal.user.email,
        date: withdrawal.created,
        account_no: withdrawal.payout.account_id,
        bank: withdrawal.payout.bank,
        account_name: withdrawal.payout.account_name,
        wallet_amount: withdrawal.user.wallet.amount_available,
        phone_no:
          withdrawal.user.primary_phone_no &&
          withdrawal.user.primary_phone_no.number,
      }));
    });
}

function getTransactions(withrawalOrder) {
  return axios
    .post(baseUrl, { query: query('detail', withrawalOrder) })
    .then(responseCallback('withdrawal_detail'))
    .then(withdrawal =>
      withdrawal.transactions.map(transaction => ({
        amount: `N${transaction.total}`,
        status: transaction.status,
        date: transaction.created,
        order: transaction.pk,
        client_email: transaction.booking && transaction.booking.user.email,
        tutor_email: withdrawal.user.email,
        booking: transaction.booking && {
          order: transaction.booking.order,
          status: transaction.booking.status_display,
          start_time: transaction.booking.first_session,
          end_time: transaction.booking.last_session,
          made_payment: transaction.booking.made_payment,
        },
      }))
    );
}

function deleteTransaction(order) {
  return new Promise(resolve => resolve({}));
}

function deleteWithdrawal(order) {
  return new Promise(resolve => resolve());
}
function getBookingTransaction({ order, kind }) {
  console.log({ kind });
  let q =
    kind === 'transaction' ? 'transaction_detail' : 'booking_transactions';
  let transform = data =>
    kind === 'transaction' ? data.booking.transactions : data;
  return axios
    .post(baseUrl, { query: query(q, order) })
    .then(responseCallback(q))
    .then(transactions => {
      return transform(transactions).map(transactionDetail => ({
        amount: transactionDetail.total,
        status: transactionDetail.status,
        date: transactionDetail.created,
        order: transactionDetail.pk,
      }));
    });
}

function makePayment(order) {
  return new Promise(resolve => resolve({}));
}

function getHiredTransactions(props, filterFunc) {
  //props could be dateFilter, searchParam
  const { from, to } = props.dateFilter;
  let date = { from, to };
  if (!Boolean(from) || !Boolean(to)) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (today.getMonth() === 0) {
      year -= 1;
      month = 12;
    }
    date.to = `${today.getFullYear()}-${today.getMonth() + 1}-${30}`;
    date.from = `${year}-${month}-${1}`;
  }
  makeApiCall(queries['hired_transactions_query'], {status: "TUTOR_HIRE", ...date})
    .then(responseCallback('all_transactions'))
    .then(transactions =>
      transactions.map(transaction => {
        return {
          order: transaction.pk,
          name:
            transaction.booking &&
            `${transaction.booking.user.first_name} ${
              transaction.booking.user.last_name
            }`,
          email: transaction.booking && transaction.booking.user.email,
          amount: transaction.total,
          date: transaction.created,
          modified: transaction.modified,
        };
      })
    );
  // return axios
  //   .post(baseUrl, { query: hired_transactions_query(props.dateFilter || {}) })
  //   .then(responseCallback("all_transactions"))
  //   .then(transactions =>
  //     transactions.map(transaction => {
  //       return {
  //         order: transaction.pk,
  //         name:
  //           transaction.booking &&
  //           `${transaction.booking.user.first_name} ${
  //             transaction.booking.user.last_name
  //           }`,
  //         email: transaction.booking && transaction.booking.user.email,
  //         amount: transaction.total,
  //         date: transaction.created,
  //         modified: transaction.modified
  //       };
  //     })
  //   );
}

function getTransactionDetail(props) {
  return axios
    .post(baseUrl, { query: query('transaction_detail', props) })
    .then(responseCallback('transaction_detail'))
    .then(transaction => ({
      order: transaction.pk,
      name:
        transaction.booking &&
        `${transaction.booking.user.first_name} ${
          transaction.booking.user.last_name
        }`,
      email: transaction.booking && transaction.booking.user.email,
      amount: transaction.total,
      date: transaction.created,
      modified: transaction.modified,
    }));
  // return new Promise(resolve =>
  // resolve(hiredData.find(x => x.order.toLowerCase() === props.toLowerCase()))
  // );
}

function saveVerifications(verifications) {
  // saveFragment({
  //   VERIFICATIONS: verifications
  // });
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
