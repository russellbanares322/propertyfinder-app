import React, { useState, useEffect } from "react";
import { ApartmentsData } from "../../ApartmentsDataFile/ApartmentsData";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";

function Apartments() {
  const [searchTerm, setSearchTerm] = useState("");

  const [apartments, setApartments] = useState(ApartmentsData.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const apartmentsPerPage = 5;
  const apartmentsVisited = pageNumber * apartmentsPerPage;

  const pageCount = Math.ceil(apartments.length / apartmentsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayApartments = apartments
    .slice(apartmentsVisited, apartmentsVisited + apartmentsPerPage)
    .filter((apartment) => {
      if (searchTerm === "") {
        return apartments;
      } else if (
        apartment.name.toLowerCase().includes(searchTerm) ||
        apartment.location.toLowerCase().includes(searchTerm) ||
        apartment.price.toLocaleString().includes(searchTerm)
      ) {
        return apartment;
      }
    })
    .map((apartment) => {
      return (
        <div
          className="col-11 col-md-6 col-lg-4 mx-0 mb-4 apartment_display"
          key={apartment.id}
        >
          <div className="card p-0 overflow-hidden h-100 shadow p-3 bg-light apartment_info">
            <h3 className="card-title text-center pt-3 l_text">
              {apartment.name}
            </h3>

            <img
              src={apartment.image}
              className="card-img-top apartment_img pt-2 img-fluid"
              alt="apartments"
            />

            <br />
            <div className="card-body">
              <h5 className="card-text l_text underline ">
                {apartment.location}
              </h5>
              <p className="card-text l_text">
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
    });

  return (
    <div className="container-fluid apartment_bg pb-5">
      <h1 className="text-center pt-5 l_title">Available Apartments</h1>
      <div className="col-sm-12 p-3 mb-5 mt-5 justify-content-center d-flex">
        <div className="row">
          <div className="col-sm-12 p-4 border shadow">
            <form className="d-flex">
              <input
                className="form-control me-2 shadow p-3"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                autoFocus
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                value={searchTerm}
              />
              <FaSearch
                size={25}
                style={{ marginTop: "9px", marginLeft: "5px" }}
                className="search_icon"
              />
            </form>
            <small className="justify-content-center d-flex pt-4">
              Search for price, location and apartment name.
            </small>
          </div>
        </div>
      </div>

      {/* Pagination */}

      <div className="container container_paginate">
        <div className="row justify-content-center">{displayApartments}</div>

        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"disabledBttn"}
          activeClassName={"activeBttn"}
        />
      </div>
    </div>
  );
}

export default Apartments;
