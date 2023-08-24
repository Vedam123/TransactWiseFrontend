import React from "react";

function DisplayCard({ title, color, children }) {
  const cardStyle = {
    backgroundColor: color || "#ffffff", // Default to white if color is not provided
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  );
}

export default DisplayCard;
