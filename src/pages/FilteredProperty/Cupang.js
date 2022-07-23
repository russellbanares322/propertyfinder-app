import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import PropertyRate from "../PropertyRate";

const Cupang = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [property, setProperty] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const propertyRef = collection(db, "PropertyDatabase");
    const q = query(propertyRef, where("propertyLocation", "==", "Cupang"));
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
      <Row className="d-flex justify-content-center">
        {property.length === 0 ? (
          <h3 className="text-center mt-5">
            No available property in this location yet.
          </h3>
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
    </>
  );
};

export default Cupang;
