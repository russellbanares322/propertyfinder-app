import React from "react";
import { Route, useParams } from "react-router-dom";
import { ApartmentsData } from "../ApartmentsData";

function ApartmentsDetails() {
  const { id } = useParams();
  const apartment = ApartmentsData.find(
    (apartment) => apartment.id.toString() === id
  );

  return (
    <div className="container-fluid apartment_bg">
      {apartment && (
        <>
          <div className="container">
            <h1 className="card-title text-center pt-5 l_title">
              {apartment.name}
            </h1>
            <div className="col-sm-12 mt-5">
              <div className="row">
                <div className="col-sm-5">
                  <h5>{apartment.description}</h5>
                </div>
                <div className="col-sm-7">
                  <img
                    src={apartment.image}
                    className="card-img-top img-fluid border shadow p-3"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 pb-2">
              <h2>Amenities:</h2>
              <div
                className="card border-dark text-dark mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-body">
                  <p className="card-text">{apartment.amenity1}</p>
                  <p className="card-text">{apartment.amenity2}</p>
                  <p className="card-text">{apartment.amenity3}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ApartmentsDetails;
