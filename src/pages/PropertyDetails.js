import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import PropertyComment from "./PropertyComment";
import PropertyRate from "./PropertyRate";
import { BiMessageSquareAdd } from "react-icons/bi";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "PropertyDatabase", id);
    onSnapshot(docRef, (snapshot) => {
      setProperty({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <Container fluid>
      {property && (
        <>
          <Col sm={12} className="mt-5">
            <h1 className="text-center">{property.propertyName}</h1>
          </Col>
          {user && (
            <>
              <Col className="mt-4" sm={12}>
                <Button className="text-dark px-2" variant="info">
                  Appoint Owner
                  <BiMessageSquareAdd className="pb-1 px-1" size={25} />
                </Button>
              </Col>
            </>
          )}

          <Col className="mt-5 mb-5" sm={12}>
            <Row>
              <Col sm={7}>
                <Image
                  className="image_details"
                  src={property.imageUrl}
                  fluid
                />
              </Col>
              <Col sm={5} className="text-center">
                <h6 className="mt-5 date_text">
                  Posted on {property.createdAt.toDate().toDateString()}
                </h6>
                <p className="pt-4">{property.propertyDescription}</p>
              </Col>
            </Row>
          </Col>
          <hr />
          <Col className="text-center" sm={12}>
            <h1 className=" mb-5">Images</h1>
            <Row>
              <Col sm={3}>Image 1</Col>
              <Col sm={3}>Image 2</Col>
              <Col sm={3}>Image 3</Col>
              <Col sm={3}>Image 4</Col>
            </Row>
          </Col>
          <hr />
          <Col sm={12}>
            <Row>
              <Col sm={9}>
                <Row>
                  <Col sm={4} className="d-flex justify-content-center">
                    <h1>Amenities</h1>
                  </Col>
                  <Col sm={4} className="d-flex justify-content-center">
                    <h1>Near Stores</h1>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} className="d-flex justify-content-center">
                <h1>Contact Info</h1>
              </Col>
            </Row>
          </Col>
          <Container fluid>
            {user && (
              <>
                <Col className="mt-5" sm={12}>
                  <Row>
                    <Col sm={1}>
                      <h6>Rates</h6>
                      <Stack direction="horizontal">
                        <div>
                          <p>{property.likes.length}</p>
                        </div>
                        <div>
                          <PropertyRate id={id} likes={property.likes} />
                        </div>
                      </Stack>
                    </Col>
                    <Col sm={11}>
                      <PropertyComment id={property.id} />
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Container>
        </>
      )}
    </Container>
  );
};

export default PropertyDetails;
