export function testData() {
  return [
    {
      amount: "N20,000",
      email: "james@example.com",
      date: "2018-10-12 14:10:33",
      order: "1002",
      account_no: "00032423222",
      bank: "GT Bank",
      account_name: "Shola Ameobi",
      phone_no: "07033233322",
      wallet_amount: "N0"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-11 12:30:33",
      order: "1003",
      account_no: "00032423222",
      bank: "GT Bank",
      account_name: "Shola Ameobi",
      phone_no: "07033233322",
      wallet_amount: "N0"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-12 9:20:33",
      order: "1001",
      account_no: "00032423222",
      bank: "GT Bank",
      account_name: "Shola Ameobi",
      phone_no: "07033233322",
      wallet_amount: "N0"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-10 9:20:33",
      order: "1004",
      account_no: "00032423222",
      bank: "GT Bank",
      account_name: "Shola Ameobi",
      phone_no: "07033233322",
      wallet_amount: "N0"
    },
    {
      amount: "N10,500",
      email: "shola@example.com",
      date: "2018-10-10 9:20:33",
      order: "1005",
      account_no: "00032423222",
      bank: "GT Bank",
      account_name: "Shola Ameobi",
      phone_no: "07033233322",
      wallet_amount: "N0"
    }
  ];
}
export function testDataTransactions() {
  return [
    {
      amount: "N2000",
      status: "EARNING",
      date: "2018-10-10 9:20:33",
      order: "AA101",
      client_email: "james@example.com",
      tutor_email: "Shola@example.com",
      booking: {
        order: "BookinOrder",
        status: "COMPLETED",
        start_time: "2018-10-10 9:20:33",
        end_time: "2018-11-10 9:20:33"
      },
      made_payment: true
    },
    {
      amount: "N2000",
      status: "WITHDRAWAL",
      date: "2018-10-10 9:20:33",
      order: "AA102",
      client_email: "james@example.com",
      tutor_email: "Shola@example.com",
      booking: {
        order: "BookinOrder",
        status: "COMPLETED",
        start_time: "2018-10-10 9:20:33",
        end_time: "2018-11-10 9:20:33"
      },
      made_payment: true
    },
    {
      amount: "N12,000",
      status: "EARNING",
      date: "2018-10-10 9:20:33",
      order: "AA103",
      client_email: "james@example.com",
      tutor_email: "Shola@example.com",
      booking: {
        order: "BookinOrder",
        status: "COMPLETED",
        start_time: "2018-10-10 9:20:33",
        end_time: "2018-11-10 9:20:33"
      },
      made_payment: true
    },
    {
      amount: "N2000",
      status: "WITHDRAWAL",
      date: "2018-10-10 9:20:33",
      order: "AA104"
    },
    {
      amount: "N2000",
      status: "BANK_CHARGE",
      date: "2018-10-10 9:20:33",
      order: "AA105"
    }
  ];
}

export const hiredData = [
  {
    order: 101,
    name: "Jamie Novak",
    email: "jamie@example.com",
    amount: "N20,000",
    date: "2018-10-12 14:10:33"
  },
  {
    order: 102,
    name: "Shola James",
    email: "shola@example.com",
    amount: "N30,000",
    date: "2018-9-12 14:10:33"
  },
  {
    order: 103,
    name: "Tope Oluwa",
    email: "tope@example.com",
    amount: "N40,000",
    date: "2018-10-12 14:10:33"
  },
  {
    order: 104,
    name: "Kenny Kalak",
    email: "kenny@example.com",
    amount: "N20,500",
    date: "2018-9-12 14:10:33"
  },
  {
    order: 105,
    name: "Biola Ojodu",
    email: "biola@example.com",
    amount: "N50,000",
    date: "2018-7-12 14:10:33"
  },
  {
    order: 106,
    name: "Godwin Alogi",
    email: "godwin@example.com",
    amount: "N22,000",
    date: "2018-10-12 14:10:33"
  }
];
