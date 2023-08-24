import React from "react";

export default function ResultsContainer({ explodedBOM }) {
  return (
    <div className="results-container">
      <div className="model-item-quantity">
        <p><span className="model-item-label">Model Item:</span> <span className="model-item-value">{explodedBOM[0]?.ModelItemCode}</span></p>
        <p><span className="quantity-label">Quantity:</span> <span className="quantity-value">{explodedBOM[0]?.RequiredModelQty}</span></p>
      </div>
      
      <table className="table table-striped table-bordered center-aligned-table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Component Item</th>
            <th>BOM Quantity</th>
            <th>Req Quantity</th>
            <th>UOM</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {explodedBOM.map((item, index) => (
            <tr key={index} className="table-row">
              <td>{item.ComponentLevelInBOM}</td>
              <td>{item.ComponentItemCode}</td>
              <td>{parseInt(item.ComponetDefaultQty)}</td>
              <td>{item.ComponentRequiredQty}</td>
              <td>{item.ComponentUOMName}</td>
              {/* Render more table row data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
