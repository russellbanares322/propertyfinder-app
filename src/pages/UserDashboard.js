import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import DeleteProperty from "./DeleteProperty";
import PropertyRate from "./PropertyRate";

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const [activeDashboardText, setActiveDashboardText] = useState("");

  useEffect(() => {
    const propertyRef = collection(db, "PropertyDatabase");
    const q = query(propertyRef, where("userId", "==", user.uid));
    onSnapshot(q, (snapshot) => {
      const property = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperty(property);
    });
  }, []);

  return (
    <Container fluid>
      <Col className="text-center mt-5 underline_dashboard" sm={12}>
        <h1>Dashboard</h1>
      </Col>

      <Row className="d-flex justify-content-center">
        <Col className="p-5 bg-dark text-white text-center" sm={2}>
          <h6 className="d" style={{ cursor: "pointer" }}>
            My Listing
          </h6>
          <hr />
          <h6 className="d mt-5" style={{ cursor: "pointer" }}>
            Change Password
          </h6>
          <hr />
          <h6 className="d mt-5" style={{ cursor: "pointer" }}>
            Change Email
          </h6>
          <hr />
        </Col>
        <Col sm={10}>
          <Row className="d-flex justify-content-center">
            {property.length === 0 ? (
              <h1 className="text-center" style={{ marginLeft: "50px" }}>
                You dont have any property listed yet.
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
                        <Stack className="mt-3" direction="horizontal" gap={3}>
                          <div>
                            <p className="likes_count">{likes?.length} rates</p>
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
    </Container>
  );
};

export default UserDashboard;
