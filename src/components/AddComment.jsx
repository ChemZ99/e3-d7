import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = props => {
  //state = {
  //  comment: {
  //    comment: "",
  //    rate: 1,
  //    elementId: this.props.asin
  //  }
  //};

  const [commentObj, setCommentObj] = useState({ comment: "", rate: 1, elementId: props.asin });

  const sendComment = async e => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njc3ZDEwYmNhMDAwMTQ1ODNmZTIiLCJpYXQiOjE2OTQ0MzU5OTUsImV4cCI6MTY5NTY0NTU5NX0.WusGLpD46QBGjcSOHJev5UfetAXmhAm1xfdW5Oftnxo",
        },
      });
      if (response.ok) {
        alert("Comment was sent!");
        //this.setState({
        //  comment: {
        //    comment: "",
        //    rate: 1,
        //    elementId: this.props.asin
        //  }
        //});
        setCommentObj({ xcomment: "", rate: 1, elementId: props.asin });
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={commentObj.comment}
            onChange={e =>
              //this.setState({
              //  comment: {
              //    ...this.state.comment,
              //    comment: e.target.value
              //  }
              //})
              setCommentObj({ ...commentObj, comment: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={commentObj.rate}
            onChange={e =>
              //this.setState({
              //  comment: {
              //    ...this.state.comment,
              //    rate: e.target.value,
              //  },
              //})
              setCommentObj({ ...commentObj, rate: e.target.value })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
