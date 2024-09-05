/*export const AUTO_SALES_INVOICE_CONFIG = {
  //so_order_status_filter: ["APPROVED", "PARTPICKED", "PICKED"],
  so_order_status_filter: ["PICKED","PARTPICKED","APPROVED"],  
  so_new_status: "INVOICED",
  invoice_status: "DRAFT",
  account_types: {
      Debit: [
          {
              account_name: "Accounts Receivable",
              category: "Normal",
              distribution_percentage: 50
          },
          {
              account_name: "Retained Earnings",
              category: "Normal",
              distribution_percentage: 50
          }
      ],
      Credit: [
          {
              account_name: "Loans Payable",
              category: "Normal",
              distribution_percentage: 50
          },
          {
              account_name: "Rent Expense",
              category: "Normal",
              distribution_percentage: 50
          },
          {
              account_name: "Tax Payable",
              category: "Tax",
              tax_type: "Sales Tax",
              distribution_percentage: 50
          },
          {
              account_name: "Groceries Expense",
              category: "Tax",
              tax_type: "GST",
              distribution_percentage: 50                          
          }
      ]
  }
}; */

export const AUTO_SALES_INVOICE_CONFIG_3017 = {
  //so_order_status_filter: ["APPROVED", "PARTPICKED", "PICKED"],
  so_order_status_filter: ["PICKED","PARTPICKED","APPROVED"],  
  so_new_status: "INVOICED",
  invoice_status: "DRAFT",
  account_types: {
      Debit: [
          {
              account_type: "Accounts Receivable",
              category: "Normal",
              distribution_percentage: 100
          }
      ],
      Credit: [
          {
              account_type: "Cash",
              category: "Normal",
              distribution_percentage: 50
          },
          {
              account_type: "Sales",
              category: "Normal",
              distribution_percentage: 50
        },
          {
              account_type: "Tax Payable",
              category: "Tax",
              tax_type: "GST",
              distribution_percentage: 100,                         
          },
      ]
  }
};

export const AUTO_SALES_INVOICE_CONFIG_3007 = {
  //so_order_status_filter: ["APPROVED", "PARTPICKED", "PICKED"],
  so_order_status_filter: ["PICKED","PARTPICKED","APPROVED"],  
  so_new_status: "INVOICED",
  invoice_status: "DRAFT",
  account_types: {
      Debit: [
          {
              account_type: "Accounts Receivable",
              category: "Normal",
              distribution_percentage: 100
          }
      ],
      Credit: [
          {
              account_type: "Cash",
              category: "Normal",
              distribution_percentage: 50
          },
          {
              account_type: "Cost of Goods Sold",
              category: "Normal",
              distribution_percentage: 50
        },
          {
              account_type: "Tax Payable",
              category: "Tax",
              tax_type: "GST",
              distribution_percentage: 100,                         
          },
      ]
  }
};

// config.js
/*export const AUTO_PURCHASE_INVOICE_CONFIG = {
  invoice_status: "DRAFT",
  po_new_status: "INVOICED",
  po_order_status_filter: ["APPROVED","RECEIVED"],
  payment_terms: "NET 20",
  account_types: {
    Credit: [
      {
        account_name: "Accounts Payable",
        category: "Normal",
        distribution_percentage: 50,
      },
      {
        account_name: "Inventory",
        category: "Normal",
        distribution_percentage: 50,
      },
    ],
    Debit: [
      {
        account_name: "Utilities Expense",
        category: "Normal",
        distribution_percentage: 50,
      },
      {
        account_name: "Retained Earnings",
        category: "Normal",
        distribution_percentage: 50,
      },
      {
        account_name: "Tax Payable",
        category: "Tax",
        tax_type: "GST",
        distribution_percentage: 50                         
   
      },
      {
        account_name: "Loans Payable",
        category: "Tax",
        tax_type: "Sales Tax",
        distribution_percentage: 50                          
 
      },
    ],
  },
}; */

export const AUTO_PURCHASE_INVOICE_CONFIG_3017 = {
  invoice_status: "DRAFT",
  po_new_status: "INVOICED",
  po_order_status_filter: ["APPROVED","RECEIVED"],
  payment_terms: "NET 20",
  account_types: {
    Credit: [
      {
        account_type: "Purchase",
        category: "Normal",
        distribution_percentage: 100,
      },
    ],
    Debit: [
      {
        account_type: "Cash",
        category: "Normal",
        distribution_percentage: 100,
      },
      {
        account_type: "Tax Payable",
        category: "Tax",
        tax_type: "GST",
        distribution_percentage: 100,                         
      },
    ],
  },
}; 
