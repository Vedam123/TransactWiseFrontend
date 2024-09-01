import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap";

export default function SearchDefaultAccountsResultsForm() {
  const { Parameters } = useParams();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [accountsData, setAccountsData] = useState([]);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const hasRequiredAccess = CheckModuleAccess("FINANCE", "VIEW");

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        let apiUrl = `${API_URL}/get_default_account_headers`;

        if (Parameters) {
          const queryParams = new URLSearchParams(Parameters);
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        setResultData(response.data.default_account_headers);
        setError(null);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched Sales data successfully`, response.data.default_account_headers);
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching Sales data`, error);
      }
    };

    fetchData();
  }, [Parameters, hasRequiredAccess]);

  const fetchAccountsData = async (headerId, currencycode, invoice_number) => {

    try {
      const response = await axios.get(`${API_URL}/get_default_accounts?header_id=${headerId}`, {
        headers: generateHeaders(),
      });

      setAccountsData(response.data.default_accounts_list);
      setCurrencyCode(currencycode);
      setInvoiceNumber(invoice_number);
      setShowAccountsModal(true);
    } catch (error) {
      setError("An error occurred while fetching accounts data.");
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching accounts data`, error);
    }
  };

  return (
    <div>
      <h1>Default Journal Headers</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead className="jo-line-table-header-custom">
            <tr>
              <th>Header ID</th>
              <th>Header Name</th>
              <th>Created At</th>
              <th>Accounts</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((header, index) => (
              <tr key={index} className="table-row">
                <td>{header.header_id}</td>
                <td>{header.header_name}</td>
                <td>{header.created_at}</td>
                <td>
                  <button
                    onClick={() => fetchAccountsData(header.header_id, header.currencycode, header.header_name)}
                  >
                    Accounts
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        show={showAccountsModal}
        onHide={() => setShowAccountsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Accounts for {invoiceNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Invoice Number:</b> {invoiceNumber} <br />
            <b>Currency:</b> {currencyCode} <br />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accountsData.map((account, index) => (
                <tr key={index}>
                  <td>{account.account_id}</td>
                  <td>{account.account_name}</td>
                  <td>{account.account_number}</td>
                  <td>{account.account_type}</td>
                  <td>{account.current_balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAccountsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
