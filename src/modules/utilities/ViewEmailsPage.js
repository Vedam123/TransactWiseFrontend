import React, { useEffect, useState } from "react";
import { SMTP_URL } from "../admin/setups/ConstDecl";
import axios from "axios";
import "./css/appcss.css";

const ViewEmailsPage = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${SMTP_URL}/view_emails`);
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Emails</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th>Email ID</th>
            <th>Sender Email</th>
            <th>Recipient Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id} className="table-row">
              <td>{email.id}</td>
              <td>{email.sender_email}</td>
              <td>{email.recipient_email}</td>
              <td>{email.subject}</td>
              <td>{email.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmailsPage;
