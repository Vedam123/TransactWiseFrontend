export const RECEIPT_TYPES = [
  { name: "Purchase Order Receipt", short: "PO" },
  { name: "Misllenious Receipt", short: "MR" },
  { name: "Goods Return Note (GRN)", short: "GRN" },
  { name: "Inventory Replanishment Receipts", short: "IRR" }
];


export const RECEIPT_STATUS = [
  { name: "New", short_name: "NEW", sequence: 10, toupdated: true },
  { name: "In Progress", short_name: "IP", sequence: 20, toupdated: true },
  { name: "Received", short_name: "REC", sequence: 30, toputaway: true },
  { name: "To Inspect", short_name: "TOI", sequence: 40, toinspect: true},
  { name: "Pending", short_name: "PEN", sequence: 50 , toputaway: true},
  { name: "Put Away", short_name: "PA", sequence: 60, putaway:true },
  { name: "Closed", short_name: "DN", sequence: 70 }
];

export const INSPECTION_STATUS = [
  { name: "New", short_name: "NEW", sequence: 10 ,toinspect: true},
  { name: "To Inspect", short_name: "TOI", sequence: 20, toinspect: true },
  { name: "In Progress", short_name: "IP", sequence: 30, toinspect: true },
  { name: "Inspected", short_name: "INS", sequence: 40,  toputaway: true},
  { name: "Put Away", short_name: "PA", sequence: 50, putaway:true},
  { name: "Pending", short_name: "PEN", sequence: 60,toputaway: true },
  { name: "Closed", short_name: "DN", sequence: 70  }
];

export const PUT_AWAY_TRANSACTIONS_TYPES = [
  { name: "Receipts", short_name: "REC", sequence: 10},
  { name: "Inspections", short_name: "INS", sequence: 20},
  { name: "Assembled", short_name: "ASM", sequence: 30},
  { name: "Manufactured", short_name: "MAN", sequence: 40}
];


export const SHIPMENT_STATUS = [
  { name: "New", short_name: "NEW", sequence: 10 },
  { name: "In Progress", short_name: "IP", sequence: 20 },
  { name: "Pending", short_name: "PEN", sequence: 30 },
  { name: "Shipped", short_name: "SHP", sequence: 40 }
];
