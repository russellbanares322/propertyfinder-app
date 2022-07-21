import {
  collection,
  doc,
  getDocs,
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
import DeleteProperty from "./DeleteProperty";
import { useAuthState } from "react-firebase-hooks/auth";
import PropertyRate from "./PropertyRate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";

const Property = () => {
  const [user] = useAuthState(auth);
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <Container fluid className="mt-5">
        {property.length !== 0 ? (
          <h3 className="text-center">Available Property</h3>
        ) : (
          ""
        )}

        <Col sm={12}>
          <Row>
            {property.length !== 0 ? (
              <Col sm={2} className="mt-5">
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
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                  </Form>
                </div>
                <div className=" mt-4">
                  <small>Sort by Price</small>
                  <Form.Select aria-label="Default select example">
                    <option>All</option>
                    <option value="1">Low to High</option>
                    <option value="2">High to Low</option>
                  </Form.Select>
                </div>
                <div className=" mt-2">
                  <small>Sort by Location</small>
                  <Form.Select aria-label="Default select example">
                    <option>All</option>
                    <option value="Muntinlupa">Muntinlupa</option>
                    <option value="Alabang">Alabang</option>
                    <option value="3">Cupang</option>
                  </Form.Select>
                </div>
              </Col>
            ) : (
              ""
            )}

            <Col sm={10}>
              <Row className="d-flex justify-content-center">
                {property.length === 0 ? (
                  <h1 className="text-center" style={{ marginLeft: "50px" }}>
                    No property added yet.
                  </h1>
                ) : (
                  property.map(
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
                          className="mx-2 p-3 my-5 property_display"
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
                                    <Button variant="outline-info" size="sm">
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
                                {user && <PropertyRate id={id} likes={likes} />}
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
                                  <Badge pill bg="dark">
                                    {createdBy}
                                  </Badge>
                                </h6>
                              </>
                            )}

                            {user && user.uid === userId && (
                              <Stack
                                className="d-flex justify-content-center"
                                direction="horizontal"
                                gap={3}
                              >
                                <div>
                                  <Button
                                    className="mt-5 text-white"
                                    variant="info"
                                    onClick={() => navigate(`/edit/${id}`)}
                                  >
                                    Update
                                  </Button>
                                </div>
                                <div>
                                  <DeleteProperty id={id} imageUrl={imageUrl} />
                                </div>
                              </Stack>
                            )}
                          </Card.Body>
                          <Card.Footer className="text-muted">
                            <small>{createdAt.toDate().toDateString()}</small>
                          </Card.Footer>
                        </Card>
                      </>
                    )
                  )
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Property;
