import React from "react";
import { Route, useParams } from "react-router-dom";

function ApartmentsDetails() {
  const { id, name } = useParams();

  return (
    <div className="container-fluid">
      <h2>Apartment #{id}</h2>
      <h1>{name}</h1>
    </div>
  );
}

export default ApartmentsDetails;
