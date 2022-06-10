import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import sampleimg from "../pictures/sample3.jpg";

function Home() {
  const [modal, setModal] = useState(false);

  const handleModalClick = () => {
    setModal(!modal);
  };
  return (
    <div classNameName="container-fluid">
      <div className="jumbotron vh-100">
        <img src="" />
        <h1 className="display-4 text-left font-weight-bold text-center mt-5 l_title">
          Property Finds
        </h1>
        <p className="lead text-left text-sm text-center text-dark mt-3 l_text">
          Affordable and neat property for you.
        </p>
        <p className="lead text-left text-center">
          <Link
            to="/apartments"
            className="btn btn-info btn-lg mt-4"
            role="button"
          >
            Find Now
          </Link>
        </p>
      </div>
      <div className="container-fluid ">
        <h1 className="text-center mb-5 mt-5 l_title">Featured Property</h1>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-4">
              <div className="card card_info">
                <h5 className="card-header">Purok 1</h5>
                <div className="card-body figure">
                  <img
                    className="card-img-top card_img"
                    src={sampleimg}
                    alt="Card image cap"
                  />
                  <h5 className="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-outline-info">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card_info">
                <h5 className="card-header">Purok 2</h5>
                <div className="card-body figure">
                  <img
                    className="card-img-top card_img"
                    src={sampleimg}
                    alt="Card image cap"
                  />
                  <h5 className="card-title">Special title treatment</h5>
                  <p clasNames="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-outline-info">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card_info">
                <h5 className="card-header">Purok 3</h5>
                <div className="card-body figure">
                  <img
                    className="card-img-top card_img"
                    src={sampleimg}
                    alt="Card image cap"
                  />
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-outline-info">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card_info">
                <h5 className="card-header">Purok 3</h5>
                <div className="card-body">
                  <img
                    className="card-img-top spml"
                    src={sampleimg}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={handleModalClick}
                    alt="Card image cap"
                  />
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-outline-info">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            {modal && (
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <AiOutlineClose
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></AiOutlineClose>
                    </div>
                    <div className="modal-body">
                      <img
                        className="card-img-top spml"
                        src={sampleimg}
                        alt="Card image cap"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <h1 className="text-center mt-5 mb-5 l_title pt-4">
        Available Locations and Apartments
      </h1>
      <div className="container-fluid apartment_bg pt-5">
        <div className="col-sm-7 mx-auto">
          <ul class="list-group list-group-flush text-center">
            <li className="list-group-item mt-2 shadow location_text">
              Cupang
              <span class="badge rounded-pill text-bg-primary bg-info ml-4">
                16
              </span>
            </li>
            <li className="list-group-item mt-2 shadow location_text">
              Poblacion
              <span class="badge rounded-pill text-bg-primary bg-info ml-4">
                1
              </span>
            </li>
            <li className="list-group-item mt-2 shadow location_text">
              Sucat
              <span class="badge rounded-pill text-bg-primary bg-info ml-4">
                5
              </span>
            </li>
            <li className="list-group-item mt-2 shadow location_text">
              Buli
              <span class="badge rounded-pill text-bg-primary bg-info ml-4">
                4
              </span>
            </li>
            <li className="list-group-item mt-2 mb-5 shadow location_text">
              Alabang
              <span class="badge rounded-pill text-bg-primary bg-info ml-4">
                20
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-fluid mb-1 pt-4 pb-5">
        <h1 className="text-center mt-5 mb-5 l_title">Get in touch</h1>
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-6 mt-3">
              <h5>Facebook account: http://samplesomeshitesasda.com</h5>
              <h5>Twitter account: http://samplesomeshitesasda.com</h5>
              <h5>Instagram account: http://samplesomeshitesasda.com</h5>
            </div>
            <div className="col-sm-5 border-left mt-3">
              <form className="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="validationCustom01" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <button type="submit" class="btn btn-info">
                  Subscribe
                </button>
                <label className="mt-4 ml-4">
                  Want to get notified if there is new property posted?
                  Subscribe now!
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-light">All Rights Reserved 2022</footer>
    </div>
  );
}

export default Home;
