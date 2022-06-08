import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApartmentsData } from "../ApartmentsData";
import { IoReturnDownBackOutline } from "react-icons/io5";

function ApartmentsDetails() {
  const { id } = useParams();
  const apartment = ApartmentsData.find(
    (apartment) => apartment.id.toString() === id
  );

  const navigate = useNavigate();

  return (
    <div className="container-fluid apartment_bg">
      <div className="col-sm-12 pt-4 return_bttn">
        <IoReturnDownBackOutline
          size={30}
          onClick={() => navigate("/apartments")}
        />
      </div>

      {apartment && (
        <>
          <div className="container ">
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
                    className="card-img-top img-fluid img_border"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 pb-2">
              <h2 className="mt-5 mb-3 l_title">Amenities</h2>
              <ul className="list-group">
                <li className="list-group-item list-group-item-secondary list_border">
                  {apartment.amenity1}
                </li>
                <li className="list-group-item list-group-item-secondary mt-2 list_border">
                  {apartment.amenity2}
                </li>
                <li className="list-group-item list-group-item-secondary mt-2 list_border">
                  {apartment.amenity3}
                </li>
                <li className="list-group-item list-group-item-secondary mt-2 list_border">
                  {apartment.amenity4}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ApartmentsDetails;
