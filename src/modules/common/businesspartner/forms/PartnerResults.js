import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl"; // Adjust path to your API_URL

function PartnerResults() {
  const { searchType, searchInput } = useParams();
  const [partnerData, setPartnerData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_partner_data`;

        if (searchInput) {
          const queryParams = new URLSearchParams();
          queryParams.append(searchType, searchInput);
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await axios.get(apiUrl);
        setPartnerData(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching partner data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [searchType, searchInput]);

  return (
    <div>
      <h2>Partner Search Results</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Partner ID</th>
              <th>Partner Name</th>
              <th>Partnertype</th>
              <th>Status</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Currency Code</th>
              <th>Registration Number</th>
              <th>Tax ID</th>

              <th>Additional Info</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {partnerData.map((partner) => (
              <tr key={partner.partnerid}>
                <td>{partner.partnerid}</td>
                <td>{partner.partnername}</td>
                <td>{partner.partnertype}</td>
                <td>{partner.status}</td>
                <td>{partner.address}</td>
                <td>{partner.city}</td>
                <td>{partner.state}</td>
                <td>{partner.country}</td>
                <td>{partner.postalcode}</td>
                <td>{partner.contactperson}</td>
                <td>{partner.email}</td>
                <td>{partner.phone}</td>
                <td>{partner.currencycode}</td>
                <td>{partner.registrationnumber}</td>
                <td>{partner.taxid}</td>

                <td>{partner.additionalinfo}</td>
                <td>
                  {}
                  {partner.customerimage && (
                    <img
                      src={`data:image/png;base64,${partner.customerimage}`}
                      alt="Partner logo"
                      className="employee-pic"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PartnerResults;
