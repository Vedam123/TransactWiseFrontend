export const ACCOUNT_TYPES = [
    "Cash",
    "Accounts Receivable",
    "Inventory",
    "Property, Plant, and Equipment (PP&E)",
    "Accounts Payable",
    "Loans Payable",
    "Accrued Liabilities",
    "Owner's Equity",
    "Retained Earnings",
    "Sales",
    "Interest Income",
    "Cost of Goods Sold (COGS)",
    "Rent Expense",
    "Utilities Expense",
    "Salary/Wages Income",
    "Rent/Mortgage Expense",
    "Groceries Expense",
    "Purchase"
  ];

  export const JOURNAL_TYPES = [
    { name: "General Journal", code: "GEN", description: "Various transactions", sequence: 10 },
    { name: "Sales Journal", code: "SAL", description: "Sales transactions", sequence: 20 },
    { name: "Purchase Journal", code: "PUR", description: "Purchases of inventory or supplies", sequence: 30 },
    { name: "Cash Receipts Journal", code: "CASH-R", description: "Cash received", sequence: 40 },
    { name: "Cash Disbursements Journal", code: "CASH-D", description: "Cash payments", sequence: 50 },
    { name: "Payroll Journal", code: "PAY", description: "Payroll transactions", sequence: 60 },
    { name: "Adjusting Journal", code: "ADJ", description: "Adjusting entries", sequence: 70 },
    { name: "Closing Journal", code: "CLOS", description: "Closing entries", sequence: 80 }
  ];


  export const JOURNAL_STATUS = [
    { name: "New", code: "NEW", description: "Created but not processed.", sequence: 10, display:true},
    { name: "In Progress", code: "IP", description: "Under review/edit.", sequence: 20, display:false},
    { name: "Approved", code: "APPROVED", description: "Reviewed and approved.", sequence: 30, display:true },
    { name: "Posted", code: "POSTED", description: "Posted to ledger.", sequence: 40, display:false },
    { name: "Rejected", code: "REJECTED", description: "Rejected and not posted.", sequence: 50 , display:true},
    { name: "Pending", code: "PENDING", description: "Awaiting action/approval.", sequence: 60 , display:false},
    { name: "Completed", code: "COMPLETED", description: "Processing complete.", sequence: 70, display:false },
    { name: "Cancelled", code: "CANCELLED", description: "Cancelled and not processed.", sequence: 80 , display:true},
    { name: "Error", code: "ERROR", description: "Processing error.", sequence: 90 , display:false}
];

export const JO_SEQUENCE_PREFIX = 200

  
