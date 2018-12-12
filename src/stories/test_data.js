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
