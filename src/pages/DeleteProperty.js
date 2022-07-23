import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const DeleteProperty = ({ id, imageUrl }) => {
  const [approveDelete, setApproveDelete] = useState(true);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const handleShowDelete = () => {
    setModalShowDelete(!modalShowDelete);
  };

  const handleApproveDelete = () => {
    setApproveDelete(!approveDelete);
  };
  const handleCloseModal = () => setModalShowDelete(false);

  const handleDelete = async () => {
    if (approveDelete !== false) {
      try {
        await deleteDoc(doc(db, "PropertyDatabase", id));
        toast.info("Successfully deleted property!");
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
        setModalShowDelete(false);
      } catch (error) {
        toast.error("Failed to delete property, please try again.");
      }
    }
  };

  return (
    <>
      <Button className="mt-5 " variant="danger" onClick={handleShowDelete}>
        Delete
      </Button>
      <>
        <Modal show={modalShowDelete} onHide={modalShowDelete}>
          <Modal.Header closeButton onClick={handleCloseModal}>
            <Modal.Title className="ms-auto">Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to delete this record? This process cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete();
                handleApproveDelete();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default DeleteProperty;
