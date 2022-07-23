import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Stack,
  Badge,
  Form,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import PropertyRate from "./PropertyRate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import Sucat from "./FilteredProperty/Sucat";
import Cupang from "./FilteredProperty/Cupang";
import AllProperty from "./FilteredProperty/AllProperty";
import Alabang from "./FilteredProperty/Alabang";

const Property = () => {
  const [user] = useAuthState(auth);
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocation, setFilteredLocation] = useState("");

  useEffect(() => {
    const propertyRef = collection(db, "PropertyDatabase");
    const q = query(propertyRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const property = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperty(property);
    });
  }, []);

  const handleSucatFilter = () => {
    setFilteredLocation("Sucat");
  };
  const handleAlabangFilter = () => {
    setFilteredLocation("Alabang");
  };
  const handleCupangFilter = () => {
    setFilteredLocation("Cupang");
  };
  const handleAllDisplay = () => {
    setFilteredLocation("All");
  };

  return (
    <>
      <Container fluid className="mt-5">
        {property.length !== 0 ? (
          <h1 className="text-center underline_available">
            Available Property
          </h1>
        ) : (
          ""
        )}

        <Col sm={12}>
          <Row>
            {property.length !== 0 ? (
              <Col sm={2} className="bg-dark text-white p-4">
                <div>
                  <Stack
                    className="d-flex justify-content-center"
                    direction="horizontal"
                    gap={1}
                  >
                    <div>
                      <h6>Filter Property</h6>
                    </div>
                    <div>
                      <BsFilterLeft size={30} />
                    </div>
                  </Stack>
                  <div>
                    <Form className=" mt-4">
                      <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </Form>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <small>Sort by Price</small>
                    <Form.Select aria-label="Default select example">
                      <option>All</option>
                      <option value="1">Low to High</option>
                      <option value="2">High to Low</option>
                    </Form.Select>
                  </div>
                  <hr />
                  <div className=" mt-4 pb-5">
                    <Badge
                      className="mb-3 text-dark p-2 d-flex justify-content-center"
                      bg="info"
                      style={{ fontSize: "15px" }}
                    >
                      Sort by Location
                    </Badge>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={handleAllDisplay}
                    >
                      All
                    </h6>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={handleSucatFilter}
                    >
                      Sucat
                    </h6>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={handleCupangFilter}
                    >
                      Cupang
                    </h6>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={handleAlabangFilter}
                    >
                      Alabang
                    </h6>
                    <hr />
                  </div>
                </div>
              </Col>
            ) : (
              ""
            )}

            <Col sm={10}>
              {filteredLocation === "Sucat" ? (
                <>
                  <Sucat className="mt-3" />
                </>
              ) : filteredLocation === "Cupang" ? (
                <>
                  <Cupang />
                </>
              ) : filteredLocation === "Alabang" ? (
                <>
                  <Alabang className="mt-3" />
                </>
              ) : filteredLocation === "All" ? (
                <>
                  <AllProperty className="mt-3" />
                </>
              ) : (
                <>
                  <Row className="d-flex justify-content-center">
                    {property.length === 0 ? (
                      <h1
                        className="text-center"
                        style={{ marginLeft: "50px" }}
                      >
                        No property added yet.
                      </h1>
                    ) : (
                      property
                        .filter((val) => {
                          if (searchTerm === "") {
                            return val;
                          } else if (
                            val.propertyName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val.propertyLocation
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val.propertyPrice
                              .toLocaleString()
                              .includes(searchTerm.toLocaleString())
                          ) {
                            return val;
                          } else if (searchTerm > 0) {
                            <h1>No results found</h1>;
                          }
                        })
                        .map(
                          ({
                            id,
                            propertyName,
                            propertyLocation,
                            imageUrl,
                            createdAt,
                            createdBy,
                            userId,
                            likes,
                            propertyPrice,
                            comments,
                          }) => (
                            <>
                              <Card
                                className="mx-2 p-3 my-5 property_display border-info"
                                style={{ width: "20rem" }}
                                key={id}
                              >
                                <Card.Img
                                  className="py-2"
                                  variant="center"
                                  src={imageUrl}
                                  fluid
                                />
                                <Card.Body>
                                  <Col sm={12}>
                                    <Row>
                                      <Col sm={8}>
                                        <Link to={`/property/${id}`}>
                                          <Button
                                            variant="outline-info text-dark"
                                            size="sm"
                                          >
                                            View Details
                                          </Button>
                                        </Link>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Stack
                                    className="mt-3"
                                    direction="horizontal"
                                    gap={3}
                                  >
                                    <div>
                                      <p className="likes_count">
                                        {likes?.length} rates
                                      </p>
                                    </div>
                                    <div>
                                      <p className="comments_count">
                                        {comments?.length} comments
                                      </p>
                                    </div>
                                    <div className="ms-auto">
                                      {user && (
                                        <PropertyRate id={id} likes={likes} />
                                      )}
                                    </div>
                                  </Stack>

                                  <hr />
                                  <Card.Title className="mb-1 text-center">
                                    {propertyName}
                                  </Card.Title>
                                  <hr />
                                  <Stack
                                    className="mt-1 d-flex justify-content-center"
                                    direction="horizontal"
                                    gap={5}
                                  >
                                    <div>
                                      <Card.Text>
                                        ₱{propertyPrice.toLocaleString()}
                                      </Card.Text>
                                    </div>
                                    <div>
                                      <Card.Text>{propertyLocation}</Card.Text>
                                    </div>
                                  </Stack>

                                  <hr />
                                  {createdBy && (
                                    <>
                                      <h6 className="mt-1">
                                        <Badge
                                          pill
                                          bg={
                                            userId === user.uid
                                              ? "info"
                                              : "dark"
                                          }
                                        >
                                          {createdBy}
                                        </Badge>
                                      </h6>
                                    </>
                                  )}
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                  <small>
                                    {createdAt.toDate().toDateString()}
                                  </small>
                                </Card.Footer>
                              </Card>
                            </>
                          )
                        )
                    )}
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Property;
