import {
  collection,
  Timestamp,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  ProgressBar,
  Col,
  Row,
} from "react-bootstrap";
import { storage, db, auth } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyDescription: "",
    propertyLocation: "",
    image: "",
    propertyPrice: "",
    createdAt: Timestamp.now().toDate(),
  });

  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const propertyRef = doc(db, "PropertyDatabase", id);
    const snapshot = await getDoc(propertyRef);
    if (snapshot.exists()) {
      setFormData({ ...snapshot.data() });
    }
  };

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = async (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    if (
      !formData.propertyName ||
      !formData.propertyDescription ||
      !formData.image ||
      !formData.propertyPrice ||
      !formData.propertyLocation
    ) {
      toast.error("Fields cannot be empty.");
      return;
    }
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercentage);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          propertyName: "",
          propertyDescription: "",
          propertyLocation: "",
          image: "",
          propertyPrice: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const propertyRef = collection(db, "PropertyDatabase");

          if (!id) {
            addDoc(propertyRef, {
              propertyName: formData.propertyName,
              propertyDescription: formData.propertyDescription,
              propertyPrice: +formData.propertyPrice,
              propertyLocation: formData.propertyLocation,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: [],
            })
              .then(() => {
                toast.info("Successfully Posted Property!");
                setProgress(0);
                navigate("/property");
              })
              .catch((err) => {
                toast.error("Failed to add property, please try again.");
              });
          } else {
            updateDoc(doc(db, "PropertyDatabase", id), {
              propertyName: formData.propertyName,
              propertyDescription: formData.propertyDescription,
              propertyPrice: +formData.propertyPrice,
              propertyLocation: formData.propertyLocation,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: [],
            })
              .then(() => {
                toast.info("Successfully Updated Property!");
                setProgress(0);
                navigate("/dashboard");
              })
              .catch((err) => {
                toast.error("Failed to update property, please try again.");
              });
          }
        });
      }
    );
  };

  return (
    <Container fluid>
      <Modal.Dialog size="lg">
        <Modal.Header className="bg-dark text-white">
          <Modal.Title className="mx-auto">
            {id ? "Update Property" : "Post Property"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form className="my-4 text-white">
            <Form.Group className="mb-3">
              <Form.Label>Property Name</Form.Label>
              <Form.Control
                type="text"
                name="propertyName"
                placeholder="Enter title..."
                value={formData.propertyName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Col sm={12}>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="propertyPrice"
                      placeholder="Enter price..."
                      value={formData.propertyPrice}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="propertyLocation"
                      placeholder="Enter location..."
                      value={formData.propertyLocation}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter details..."
                style={{ height: "100px" }}
                value={formData.propertyDescription}
                name="propertyDescription"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleChangeImage(e)}
              />
            </Form.Group>
            <div className="text-white text-center note_message">
              <small>
                Note:
                <span className="text-danger px-1">
                  Avoid uploading portrait images.
                </span>
              </small>
            </div>
            {progress === 0 ? null : (
              <ProgressBar
                className="progress-bar mt-2"
                animated
                label={`${progress}% `}
                now={`${progress}% `}
              />
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-dark text-white">
          <Button variant="light" onClick={() => navigate("/property")}>
            Return
          </Button>
          <Button variant="primary" onClick={handleSubmitBlog}>
            {id ? "Save" : "Post"}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  );
};

export default AddProperty;
