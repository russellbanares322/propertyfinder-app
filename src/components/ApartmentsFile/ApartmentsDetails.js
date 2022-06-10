import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApartmentsData } from "../../ApartmentsDataFile/ApartmentsData";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function ApartmentsDetails() {
  const { id } = useParams();
  const apartment = ApartmentsData.find(
    (apartment) => apartment.id.toString() === id
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          <div className="container">
            <div className="text-right">
              <button
                className="btn btn-info"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Appoint Now
              </button>
            </div>
            <div
              className="modal fade mt-5"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Fill Important Details
                    </h5>
                    <IoClose
                      size={30}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-sm-4">
                            <form>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  onSubmit={handleSubmit}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                />
                              </div>
                            </form>
                          </div>
                          <div className="col-sm-4">
                            <form>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  className="form-label"
                                >
                                  Phone
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  required
                                />
                              </div>
                            </form>
                          </div>
                          <div className="col-sm-4">
                            <form>
                              <div className="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  className="form-label"
                                >
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  required
                                />
                              </div>
                            </form>
                          </div>
                          <div className="col-sm-12">
                            <label
                              for="exampleFormControlTextarea1"
                              class="form-label"
                            >
                              Message to Seller
                            </label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" className="btn btn-info">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="card-title text-center pt-5 l_title">
            {apartment.name}
          </h1>
          <div className="container">
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
          <div className="col-sm-6 pb-3">
            <h2 className="mt-5 mb-3 l_title">Contact</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default ApartmentsDetails;
