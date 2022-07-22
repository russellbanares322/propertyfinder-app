import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { auth, db } from "../firebase-config";
import PropertyRate from "./PropertyRate";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BsFillShieldLockFill,
  BsHouseFill,
  BsFillGearFill,
} from "react-icons/bs";
const bgImage = new URL("/src/images/bgImage.jpg", import.meta.url);

const Home = ({ activeTab, setActiveTab }) => {
  const [property, setProperty] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const propertyRef = collection(db, "PropertyDatabase");
    const q = query(propertyRef, orderBy("createdAt", "desc"), limit(3));
    onSnapshot(q, (snapshot) => {
      const property = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperty(property);
    });
  }, []);

  const handleActiveProperty = () => {
    setActiveTab("Property");
    navigate("/property");
  };

  return (
    <>
      <Col sm={12}>
        <Image className="bg_image" src={bgImage} fluid />
        <h2 className="bg_text">We provide you a good quality property.</h2>
        <Button
          className="px-5 mt-3 text-white text-uppercase bg_button"
          variant="dark "
          onClick={handleActiveProperty}
        >
          Find
        </Button>
      </Col>
      <Container>
        <h1 className="text-center mt-5 text-uppercase underline_featured">
          Featured Properties
        </h1>
        <Row className="mt-4 d-flex justify-content-center">
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
                propertyPrice,
              }) => (
                <>
                  <Card
                    className="mx-4 p-3 my-5 home_property_display"
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
                                variant="outline-info"
                                size="sm"
                                onClick={handleActiveProperty}
                              >
                                View Details
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Col>

                      <Card.Title className="mb-1 text-center mt-3">
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
      </Container>
      <Container className="bg-dark p-3 mt-5" fluid>
        <Col sm={12}>
          <h1 className="text-center my-5 text-uppercase underline_sure text-white">
            What we make sure
          </h1>
          <Row>
            <Col
              className="d-flex justify-content-center mt-5 text-center pb-5"
              sm={4}
            >
              <Card
                className="border-white p-4 d-flex justify-content-center"
                style={{ width: "18rem", borderRadius: "10%" }}
              >
                <div className="d-flex justify-content-center">
                  <BsFillShieldLockFill className="security_icon" size={150} />
                </div>
                <Card.Body>
                  <Card.Title>Security</Card.Title>
                  <small>
                    Making sure that the information that you've been posting is
                    protected.
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex justify-content-center mt-5 pb-5" sm={4}>
              <Card
                className="border-dark p-4 d-flex justify-content-center  "
                style={{ width: "18rem", borderRadius: "10%" }}
              >
                <div className="d-flex justify-content-center">
                  <BsHouseFill className="home_icon" size={150} />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>Quality</Card.Title>
                  <small>Good quality property is what we offer you.</small>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex justify-content-center mt-5 pb-5" sm={4}>
              <Card
                className="border-dark p-4 d-flex justify-content-center  "
                style={{ width: "18rem", borderRadius: "10%" }}
              >
                <div className="d-flex justify-content-center">
                  <BsFillGearFill className="gear_icon" size={150} />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>Scalability</Card.Title>
                  <small>
                    We hear your feedback, to make sure that the website is
                    functional.
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
      <Container>
        <Col sm={12}>
          <h1 className="text-center mt-5 text-uppercase">Get in touch</h1>
        </Col>
      </Container>
    </>
  );
};

export default Home;
