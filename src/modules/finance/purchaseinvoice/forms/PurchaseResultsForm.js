import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap"; // Import the Modal and Button components

export default function PurchaseResultsForm() {
  const { PurchaseParameters } = useParams();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [PurchaseLines, setPurchaseLines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

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
        let apiUrl = `${API_URL}/get_Purchase_headers`;

        if (PurchaseParameters) {
          const queryParams = new URLSearchParams(PurchaseParameters);
          apiUrl += `?${queryParams.toString()}`;
        }
        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        setResultData(response.data.Purchase_headers_list);
        setError(null);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched Purchase data successfully`);
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching Purchase data`, error);
      }
    };

    fetchData();
  }, [PurchaseParameters, hasRequiredAccess]);

  const fetchPurchaseLines = async (headerId) => {
    try {
      const response = await axios.get(`${API_URL}/get_Purchase_lines?header_id=${headerId}`, {
        headers: generateHeaders(),
      });

      setPurchaseLines(response.data.Purchase_lines_list);
      setShowModal(true);
    } catch (error) {
      setError("An error occurred while fetching Purchase lines.");
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching Purchase lines`, error);
    }
  };

  return (
    <div>
      <h1>Purchase Data</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead className="jo-line-table-header-custom">
            <tr>
              <th>Type</th>
              <th>Number</th>
              <th>Source</th>
              <th>Status</th>
              <th>Company</th>
              <th>Department</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Lines</th>              
            </tr>
          </thead>
          <tbody>
            {resultData.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.Purchase_type}</td>
                <td>{item.Purchase_number}</td>
                <td>{item.source_number}</td>
                <td>{item.status}</td>
                <td>{item.company_name}</td>
                <td>{item.department_name}</td>
                <td>{item.currencycode}</td>
                <td>
                  {new Date(item.Purchase_date).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <button onClick={() => fetchPurchaseLines(item.header_id)}>
                    Fetch Lines
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Purchase Lines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                 <th>Line</th>
                <th>Account Name</th>
                <th>Account No</th>
                <th>Debit</th>
                <th>Credit</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {PurchaseLines.map((line, index) => (
                <tr key={index}>
               <td>{line.line_number}</td>
                  <td>{line.account_name}</td>
                  <td>{line.account_number}</td>
                  <td>{line.debit}</td>
                  <td>{line.credit}</td>
                  {/* Add more row data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
