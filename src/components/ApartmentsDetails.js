import React from "react";
import { Route, useParams } from "react-router-dom";
import { ApartmentsData } from "../ApartmentsData";

function ApartmentsDetails() {
  const { id } = useParams();
  const apartment = ApartmentsData.find(
    (apartment) => apartment.id.toString() === id
  );

  return (
    <div className="container">
      <div className="col-sm-12">
        {apartment && (
          <>
            <h2 className="card-title">Apartment #{apartment.id}</h2>
            <h1 className="card-text">{apartment.name}</h1>
            <img src={apartment.image} class="card-img-top img-fluid" />
            <h1>Description: {apartment.description}</h1>
            <h5>
              Amneties:
              {apartment.amnety1}
              {apartment.amnety2}
              {apartment.amnety3}
            </h5>
          </>
        )}
      </div>
    </div>
  );
}

export default ApartmentsDetails;
