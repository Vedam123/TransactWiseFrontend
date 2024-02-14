import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { Modal, Button } from "react-bootstrap";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};
const generateDistTranNumber = () => {
  const timestamp = new Date().getTime();
  const timestampSuffix = timestamp % 100000;
  const randomSuffix = Math.floor(Math.random() * 1000);
  const formattedRandomSuffix = String(randomSuffix).padStart(3, "0");
  const generateDistTranNum = `${timestampSuffix}${formattedRandomSuffix}`;

  return parseInt(generateDistTranNum);
};
const CreatePIDistributions = ({
  showDistModalWindow,
  headerId,
  currencyId,
  invoiceNumber,
  currencyCode,
  currencySymbol,
  tax_id,
  tax_code,
  tax_rate,
  invoice_total,
  onClose,
  onSuccess,
}) => {
  const [lines, setLines] = useState([
    {
      line_number: generateDistTranNumber(),
      account_id: "",
      debitamount: 0,
      creditamount: 0,
    },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [accounts, setAccounts] = useState([]);
  const displayCurrency = currencySymbol ? currencySymbol : currencyCode;

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchAccountsList = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_accounts`, {
          headers: generateHeaders(),
        });
        setAccounts(response.data.accounts_list);
        return response.data.accounts_list;
      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    };

    fetchAccountsList();
  }, [headerId]);

  const handleDebitAmountChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].debitamount = value;
    setLines(updatedLines);
  };

  const handleCreditAmountChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].creditamount = value;
    setLines(updatedLines);
  };

 
  const handleDistributionLines = async () => {
    try {
      // Check if all fields are populated
      const isAnyFieldEmpty = lines.some(line => !line.account_id || line.debitamount === "" || line.creditamount === "");
      if (isAnyFieldEmpty) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Check if sum of debit amounts is equal to sum of credit amounts
      const totalDebitAmount = lines.reduce((acc, line) => acc + parseFloat(line.debitamount), 0);
      const totalCreditAmount = lines.reduce((acc, line) => acc + parseFloat(line.creditamount), 0);
      if (totalDebitAmount !== totalCreditAmount) {
        alert('Total debit amount must be equal to total credit amount.');
        return;
      }
  
      // Check if sum of debit amounts is equal to invoice_total
      if (totalDebitAmount !== parseFloat(invoice_total)) {
        alert('Total debit amount must be equal to invoice total.');
        return;
      }
  
      const updatedLinesWithHeaderId = lines.map((line) => ({
        ...line,
        header_id: headerId,
      }));
  
      console.log("JSON request", updatedLinesWithHeaderId);
  
      const response = await axios.post(
        `${API_URL}/distribute_invoice_to_accounts`,
        updatedLinesWithHeaderId,
        { headers: generateHeaders() }
      );
  
      if (response.data.success) {
        onClose();
        onSuccess(response);
        setSuccessMessage("Distributions created successfully.");
        setLines([
          {
            line_number: generateDistTranNumber(),
            account_id: "",
            debitamount: 0,
            creditamount: 0,
          },
        ]);
      } else {
        console.error("Error creating invoice lines:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating invoice lines:", error);
    }
  };
  
  

  const handleClear = (index) => {
    if (lines.length === 1) {
      return;
    }

    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        line_number: generateDistTranNumber(),
        account_id: "",
        debitamount: 0,
        creditamount: 0,
      },
    ]);
  };

  return (
    <Modal
      show={showDistModalWindow}
      className="invoice-line-modal-content"
      size="xl"
      onHide={handleClose}
    >
      <Modal.Header closeButton className="invoice-line-modal-title-custom">
        <Modal.Title>Distributions of Accounts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <b>Invoice Number:</b> {invoiceNumber} <br></br>
          <b>Invoice Amount:</b> {invoice_total} {currencyCode} <br></br>
          <b>Tax Rate:</b> {tax_rate} % <br></br>
        </div>

        <div className="invoice-line-table-container">
          <table className="table table-striped">
            <thead className="invoice-line-table-header-custom">
              <tr>
                <th>Line No</th>
                <th>Account</th>
                <th>Debit {displayCurrency}</th>
                <th>Credit {displayCurrency}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index} className="table-row">
                  <td>{line.line_number}</td>
                  <td>
                    <select
                      value={line.account_id}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].account_id = e.target.value;
                        setLines(updatedLines);
                      }}
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => (
                        <option
                          key={account.account_id}
                          value={account.account_id}
                        >
                          {account.account_number} ({account.account_name})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.debitamount}
                      onChange={(e) =>
                        handleDebitAmountChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.creditamount}
                      onChange={(e) =>
                        handleCreditAmountChange(index, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => handleClear(index)}
                      disabled={lines.length === 1}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDistributionLines}>
          Distribute Accounts
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </Modal>
  );
};

export default CreatePIDistributions;
