import React, { useState } from "react";
import { ApartmentsData } from "../ApartmentsData";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Apartments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const apartmentSearch = ApartmentsData.filter((apartment) => {
    return Object.keys(apartment).some((key) =>
      apartment[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  return (
    <div className="container-fluid apartment_bg">
      <h1 className="text-center pt-5 l_title">Available Apartments</h1>
      <div className="col-sm-12 border shadow p-3 mb-5 mt-5">
        <div className="row">
          <div className="col-sm-4 pt-1">
            <small>Sort by place</small>
            <div class="dropdown mb-3">
              <button
                class="btn btn-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Location
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    Cupang
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Alabang
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Muntinlupa
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 pt-1">
            <small>Sort by price</small>
            <div class="dropdown mb-3">
              <button
                class="btn btn-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    ₱1,500 - ₱2,500
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    ₱3,000 - ₱4,500
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    ₱5,000 - ₱6,000
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4 pt-3">
            <form class="d-flex">
              <input
                class="form-control me-2 shadow p-3"
                type="search"
                placeholder="Manual Search"
                aria-label="Search"
                onChange={handleChange.bind(this)}
                value={searchTerm}
              />
              <FaSearch
                size={25}
                style={{ marginTop: "7px", marginLeft: "5px" }}
                className="search_icon"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {apartmentSearch.map((apartment) => {
            return (
              <div
                className="col-11 col-md-6 col-lg-4 mx-0 mb-4 apartment_display"
                key={apartment.id}
              >
                <div className="card p-0 overflow-hidden h-100 shadow p-3 bg-light apartment_info">
                  <h3 className="card-title text-center pt-3">
                    {apartment.name}
                  </h3>

                  <img
                    src={apartment.image}
                    className="card-img-top apartment_img pt-2 img-fluid"
                    alt="apartments"
                  />

                  <br />
                  <div className="card-body">
                    <h5 className="card-text">{apartment.location}</h5>
                    <p className="card-text">
                      ₱{apartment.price.toLocaleString()}
                    </p>
                    <Link to={`/apartments/${apartment.id}`}>
                      <button className="btn btn-primary mt-3 mb-3">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Apartments;
