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

const UpdateDistributionsModalForm = ({
  showDistModalWindow,
  headerId,
  companyId,
  departmentId,
  currencyId,
  invoiceNumber,
  currencyCode,
  currencySymbol,
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
  const [debitCreditEqual, setDebitCreditEqual] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const displayCurrency = currencySymbol ? currencySymbol : currencyCode;


  

  useEffect(() => {
    const totalDebitAmount = lines.reduce((acc, line) => acc + parseFloat(line.debitamount || 0), 0);
    const totalCreditAmount = lines.reduce((acc, line) => acc + parseFloat(line.creditamount || 0), 0);
    setDebitCreditEqual(totalDebitAmount === totalCreditAmount);
  }, [lines]);

  const fetchDistributions = async () => {
    try {
      const distributionsResponse = await axios.get(`${API_URL}/get_po_invoice_distributions?header_id=${headerId}`, {
        headers: generateHeaders(),
      });
      const distributions = distributionsResponse.data.purchase_invoice_accounts;
      const defaultLines = distributions.map(distribution => ({
        line_id: distribution.line_id,
        header_id: distribution.header_id,
        line_number: distribution.line_number,
        account_id: distribution.account_id,
        debitamount: parseFloat(distribution.debitamount),
        creditamount: parseFloat(distribution.creditamount),
        dirty: false,
      }));
      setLines(defaultLines);
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  };

  const handleAccountChange = (index, accountId) => {
    const updatedLines = [...lines];
    updatedLines[index].account_id = accountId;
    updatedLines[index].dirty = true;
    setLines(updatedLines);
  };

  const fetchAccountsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_accounts`, {
        headers: generateHeaders(),
        params: {
          company_id: companyId,
          department_id: departmentId,
          currency_id: currencyId
        }
      });
      setAccounts(response.data.accounts_list);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    fetchAccountsList(); // Fetch accounts list when component mounts
    fetchDistributions();
      // eslint-disable-next-line
  }, [headerId,companyId,departmentId]);

  const handleDebitAmountChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].debitamount = value;
    updatedLines[index].dirty = true;
    setLines(updatedLines);
  };

  const handleCreditAmountChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].creditamount = value;
    updatedLines[index].dirty = true;
    setLines(updatedLines);
  };

  const handleSubmit = async () => {
    try {
      const hasUpdates = lines.some(line => line.dirty);

      const totalDebitAmount = lines.reduce((acc, line) => acc + parseFloat(line.debitamount), 0);
      const totalCreditAmount = lines.reduce((acc, line) => acc + parseFloat(line.creditamount), 0);

      if (!hasUpdates) {
        if (totalDebitAmount !== totalCreditAmount) {
          const confirmation = window.confirm('Debit and credit amounts are not equal. Are you sure you want to close?');
          if (confirmation) {
            onClose();
          }
          return;
        }
      }

      const isAnyFieldEmpty = lines.some(line => !line.account_id || line.debitamount === "" || line.creditamount === "");
      if (isAnyFieldEmpty) {
        alert('Please fill in all fields.');
        return;
      }



      if (totalDebitAmount !== totalCreditAmount) {
        const confirmation = window.confirm('Debit and credit amounts are not equal. Are you sure you want to close?');
        if (confirmation) {
          onClose();
        }
        return;
      }

      if (totalDebitAmount !== parseFloat(invoice_total)) {
        const confirmation = window.confirm('Total debit amount must be equal to invoice total. Are you sure you want to close?');
        if (confirmation) {
          onClose();
        }
        return;
      }

     
      const updatedLines = lines.filter(line => line.line_id);
      const newLines = lines.filter(line => !line.line_id);

      if (newLines.length > 0) {
        const createResponse = await axios.post(
          `${API_URL}/distribute_invoice_to_accounts`,
          newLines.map(line => ({
            ...line,
            header_id: headerId,
          })),
          { headers: generateHeaders() }
        );

        if (createResponse.data.success) {
          console.log("New distribution lines created:", createResponse.data);
        } else {
          console.error("Error creating new distribution lines:", createResponse.data.message);
        }
      }

      if (updatedLines.length > 0) {
        const updateResponse = await axios.put(
          `${API_URL}/update_invoice_accounts`,
          {
            header_id: headerId,
            lines: updatedLines,
          },
          { headers: generateHeaders() }
        );

        if (updateResponse.data.success) {
          console.log("Distribution lines updated:", updateResponse.data);
        } else {
          console.error("Error updating distribution lines:", updateResponse.data.message);
        }
      }

      onSuccess("Successfully updated");
      onClose();
    } catch (error) {
      console.error("Error handling distribution lines:", error);
    }
  };

  const handleClear = async (index) => {
    if (lines.length === 1) {
      return;
    }

    const lineToDelete = lines[index];

    if (lineToDelete.line_id) {
      const confirmation = window.confirm(
        "Are you sure you want to delete this line from Database?"
      );
      if (!confirmation) {
        return;
      }
      try {
        const response = await axios.delete(
          `${API_URL}/delete_purchase_invoice_account`,
          {
            headers: generateHeaders(),
            data: {
              header_id: lineToDelete.header_id,
              line_id: lineToDelete.line_id,
            },
          }
        );

        if (response.data && response.data.message !== null) {
          const updatedLines = lines.filter((line, i) => i !== index);
          setLines(updatedLines);
        } else {
          console.error("Error deleting invoice line:", response.data);
        }
      } catch (error) {
        console.error("Error deleting invoice line:", error);
      }
    } else {
      const updatedLines = [...lines];
      updatedLines.splice(index, 1);
      setLines(updatedLines);
    }
  };

  const handleAddNew = () => {
    const newLine = {
      line_number: generateDistTranNumber(),
      account_id: "",
      debitamount: 0,
      creditamount: 0,
      dirty: true,
    };
    setLines([...lines, newLine]);
  };

  const handleClose = () => {
    // Check if sum of debit amounts is equal to sum of credit amounts
    const totalDebitAmount = lines.reduce((acc, line) => acc + parseFloat(line.debitamount), 0);
    const totalCreditAmount = lines.reduce((acc, line) => acc + parseFloat(line.creditamount), 0);
    
    if (totalDebitAmount !== totalCreditAmount) {
      const confirmation = window.confirm('Debit and credit amounts are not equal. Are you sure you want to close?');
      if (confirmation) {
        onClose();
      }
      return;
    }
  
    // Check if sum of debit amounts is equal to invoice_total
    if (totalDebitAmount !== parseFloat(invoice_total)) {
      const confirmation = window.confirm('Total debit amount must be equal to invoice total. Are you sure you want to close?');
      if (confirmation) {
        onClose();
      }
      return;
    }

      const confirmation = window.confirm("Are you sure you want to close?");
      
      if (confirmation) {
        onClose();
      }
      return;
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
          <b>
            Invoice Amount:{" "}
            <span style={{ fontWeight: debitCreditEqual ? "bold" : "normal", color: debitCreditEqual ? "green" : "red" }}>
              {invoice_total} {currencyCode}
            </span>{" "}
            <br />
          </b>
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
                      onChange={(e) => handleAccountChange(index, e.target.value)}
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
                      onChange={(e) => handleDebitAmountChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.creditamount}
                      onChange={(e) => handleCreditAmountChange(index, e.target.value)}
                    />
                  </td>

                  <td>
                    <button onClick={() => handleClear(index)} disabled={lines.length === 1}>
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
        <Button variant="secondary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDistributionsModalForm;
