import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuid } from "uuid";
import { MdDelete } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

const PropertyComment = ({ id }) => {
  const [loggedUser] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentRef = doc(db, "PropertyDatabase", id);
  const [isSent, setIsSent] = useState(true);

  const handleSent = (e) => {
    setIsSent(!isSent);
    if (isSent !== false) {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: loggedUser.uid,
          userName: loggedUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuid(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  useEffect(() => {
    const docRef = doc(db, "PropertyDatabase", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="p-5 comment_input border mb-5">
        {loggedUser && (
          <>
            <FloatingLabel
              controlId="floatingTextarea"
              className="mb-3 text-muted"
            >
              <InputGroup>
                <Form.Control
                  placeholder="Write a comment..."
                  as="textarea"
                  value={comment}
                  style={{ zIndex: "0" }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <span>
                  <IoSendSharp
                    className="mt-4 mx-3 send_icon"
                    size={25}
                    color={"black"}
                    style={{
                      position: "absolute",
                      right: "1",
                      cursor: "pointer",
                    }}
                    onClick={handleSent}
                  />
                </span>
              </InputGroup>
            </FloatingLabel>
          </>
        )}
        <h6>Comments</h6>
        {comments !== null &&
          comments.map(({ comment, commentId, user, userName, createdAt }) => (
            <div key={commentId}>
              <Row>
                <Col sm={11}>
                  <Alert variant="secondary">
                    <Badge
                      pill
                      bg={`${user === loggedUser.uid ? "info" : "dark"}`}
                    >
                      {userName}
                    </Badge>
                    <hr />
                    <p className="text-dark">{comment}</p>
                  </Alert>
                </Col>
                <Col className="my-2" sm={1}>
                  {user === loggedUser.uid && (
                    <MdDelete
                      className="delete_icon"
                      size={30}
                      onClick={() =>
                        handleDeleteComment({
                          comment,
                          commentId,
                          user,
                          userName,
                          createdAt,
                        })
                      }
                    />
                  )}
                </Col>
              </Row>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default PropertyComment;
